from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import OpenAI
import os
from pydub import AudioSegment
import tempfile

router = APIRouter()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class TranscriptionRequest(BaseModel):
    file_key: str

class TranscriptionResponse(BaseModel):
    transcription_text: str

def chunk_audio(file_path, chunk_length_ms=60000):  # 60 seconds chunks
    try:
        audio = AudioSegment.from_file(file_path)
        chunks = []
        for i in range(0, len(audio), chunk_length_ms):
            chunks.append(audio[i:i+chunk_length_ms])
        return chunks
    except Exception as e:
        raise ValueError(f"Error processing audio file: {str(e)}")

@router.post("/transcribe-audio", response_model=TranscriptionResponse)
def transcribe_audio(request: TranscriptionRequest) -> TranscriptionResponse:
    try:
        file_path = os.path.join("uploads", request.file_key)
        
        # Check if the file exists
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        
        # Split audio into chunks
        try:
            chunks = chunk_audio(file_path)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        
        full_transcription = ""
        
        # Process each chunk
        for i, chunk in enumerate(chunks):
            with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as temp_audio_file:
                chunk.export(temp_audio_file.name, format="mp3")
                temp_audio_file_path = temp_audio_file.name

            # Open the temporary file and pass it to the Whisper model
            with open(temp_audio_file_path, "rb") as audio_file:
                transcription = client.audio.transcriptions.create(
                    model="whisper-1", 
                    file=audio_file
                )
            
            full_transcription += transcription.text + " "
            
            # Clean up the temporary file
            os.remove(temp_audio_file_path)
        
        # Optionally, delete the original file after processing
        os.remove(file_path)
        
        return TranscriptionResponse(transcription_text=full_transcription.strip())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription error: {str(e)}")