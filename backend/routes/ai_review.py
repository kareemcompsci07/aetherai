"""
AetherAI - AI Review API
File: backend/routes/ai_review.py
Purpose: Provide AI-powered feedback on completed experiments
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students improve their AI experiments with smart feedback.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import logging

# Import reviewer
from ..utils.experiment_reviewer import ExperimentReviewer

# Initialize router
router = APIRouter(prefix="/api/v1/review", tags=["review"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Request model
class ReviewRequest(BaseModel):
    final_accuracy: float
    final_loss: float
    training_time: float
    model: str
    dataset: str
    epochs: int
    metrics: Dict[str, Any] = {}

@router.post("/experiment")
async def review_experiment(request: ReviewRequest):
    """
    Get AI-powered review of an experiment
    """
    try:
        logger.info(f"Reviewing experiment for model: {request.model}")
        
        # Convert request to dict
        results = request.dict()
        
        # Generate review
        reviewer = ExperimentReviewer()
        feedback = reviewer.review_experiment(results)
        
        return {
            "status": "success",
            "feedback": feedback,
            "message": "✅ AI-powered experiment review generated!"
        }
        
    except Exception as e:
        logger.error(f"Experiment Review Error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate review: {str(e)}"
        )

@router.get("/template")
async def get_review_template():
    """
    Get the structure of an experiment review (for frontend integration)
    """
    return {
        "feedback": {
            "summary": {
                "performance_level": "Excellent",
                "emoji": "🏆",
                "comment": "Outstanding performance!",
                "accuracy": "98.3%",
                "loss": "0.054"
            },
            "strengths": [
                "High accuracy achieved",
                "Low final loss indicates good model fit"
            ],
            "improvement_suggestions": [
                "Try increasing the number of epochs for better convergence"
            ],
            "technical_insights": [
                "Training curve shows stable convergence"
            ],
            "encouragement": "Great job! Every experiment teaches you something new."
        },
        "message": "This is the template structure for experiment reviews"
    }
