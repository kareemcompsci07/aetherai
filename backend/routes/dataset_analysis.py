"""
AetherAI - Dataset Analysis API
File: backend/routes/dataset_analysis.py
Purpose: Serve automatic dataset insights to the frontend
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students understand their data before training.
"""

from fastapi import APIRouter, HTTPException, File, UploadFile
from typing import Dict, Any
import os
from pathlib import Path

# Import analyzer
from ..utils.dataset_analyzer import DatasetAnalyzer

# Initialize router
router = APIRouter(prefix="/api/v1/datasets", tags=["datasets"])

# Configuration
UPLOAD_DIR = Path("uploads/datasets")
ANALYSIS_CACHE: Dict[str, Dict] = {}  # In production: use Redis

@router.post("/analyze")
async def analyze_uploaded_dataset(file: UploadFile = File(...)):
    """
    Analyze an uploaded dataset and return insights
    """
    # Validate file type
    file_extension = Path(file.filename).suffix.lower()
    if file_extension not in [".zip"]:
        raise HTTPException(
            status_code=400,
            detail=f"Only .zip files can be analyzed. You uploaded: {file_extension}"
        )

    # Save file temporarily
    file_path = UPLOAD_DIR / f"temp_{file.filename}"
    try:
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
        
        # Analyze
        analyzer = DatasetAnalyzer(file_path)
        analysis = analyzer.analyze()
        
        # Cache result (remove temp file after analysis)
        ANALYSIS_CACHE[file.filename] = analysis
        
        return {
            "filename": file.filename,
            "analysis": analysis,
            "status": "success",
            "message": "Dataset analyzed successfully"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze dataset: {str(e)}"
        )
    finally:
        # Clean up temp file
        if file_path.exists():
            try:
                os.remove(file_path)
            except:
                pass

@router.get("/analyze/{filename}")
async def get_cached_analysis(filename: str):
    """
    Get previously cached analysis for a dataset
    """
    if filename not in ANALYSIS_CACHE:
        raise HTTPException(
            status_code=404,
            detail="No analysis found for this dataset"
        )
    
    return {
        "filename": filename,
        "analysis": ANALYSIS_CACHE[filename],
        "status": "success"
    }

@router.get("/suggestions/{filename}")
async def get_analysis_suggestions(filename: str):
    """
    Get only the educational suggestions from dataset analysis
    """
    if filename not in ANALYSIS_CACHE:
        raise HTTPException(
            status_code=404,
            detail="No analysis found for this dataset"
        )
    
    suggestions = ANALYSIS_CACHE[filename].get("suggestions", [])
    return {
        "filename": filename,
        "suggestions": suggestions,
        "count": len(suggestions)
}
