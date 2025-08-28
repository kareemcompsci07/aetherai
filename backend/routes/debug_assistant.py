"""
AetherAI - Debug Assistant API
File: backend/routes/debug_assistant.py
Purpose: Provide AI-powered debugging suggestions for error logs
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students debug AI code with intelligent assistance.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import logging

# Import debug assistant
from ..utils.debug_assistant import DebugAssistant

# Initialize router
router = APIRouter(prefix="/api/v1/debug", tags=["debug"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Request model
class DebugRequest(BaseModel):
    error_log: str
    context: Dict[str, Any] = {}

@router.post("/analyze")
async def analyze_error(request: DebugRequest):
    """
    Analyze an error log and provide debugging suggestions
    """
    try:
        logger.info(f"Analyzing error log: {request.error_log[:50]}...")
        
        # Use debug assistant
        assistant = DebugAssistant()
        result = assistant.analyze_error(request.error_log)
        
        return {
            "status": "success",
            "analysis": result,
            "message": "✅ AI-powered debugging assistance provided!"
        }
        
    except Exception as e:
        logger.error(f"Debug Assistant Error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze error: {str(e)}"
        )

@router.get("/examples")
async def get_debug_examples():
    """
    Get example error logs and solutions for educational purposes
    """
    return {
        "examples": [
            {
                "error": "CUDA out of memory",
                "solution": "Reduce batch size or use a smaller model"
            },
            {
                "error": "Shape mismatch in linear layer",
                "solution": "Check input dimensions of your first layer"
            },
            {
                "error": "NaN loss during training",
                "solution": "Try reducing the learning rate"
            }
        ],
        "message": "Common error examples for learning"
    }
