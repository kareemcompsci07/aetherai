"""
AetherAI - Classroom Mode API
File: backend/routes/classroom_mode.py
Purpose: Provide teacher dashboard and classroom management
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help teachers monitor and support AI students effectively.
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import logging

# Import manager
from ..utils.classroom_manager import ClassroomManager

# Initialize router
router = APIRouter(prefix="/api/v1/classroom", tags=["classroom"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.get("/summary/{class_id}")
async def get_classroom_summary(class_id: str):
    """
    Get classroom summary for teacher dashboard
    """
    try:
        logger.info(f"Fetching classroom summary for: {class_id}")
        
        # Use classroom manager
        manager = ClassroomManager()
        summary = manager.get_classroom_summary(class_id)
        
        if "error" in summary:
            raise HTTPException(status_code=404, detail=summary["error"])
        
        return {
            "status": "success",
            "summary": summary,
            "message": "🏫 Classroom summary generated!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Classroom Summary Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/student/{class_id}/{student_id}")
async def get_student_progress(class_id: str, student_id: str):
    """
    Get individual student progress report
    """
    try:
        logger.info(f"Fetching progress for student: {student_id} in class: {class_id}")
        
        # Use classroom manager
        manager = ClassroomManager()
        progress = manager.get_student_progress(student_id, class_id)
        
        if "error" in progress:
            raise HTTPException(status_code=404, detail=progress["error"])
        
        return {
            "status": "success",
            "progress": progress,
            "message": "📊 Student progress report generated!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Student Progress Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/classes")
async def get_teacher_classes():
    """
    Get list of classes assigned to a teacher
    """
    try:
        return {
            "classes": [
                {
                    "id": "cairo_science_10a",
                    "name": "Science 10A",
                    "school": "El-Abtal Language School",
                    "student_count": 28,
                    "last_updated": "2025-04-15T14:30:00Z"
                },
                {
                    "id": "future_city_stem_9b",
                    "name": "STEM 9B",
                    "school": "Future City STEM Academy",
                    "student_count": 32,
                    "last_updated": "2025-04-15T12:20:00Z"
                }
            ],
            "message": "List of classes for teacher dashboard"
        }
    except Exception as e:
        logger.error(f"Teacher Classes Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
