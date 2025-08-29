"""
AetherAI - Dataset Quality Scorer API
File: backend/routes/dataset_quality.py
Purpose: Provide dataset quality analysis and improvement suggestions
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students identify and fix dataset issues before training.
"""

from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
import logging

# Import quality scorer
from ..utils.dataset_quality import DatasetQualityScorer

# Initialize router
router = APIRouter(prefix="/api/v1/dataset-quality", tags=["dataset-quality"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/score")
async def score_dataset_quality(dataset_info: dict = Body(...)):
    """
    Analyze dataset quality and return comprehensive score
    """
    try:
        dataset_name = dataset_info.get("name", "Unknown Dataset")
        logger.info(f"Scoring dataset quality for: {dataset_name}")
        
        # Use quality scorer
        scorer = DatasetQualityScorer()
        result = scorer.score_dataset(dataset_info)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "quality_report": result["quality_report"],
            "message": f"{result['message']}"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Dataset Quality Scoring Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/guidelines")
async def get_quality_guidelines():
    """
    Get guidelines for high-quality datasets
    """
    try:
        logger.info("Fetching dataset quality guidelines")
        
        # Use quality scorer
        scorer = DatasetQualityScorer()
        result = scorer.get_quality_guidelines()
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "guidelines": result["guidelines"],
            "message": "📚 Best practices for dataset quality"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Quality Guidelines Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/metrics")
async def get_quality_metrics():
    """
    Get list of dataset quality metrics and their descriptions
    """
    return {
        "quality_metrics": [
            {
                "id": "balance",
                "name": "Class Balance",
                "description": "Distribution of classes across the dataset",
                "ideal_range": "40-60%",
                "weight": 0.3,
                "icon": "⚖️"
            },
            {
                "id": "cleanliness",
                "name": "Data Cleanliness",
                "description": "Presence of missing values, duplicates, and outliers",
                "ideal_range": "90-100% clean",
                "weight": 0.25,
                "icon": "🧼"
            },
            {
                "id": "diversity",
                "name": "Data Diversity",
                "description": "Variety and representativeness of data samples",
                "ideal_range": "70-100%",
                "weight": 0.2,
                "icon": "🌍"
            },
            {
                "id": "relevance",
                "name": "Feature Relevance",
                "description": "How well features relate to the target variable",
                "ideal_range": "60-100%",
                "weight": 0.15,
                "icon": "🎯"
            },
            {
                "id": "size",
                "name": "Dataset Size",
                "description": "Adequacy of data quantity for the task",
                "ideal_range": "80-100% of recommended size",
                "weight": 0.1,
                "icon": "📏"
            }
        ],
        "message": "Dataset quality assessment metrics"
}
