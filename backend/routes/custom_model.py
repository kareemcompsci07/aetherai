"""
AetherAI - Custom Model Creation API
File: backend/routes/custom_model.py
Purpose: Allow students to create custom AI models via API
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: No PhD needed. Just configure and train.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
import logging

# Import model factory
from ..utils.model_factory import create_model

# Initialize router
router = APIRouter(prefix="/api/v1/models", tags=["models"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Request model
class ModelConfig(BaseModel):
    type: str
    dataset: str
    hidden_layers: int = 3
    hidden_size: int = 128
    vocab_size: int = 10000
    num_layers: int = 2
    input_size: Optional[int] = None
    num_classes: Optional[int] = None

@router.post("/create")
async def create_custom_model(config: ModelConfig):
    """
    Create a custom AI model based on student configuration
    """
    try:
        logger.info(f"Creating custom model: {config.type.upper()} for {config.dataset}")
        
        # Create model
        model = create_model(config.dict())
        
        # Get model info
        total_params = sum(p.numel() for p in model.parameters())
        trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
        
        return {
            "status": "success",
            "model_type": config.type,
            "dataset": config.dataset,
            "architecture": str(model.__class__.__name__),
            "total_parameters": total_params,
            "trainable_parameters": trainable_params,
            "input_size": config.input_size or "auto",
            "num_classes": config.num_classes or "auto",
            "message": f"✅ {config.type.upper()} model created successfully!"
        }
        
    except Exception as e:
        logger.error(f"Error creating model: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Failed to create model: {str(e)}"
        )

@router.get("/supported")
async def get_supported_models():
    """
    List all supported model types
    """
    return {
        "supported_models": ["mlp", "cnn", "lstm"],
        "message": "These models can be customized by students",
        "documentation": "Send POST /api/v1/models/create with config"
    }
