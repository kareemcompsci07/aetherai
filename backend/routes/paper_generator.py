"""
AetherAI - Research Paper Generator API
File: backend/routes/paper_generator.py
Purpose: Generate academic papers from student experiments
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students publish their AI research with professional formatting.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import logging

# Import generator
from ..utils.paper_generator import PaperGenerator

# Initialize router
router = APIRouter(prefix="/api/v1/paper", tags=["paper"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Request model
class PaperRequest(BaseModel):
    model: str
    dataset: str
    final_accuracy: float
    final_loss: float
    training_time: int
    epochs: int

@router.post("/generate")
async def generate_research_paper(request: PaperRequest):
    """
    Generate a complete academic research paper from experiment data
    """
    try:
        logger.info(f"Generating research paper for {request.model} on {request.dataset}")
        
        # Use paper generator
        generator = PaperGenerator()
        paper = generator.generate_paper(request.dict())
        
        return {
            "status": "success",
            "paper": paper["paper"],
            "message": "📄 AI-powered research paper generated!"
        }
        
    except Exception as e:
        logger.error(f"Paper Generation Error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate research paper: {str(e)}"
        )

@router.get("/formats")
async def get_paper_formats():
    """
    Get list of available paper formats
    """
    return {
        "formats": [
            {
                "name": "IEEE Conference",
                "description": "Standard IEEE conference template",
                "suitable_for": ["Computer Science", "Engineering", "AI"]
            },
            {
                "name": "ACM Conference",
                "description": "ACM conference proceedings format",
                "suitable_for": ["Computer Science", "Software Engineering"]
            },
            {
                "name": "Springer LNCS",
                "description": "Lecture Notes in Computer Science format",
                "suitable_for": ["AI", "Machine Learning", "Data Science"]
            },
            {
                "name": "arXiv Preprint",
                "description": "arXiv preprint format",
                "suitable_for": ["All research areas"]
            }
        ],
        "message": "Available academic paper formats"
  }
