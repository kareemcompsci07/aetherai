"""
AetherAI - Teacher Intervention Alerts API
File: backend/routes/teacher_alerts.py
Purpose: Generate alerts for teachers when students need intervention
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help teachers identify and support struggling students.
"""

from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
import logging

# Import teacher alerts system
from ..utils.teacher_alerts import TeacherInterventionAlerts

# Initialize router
router = APIRouter(prefix="/api/v1/teacher-alerts", tags=["teacher-alerts"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/generate")
async def generate_teacher_alerts(classroom_ dict = Body(...)):
    """
    Generate alerts for teachers when students need intervention
    """
    try:
        class_id = classroom_data.get("class_id", "unknown")
        logger.info(f"Generating teacher alerts for class: {class_id}")
        
        # Use teacher alerts system
        alert_system = TeacherInterventionAlerts()
        result = alert_system.generate_teacher_alerts(classroom_data)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "alert_report": result["alert_report"],
            "message": f"🔔 {result['message']}"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Teacher Alerts Generation Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/strategies")
async def get_intervention_strategies():
    """
    Get intervention strategies for struggling students
    """
    try:
        logger.info("Fetching intervention strategies")
        
        # Use teacher alerts system
        alert_system = TeacherInterventionAlerts()
        result = alert_system.get_intervention_guidelines()
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "guidelines": result["guidelines"],
            "message": "📚 Best practices for teacher interventions"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Intervention Strategies Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/types")
async def get_alert_types():
    """
    Get list of alert types and their descriptions
    """
    return {
        "alert_types": [
            {
                "id": "low_activity",
                "name": "Low Activity",
                "description": "Student has low engagement and activity levels",
                "severity": "high",
                "icon": "⚠️"
            },
            {
                "id": "slow_progress",
                "name": "Slow Progress",
                "description": "Student is making slower progress than expected",
                "severity": "medium",
                "icon": "🐢"
            },
            {
                "id": "low_collaboration",
                "name": "Low Collaboration",
                "description": "Student is not collaborating with peers",
                "severity": "medium",
                "icon": "👥"
            },
            {
                "id": "technical_difficulty",
                "name": "Technical Difficulty",
                "description": "Student is facing technical challenges",
                "severity": "high",
                "icon": "💻"
            },
            {
                "id": "conceptual_misunderstanding",
                "name": "Conceptual Misunderstanding",
                "description": "Student has fundamental misunderstandings of key concepts",
                "severity": "critical",
                "icon": "🧠"
            }
        ],
        "message": "Types of teacher intervention alerts"
    }
