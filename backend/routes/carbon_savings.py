"""
AetherAI - Carbon Savings API
File: backend/routes/carbon_savings.py
Purpose: Calculate environmental impact of simulated training
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students understand the environmental benefits of sustainable AI.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import logging
from datetime import datetime

# Initialize router
router = APIRouter(prefix="/api/v1/carbon", tags=["carbon"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants (in production: make configurable)
GPU_POWER_WATTS = 300  # Average GPU power consumption
GRID_EMISSIONS = 0.5    # kg CO2 per kWh (global average)
TREE_ABSORPTION = 22    # kg CO2 absorbed per tree per year
CAR_EMISSIONS = 0.12    # kg CO2 per km (average gasoline car)

class CarbonRequest(BaseModel):
    training_time_minutes: float
    device_type: str = "simulated"  # "gpu", "tpu", "simulated"

@router.post("/calculate")
async def calculate_carbon_savings(request: CarbonRequest):
    """
    Calculate carbon savings from using simulated training vs GPU
    """
    try:
        logger.info(f"Calculating carbon savings for {request.training_time_minutes} minutes")
        
        # Validate input
        if request.training_time_minutes <= 0:
            raise HTTPException(
                status_code=400,
                detail="Training time must be positive"
            )
        
        # Convert to hours
        hours = request.training_time_minutes / 60
        
        # Calculate GPU energy consumption (kWh)
        gpu_energy_kwh = (GPU_POWER_WATTS * hours) / 1000
        
        # Calculate carbon emissions if GPU was used
        carbon_emissions = gpu_energy_kwh * GRID_EMISSIONS  # kg CO2
        
        # Calculate equivalents
        trees_equivalent = carbon_emissions / TREE_ABSORPTION
        car_km_equivalent = carbon_emissions / CAR_EMISSIONS
        
        # Return results
        return {
            "status": "success",
            "training_time_minutes": request.training_time_minutes,
            "device_type": request.device_type,
            "savings": {
                "energy_kwh": round(gpu_energy_kwh, 2),
                "carbon_kg": round(carbon_emissions, 2),
                "trees_equivalent": round(trees_equivalent, 2),
                "car_km_equivalent": round(car_km_equivalent, 1)
            },
            "message": "🌱 Environmental impact calculated successfully!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Carbon Savings API Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats")
async def get_carbon_stats():
    """
    Get global carbon savings statistics
    """
    try:
        # In full version: aggregate from database
        # For now: mock data
        return {
            "total_students": 1247,
            "total_carbon_saved_kg": 2400,
            "total_energy_saved_kwh": 4800,
            "equivalent_trees_planted": 109,
            "equivalent_car_km_saved": 20000,
            "last_updated": datetime.utcnow().isoformat(),
            "message": "Global environmental impact statistics"
        }
    except Exception as e:
        logger.error(f"Carbon Stats Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
