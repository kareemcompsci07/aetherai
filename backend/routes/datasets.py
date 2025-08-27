"""
AetherAI - Dataset Management Routes
File: backend/routes/datasets.py
Purpose: Handle dataset upload and selection (MNIST, CIFAR-10, etc.)
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: No GPU? No problem. Just upload and train.
"""

from fastapi import APIRouter, File, UploadFile, HTTPException
import os
import shutil
from pathlib import Path

# Initialize router
router = APIRouter(prefix="/api/v1/datasets", tags=["datasets"])

# Configuration
UPLOAD_DIR = Path("uploads/datasets")
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB
ALLOWED_EXTENSIONS = {".zip"}

# Create upload directory
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Preloaded datasets (simulated)
PRELOADED_DATASETS = [
    "mnist",
    "cifar-10",
    "fashion-mnist",
    "imdb",
    "sst-2",
    "iris"
]

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    """
    Upload a custom dataset (must be .zip)
    """
    # Validate file type
    file_extension = Path(file.filename).suffix.lower()
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Only .zip files are allowed. You uploaded: {file_extension}"
        )

    # Validate file size
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Max size: 100MB"
        )
    
    # Save file
    file_path = UPLOAD_DIR / file.filename
    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    return {
        "message": "Dataset uploaded successfully",
        "filename": file.filename,
        "size": len(contents),
        "path": str(file_path),
        "dataset_id": file.filename.replace(".zip", "").lower()
    }

@router.get("/preloaded")
async def list_preloaded_datasets():
    """
    List all available preloaded datasets
    """
    return {
        "datasets": PRELOADED_DATASETS,
        "total": len(PRELOADED_DATASETS),
        "message": "These datasets are ready to use without upload"
    }

@router.get("/preloaded/{name}")
async def use_preloaded_dataset(name: str):
    """
    Select a preloaded dataset for training
    """
    name_lower = name.lower()
    if name_lower not in PRELOADED_DATASETS:
        raise HTTPException(
            status_code=404,
            detail=f"Dataset '{name}' not found. Available: {PRELOADED_DATASETS}"
        )
    
    return {
        "message": f"Preloaded dataset '{name}' selected successfully",
        "dataset": name_lower,
        "status": "ready",
        "path": f"internal://preloaded/{name_lower}"
    }

@router.delete("/upload/{filename}")
async def delete_uploaded_dataset(filename: str):
    """
    Delete an uploaded dataset
    """
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    try:
        os.remove(file_path)
        return {"message": f"Dataset '{filename}' deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete file: {str(e)}")
