"""
AetherAI - Research Trend Analyzer API
File: backend/routes/research_trends.py
Purpose: Provide research trend analysis and future directions
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students discover emerging research areas and contribute to science.
"""

from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
import logging

# Import trend analyzer
from ..utils.research_trends import ResearchTrendAnalyzer

# Initialize router
router = APIRouter(prefix="/api/v1/research-trends", tags=["research-trends"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/analyze")
async def analyze_research_trends(student_ Dict[str, Any] = Body(...)):
    """
    Analyze current research trends and suggest future directions for a student
    """
    try:
        student_id = student_data.get("student_id", "unknown")
        logger.info(f"Analyzing research trends for student: {student_id}")
        
        # Use trend analyzer
        analyzer = ResearchTrendAnalyzer()
        result = analyzer.analyze_trends(student_data)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "student_id": result["trend_report"]["student_id"],
            "trend_report": result["trend_report"],
            "message": "🔍 Research trend analysis generated!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Research Trend Analysis Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/future-directions")
async def get_future_directions():
    """
    Get future directions in AI research
    """
    try:
        logger.info("Fetching future directions in AI research")
        
        # Use trend analyzer
        analyzer = ResearchTrendAnalyzer()
        result = analyzer.get_future_directions()
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "future_directions": result["future_directions"],
            "message": "🔮 Future directions in AI research"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Future Directions Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/emerging-areas")
async def get_emerging_areas():
    """
    Get list of emerging research areas
    """
    return {
        "emerging_areas": [
            "Vision Transformers",
            "Diffusion Models",
            "Neural Radiance Fields (NeRF)",
            "Large Language Models",
            "Multimodal Learning",
            "Federated Learning",
            "Explainable AI",
            "AI for Climate Science",
            "AI for Healthcare",
            "Edge AI"
        ],
        "message": "Emerging research areas in AI"
    }
