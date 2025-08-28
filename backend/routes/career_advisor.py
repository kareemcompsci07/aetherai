"""
AetherAI - Career Advisor API
File: backend/routes/career_advisor.py
Purpose: Provide AI-powered career guidance to students
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students connect their AI skills to future universities and careers.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import logging

# Import advisor
from ..utils.career_advisor import CareerAdvisor

# Initialize router
router = APIRouter(prefix="/api/v1/career", tags=["career"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Request model
class CareerRequest(BaseModel):
    best_accuracy: float
    projects_completed: int
    collaboration_score: float = 0.0
    improvement_rate: float = 0.0
    country: str = "Unknown"

@router.post("/advise")
async def get_career_advice(request: CareerRequest):
    """
    Get AI-powered career advice based on student performance
    """
    try:
        logger.info(f"Generating career advice for student with accuracy: {request.best_accuracy}")
        
        # Use career advisor
        advisor = CareerAdvisor()
        advice = advisor.advise_student(request.dict())
        
        return {
            "status": "success",
            "advice": advice,
            "message": "🎯 AI-powered career guidance generated!"
        }
        
    except Exception as e:
        logger.error(f"Career Advisor Error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate career advice: {str(e)}"
        )

@router.get("/universities")
async def get_university_list():
    """
    Get list of recommended universities for AI students
    """
    return {
        "universities": [
            {
                "name": "MIT",
                "ranking": 1,
                "focus": "AI Research",
                "location": "Cambridge, USA"
            },
            {
                "name": "Stanford",
                "ranking": 2,
                "focus": "AI Entrepreneurship",
                "location": "California, USA"
            },
            {
                "name": "Oxford",
                "ranking": 3,
                "focus": "Theoretical AI",
                "location": "Oxford, UK"
            },
            {
                "name": "ETH Zurich",
                "ranking": 4,
                "focus": "Engineering Excellence",
                "location": "Zurich, Switzerland"
            },
            {
                "name": "National University of Singapore",
                "ranking": 5,
                "focus": "AI in Asia",
                "location": "Singapore"
            },
            {
                "name": "Cairo University",
                "ranking": "Top in Egypt",
                "focus": "Local AI Development",
                "location": "Cairo, Egypt"
            },
            {
                "name": "Future University in Egypt",
                "ranking": "Emerging",
                "focus": "Tech Innovation",
                "location": "New Cairo, Egypt"
            }
        ],
        "message": "List of top universities for AI students worldwide"
  }
