"""
AetherAI - AI Insights API
File: backend/routes/ai_insights.py
Purpose: Serve AI-generated natural language analysis of training results
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Let AI explain AI to students.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import logging

# Import AI generator
from ..utils.report_generator import generate_ai_insights

# Initialize router
router = APIRouter(prefix="/api/v1/ai-insights", tags=["ai-insights"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Request model
class MetricsRequest(BaseModel):
    model: str
    dataset: str
    accuracy: float
    metrics: Dict[str, List[float]]

@router.post("/", response_model=List[str])
async def get_ai_insights(request: MetricsRequest):
    """
    Get AI-generated natural language insights about training performance
    """
    try:
        logger.info(f"Generating AI insights for model: {request.model}, accuracy: {request.accuracy:.3f}")
        
        insights = generate_ai_insights(
            metrics=request.metrics,
            model=request.model,
            dataset=request.dataset,
            accuracy=request.accuracy
        )
        
        return insights
        
    except Exception as e:
        logger.error(f"Error generating AI insights: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate AI insights: {str(e)}"
        )

@router.get("/sample")
async def get_sample_ai_insights():
    """
    Get a sample of AI-generated insights for demonstration
    """
    sample_request = MetricsRequest(
        model="cnn",
        dataset="MNIST",
        accuracy=0.983,
        metrics={
            "accuracy": [0.1, 0.45, 0.67, 0.78, 0.82, 0.86, 0.89, 0.91, 0.95, 0.983],
            "loss": [2.3, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4, 0.054]
        }
    )
    
    return get_ai_insights(sample_request)
