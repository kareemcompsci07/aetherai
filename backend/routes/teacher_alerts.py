"""
AetherAI - Teacher Intervention Alerts API
File: backend/routes/teacher_alerts.py
Purpose: Provide intelligent alerts for teachers about student progress
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help teachers identify and support struggling students.
"""

from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
import logging

# Import alerts system
from ..utils.teacher_alerts import TeacherAlerts

# Initialize router
router = APIRouter(prefix="/api/v1/teacher-alerts", tags=["teacher-alerts"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/generate")
async def generate_teacher_alerts(classroom_ Dict[str, Any] = Body(...)):
    """
    Generate intelligent alerts for a teacher about student progress
    """
    try:
        class_id = classroom_data.get("class_id", "unknown")
        logger.info(f"Generating teacher alerts for class: {class_id}")
        
        # Use teacher alerts system
        alerts_system = TeacherAlerts()
        result = alerts_system.generate_alerts(classroom_data)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "class_id": result["class_id"],
            "teacher_id": result["teacher_id"],
            "total_alerts": result["total_alerts"],
            "alerts": result["alerts"],
            "summary": result["summary"],
            "message": f"🎯 {result['total_alerts']} alerts generated for class {result['class_id']}!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Teacher Alerts Generation Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/strategies")
async def get_intervention_strategies():
    """
    Get evidence-based intervention strategies for different student needs
    """
    try:
        logger.info("Fetching intervention strategies")
        
        # Use teacher alerts system
        alerts_system = TeacherAlerts()
        result = alerts_system.get_intervention_strategies()
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "strategies": result["strategies"],
            "message": "📚 Evidence-based intervention strategies loaded!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Intervention Strategies Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/types")
async def get_alert_types():
    """
    Get available alert types and their descriptions
    """
    return {
        "alert_types": [
            {
                "id": "struggling",
                "name": "Struggling Student",
                "description": "Student performance is below expected level",
                "severity": "high",
                "icon": "🔴"
            },
            {
                "id": "stagnant",
                "name": "Stagnant Progress",
                "description": "Student progress has plateaued",
                "severity": "medium",
                "icon": "🟡"
            },
            {
                "id": "disengaged",
                "name": "Disengaged Student",
                "description": "Low activity and participation",
                "severity": "high",
                "icon": "🔴"
            },
            {
                "id": "improving",
                "name": "Improving Student",
                "description": "Significant improvement detected",
                "severity": "low",
                "icon": "🟢"
            },
            {
                "id": "excelling",
                "name": "Excelling Student",
                "description": "Exceptional performance and engagement",
                "severity": "low",
                "icon": "🌟"
            }
        ],
        "message": "Available alert types for teacher intervention"
  }
