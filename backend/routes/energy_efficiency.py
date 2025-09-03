"""
AetherAI - Energy Efficiency Analyzer API
File: backend/routes/energy_efficiency.py
Purpose: Provide energy consumption and carbon savings analysis
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students understand the environmental impact of AI training.
"""

from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
import logging

# Import energy efficiency analyzer
from ..utils.energy_efficiency import EnergyEfficiencyAnalyzer

# Initialize router
router = APIRouter(prefix="/api/v1/energy-efficiency", tags=["energy-efficiency"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/analyze")
async def analyze_energy_efficiency(training_data: dict = Body(...)):
    """
    Analyze energy consumption and carbon savings of AI training
    """
    try:
        training_id = training_data.get("training_id", "unknown")
        logger.info(f"Analyzing energy efficiency for training: {training_id}")
        
        # Use energy efficiency analyzer
        analyzer = EnergyEfficiencyAnalyzer()
        result = analyzer.analyze_energy_consumption(training_data)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "efficiency_report": result["efficiency_report"],
            "message": f"🌍 {result['message']}"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Energy Efficiency Analysis Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/guidelines")
async def get_sustainability_guidelines():
    """
    Get guidelines for sustainable AI development
    """
    try:
        logger.info("Fetching sustainability guidelines")
        
        # Use energy efficiency analyzer
        analyzer = EnergyEfficiencyAnalyzer()
        result = analyzer.get_sustainability_guidelines()
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "guidelines": result["guidelines"],
            "message": "📚 Best practices for sustainable AI development"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Sustainability Guidelines Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/metrics")
async def get_energy_metrics():
    """
    Get list of energy efficiency metrics and their descriptions
    """
    return {
        "energy_metrics": [
            {
                "id": "energy_consumption",
                "name": "Energy Consumption",
                "description": "Total energy used during training",
                "unit": "kWh",
                "icon": "⚡"
            },
            {
                "id": "carbon_emissions",
                "name": "Carbon Emissions",
                "description": "CO2 emissions from energy consumption",
                "unit": "kg CO2",
                "icon": "🌫️"
            },
            {
                "id": "efficiency_score",
                "name": "Efficiency Score",
                "description": "Overall efficiency rating of the training process",
                "unit": "/100",
                "icon": "📊"
            },
            {
                "id": "trees_equivalent",
                "name": "Trees Equivalent",
                "description": "Number of trees needed to offset carbon emissions",
                "unit": "trees",
                "icon": "🌳"
            },
            {
                "id": "car_miles_equivalent",
                "name": "Car Miles Equivalent",
                "description": "Miles a car would need to drive to produce same emissions",
                "unit": "miles",
                "icon": "🚗"
            }
        ],
        "message": "Energy efficiency and sustainability metrics"
      }
