"""
AetherAI - Learning Path API
File: backend/routes/learning_path.py
Purpose: Provide personalized learning path generation
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help every student find their unique path in AI.
"""

from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import Dict, Any
import logging

# Import generator
from ..utils.learning_path import LearningPathGenerator

# Initialize router
router = APIRouter(prefix="/api/v1/learning-path", tags=["learning-path"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Request model
class StudentProfile(BaseModel):
    student_id: str
    current_level: str
    interests: list
    goals: list
    country: str
    best_accuracy: float
    projects_completed: int
    collaboration_score: float
    improvement_rate: float

@router.post("/generate")
async def generate_learning_path(profile: StudentProfile):
    """
    Generate personalized learning path for a student
    """
    try:
        logger.info(f"Generating learning path for student: {profile.student_id}")
        
        # Use learning path generator
        generator = LearningPathGenerator()
        result = generator.generate_learning_path(profile.dict())
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "learning_path": result["learning_path"],
            "message": "🎯 Personalized learning path generated!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Learning Path Generation Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/resources")
async def get_learning_resources(level: str = "all"):
    """
    Get curated learning resources for AI education
    """
    try:
        logger.info(f"Fetching learning resources for level: {level}")
        
        # Use learning path generator
        generator = LearningPathGenerator()
        result = generator.get_learning_resources(level)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "resources": result["resources"],
            "message": "📚 Curated learning resources loaded!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Learning Resources Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/tracks")
async def get_career_tracks():
    """
    Get available career tracks in AI
    """
    return {
        "tracks": [
            {
                "id": "research",
                "title": "AI Research Scientist",
                "description": "Focus on advancing the state of the art in artificial intelligence.",
                "path": ["beginner", "intermediate", "advanced", "specialized"],
                "key_skills": ["Mathematics", "Research", "Programming", "Scientific Writing"],
                "duration": "2+ years"
            },
            {
                "id": "engineering",
                "title": "Machine Learning Engineer",
                "description": "Build and deploy AI systems in production environments.",
                "path": ["beginner", "intermediate", "advanced"],
                "key_skills": ["Software Engineering", "System Design", "Deployment", "Optimization"],
                "duration": "1.5+ years"
            },
            {
                "id": "applications",
                "title": "AI Applications Developer",
                "description": "Apply AI to solve real-world problems in various industries.",
                "path": ["beginner", "intermediate"],
                "key_skills": ["Problem Solving", "Domain Knowledge", "User Experience", "Integration"],
                "duration": "1+ year"
            },
            {
                "id": "ethics",
                "title": "AI Ethics Specialist",
                "description": "Ensure AI systems are fair, transparent, and beneficial to society.",
                "path": ["beginner", "intermediate", "advanced"],
                "key_skills": ["Ethical Reasoning", "Bias Detection", "Policy", "Social Impact"],
                "duration": "1.5+ years"
            }
        ],
        "message": "Career tracks in AI education"
    }

@router.get("/milestones")
async def get_learning_milestones():
    """
    Get key learning milestones for AI students
    """
    return {
        "milestones": [
            {
                "level": "Beginner",
                "achievements": [
                    "Complete first AI experiment",
                    "Achieve 90%+ accuracy on MNIST",
                    "Understand neural network basics",
                    "Join the learning community"
                ]
            },
            {
                "level": "Intermediate",
                "achievements": [
                    "Implement CNN architecture",
                    "Publish findings on social feed",
                    "Achieve 95%+ accuracy",
                    "Collaborate with peers"
                ]
            },
            {
                "level": "Advanced",
                "achievements": [
                    "Publish research paper",
                    "Achieve state-of-the-art results",
                    "Present at virtual conference",
                    "Mentor other students"
                ]
            }
        ],
        "message": "Key milestones in AI learning journey"
  }
