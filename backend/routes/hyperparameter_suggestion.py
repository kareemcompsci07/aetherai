"""
AetherAI - Hyperparameter Suggestion API
File: backend/routes/hyperparameter_suggestion.py
Purpose: Serve smart hyperparameter suggestions to the frontend
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students train better models with AI-powered suggestions.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional

# Import suggester
from ..utils.hyperparameter_suggester import suggest_hyperparameters

# Initialize router
router = APIRouter(prefix="/api/v1/suggestions", tags=["suggestions"])

# Request model
class SuggestionRequest(BaseModel):
    model: str
    dataset: str

@router.post("/hyperparameters")
async def get_hyperparameter_suggestion(request: SuggestionRequest):
    """
    Get smart hyperparameter suggestions based on model and dataset
    """
    try:
        suggestion = suggest_hyperparameters(
            model=request.model,
            dataset=request.dataset
        )
        
        return {
            "status": "success",
            "model": request.model,
            "dataset": request.dataset,
            "suggestion": suggestion,
            "message": "✅ Smart hyperparameter suggestion generated!"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate suggestion: {str(e)}"
        )

@router.get("/defaults/{model_type}")
async def get_default_hyperparameters(model_type: str):
    """
    Get default hyperparameters for a model type
    """
    defaults = {
        "cnn": {
            "learning_rate": 0.001,
            "batch_size": 32,
            "epochs": 10,
            "optimizer": "Adam",
            "description": "Good for image classification tasks"
        },
        "mlp": {
            "learning_rate": 0.001,
            "batch_size": 128,
            "epochs": 50,
            "optimizer": "Adam",
            "description": "Good for tabular or flattened data"
        },
        "lstm": {
            "learning_rate": 0.001,
            "batch_size": 32,
            "epochs": 10,
            "optimizer": "Adam",
            "description": "Good for text classification"
        },
        "transformer": {
            "learning_rate": 2e-5,
            "batch_size": 16,
            "epochs": 3,
            "optimizer": "AdamW",
            "description": "Good for NLP with fine-tuning"
        }
    }
    
    model_lower = model_type.lower()
    if model_lower not in defaults:
        raise HTTPException(
            status_code=404,
            detail=f"No defaults available for model: {model_type}"
        )
    
    return {
        "model": model_type,
        "defaults": defaults[model_lower],
        "message": "Use these as starting point for your experiments"
    }
