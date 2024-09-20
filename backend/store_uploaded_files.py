from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import uuid
import os
from audio_process_transform import transcribe_audio, TranscriptionRequest

router = APIRouter()
templates = Jinja2Templates(directory="templates")

class UploadAudioResponse(BaseModel):
    file_key: str

@router.post('/upload-audio', response_class=HTMLResponse)
async def upload_audio(request: Request, file: UploadFile = File(...)):
    try:
        # Check file extension
        file_extension = os.path.splitext(file.filename)[1].lower()
        if file_extension not in ['.mp3', '.wav', '.m4a']:
            raise ValueError("Unsupported file format. Please upload an MP3, WAV, or M4A file.")

        file_key = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join("uploads", file_key)
        
        os.makedirs("uploads", exist_ok=True)
        
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
        
        transcription_response = transcribe_audio(TranscriptionRequest(file_key=file_key))
        
        return templates.TemplateResponse("index.html", {
            "request": request,
            "transcription": transcription_response.transcription_text,
            "error": None
        })
    except ValueError as ve:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "transcription": None,
            "error": str(ve)
        })
    except HTTPException as he:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "transcription": None,
            "error": he.detail
        })
    except Exception as e:
        return templates.TemplateResponse("index.html", {
            "request": request,
            "transcription": None,
            "error": f"An unexpected error occurred: {str(e)}"
        })

@router.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})