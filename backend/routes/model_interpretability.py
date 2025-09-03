"""
AetherAI - Model Interpretability API
File: backend/routes/model_interpretability.py
Purpose: Provide explanations for AI model predictions
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students understand how AI models make decisions.
"""

from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
import logging

# Import interpretability system
from ..utils.model_interpretability import ModelInterpretability

# Initialize router
router = APIRouter(prefix="/api/v1/interpretability", tags=["interpretability"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/explain")
async def explain_model_prediction(prediction_data: dict = Body(...)):
    """
    Generate comprehensive explanation for a model prediction
    """
    try:
        prediction_id = prediction_data.get("prediction_id", "unknown")
        logger.info(f"Explaining model prediction: {prediction_id}")
        
        # Use interpretability system
        interpreter = ModelInterpretability()
        result = interpreter.explain_prediction(prediction_data)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "interpretation_report": result["interpretation_report"],
            "message": f"🧠 {result['message']}"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Model Interpretability Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/guidelines")
async def get_interpretability_guidelines():
    """
    Get guidelines for model interpretability
    """
    try:
        logger.info("Fetching model interpretability guidelines")
        
        # Use interpretability system
        interpreter = ModelInterpretability()
        result = interpreter.get_interpretability_guidelines()
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "guidelines": result["guidelines"],
            "message": "📚 Best practices for model interpretability"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Interpretability Guidelines Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/methods")
async def get_interpretability_methods():
    """
    Get list of model interpretability methods and their descriptions
    """
    return {
        "interpretability_methods": [
            {
                "id": "saliency_maps",
                "name": "Saliency Maps",
                "description": "Highlight important pixels in the input image",
                "purpose": "Show which parts of the image influenced the prediction most",
                "best_for": ["image classification", "computer vision"],
                "icon": "🖼️"
            },
            {
                "id": "feature_importance",
                "name": "Feature Importance",
                "description": "Rank features by their contribution to the prediction",
                "purpose": "Identify most influential features in tabular data",
                "best_for": ["tabular data", "regression", "classification"],
                "icon": "📊"
            },
            {
                "id": "confidence_analysis",
                "name": "Confidence Analysis",
                "description": "Analyze model confidence across different classes",
                "purpose": "Understand model certainty and uncertainty",
                "best_for": ["all model types"],
                "icon": "🎯"
            },
            {
                "id": "counterfactuals",
                "name": "Counterfactual Explanations",
                "description": "Show minimal changes that would change the prediction",
                "purpose": "Understand decision boundaries",
                "best_for": ["image classification", "tabular data"],
                "icon": "🔄"
            }
        ],
        "message": "Model interpretability explanation methods"
    }
