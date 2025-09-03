"""
AetherAI - Adaptive Learning Path API
File: backend/routes/adaptive_learning.py
Purpose: Provide personalized learning paths based on student progress and interests
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students follow the optimal path in their AI learning journey.
"""

from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
import logging

# Import adaptive learning system
from ..utils.adaptive_learning import AdaptiveLearningPath

# Initialize router
router = APIRouter(prefix="/api/v1/learning-path", tags=["learning-path"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/generate")
async def generate_learning_path(student_profile: dict = Body(...)):
    """
    Generate personalized learning path based on student profile
    """
    try:
        student_id = student_profile.get("student_id", "unknown")
        logger.info(f"Generating learning path for student: {student_id}")
        
        # Use adaptive learning system
        generator = AdaptiveLearningPath()
        result = generator.generate_learning_path(student_profile)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "learning_path": result["learning_path"],
            "message": f"🎯 {result['message']}"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Learning Path Generation Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/guidelines")
async def get_learning_guidelines():
    """
    Get guidelines for effective AI learning
    """
    try:
        logger.info("Fetching learning guidelines")
        
        # Use adaptive learning system
        generator = AdaptiveLearningPath()
        result = generator.get_learning_guidelines()
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "guidelines": result["guidelines"],
            "message": "📚 Best practices for AI learning"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Learning Guidelines Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stages")
async def get_learning_stages():
    """
    Get list of learning stages and their descriptions
    """
    return {
        "learning_stages": [
            {
                "id": "beginner",
                "name": "Beginner",
                "description": "Foundational concepts and basic skills",
                "duration_weeks": 8,
                "icon": "🌱"
            },
            {
                "id": "intermediate",
                "name": "Intermediate",
                "description": "Core AI concepts and practical applications",
                "duration_weeks": 12,
                "icon": "🚀"
            },
            {
                "id": "advanced",
                "name": "Advanced",
                "description": "Specialized topics and research-level concepts",
                "duration_weeks": 16,
                "icon": "🧠"
            },
            {
                "id": "expert",
                "name": "Expert",
                "description": "Cutting-edge research and innovation",
                "duration_weeks": 20,
                "icon": "🌟"
            }
        ],
        "message": "Learning stages in the AI education journey"
    }
