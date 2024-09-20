import tempfile
import databutton as db
import openai
import os

# ? Retrieve the audio file from storage
audio_file = db.storage.binary.get(request.storage_key)


# ? Save the audio file to a temporary file with a recognized format
with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as temp_audio_file:
    temp_audio_file.write(audio_file)
    temp_audio_file_path = temp_audio_file.name
        
    
# ? Open the temporary file in binary mode and pass the file object to the Whisper model
with open(temp_audio_file_path, "rb") as file:
    transcription = client.audio.transcriptions.create(model="whisper-1", file=file)
    print(transcription)