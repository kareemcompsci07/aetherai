"""
AetherAI - Leaderboard API
File: backend/routes/leaderboard.py
Purpose: Serve global student leaderboard data
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Inspire students through healthy competition and recognition.
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
import logging
import random
from datetime import datetime

# Initialize router
router = APIRouter(prefix="/api/v1/leaderboard", tags=["leaderboard"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# In-memory leaderboard data (in production: use database)
LEADERBOARD_DATA = {
    "mnist": [
        {"rank": 1, "name": "Lina Chen", "accuracy": 99.2, "school": "Beijing International School", "country": "China"},
        {"rank": 2, "name": "Ahmed Hassan", "accuracy": 99.1, "school": "Future City STEM Academy", "country": "Egypt"},
        {"rank": 3, "name": "Emma Johnson", "accuracy": 99.0, "school": "Silicon Valley High", "country": "USA"},
        {"rank": 4, "name": "Yusuf Mohammed", "accuracy": 98.9, "school": "Cairo Science Academy", "country": "Egypt"},
        {"rank": 5, "name": "Satoshi Tanaka", "accuracy": 98.8, "school": "Tokyo Tech Prep", "country": "Japan"}
    ],
    "cifar10": [
        {"rank": 1, "name": "Nina Patel", "accuracy": 95.7, "school": "Mumbai AI Academy", "country": "India"},
        {"rank": 2, "name": "Carlos Rodriguez", "accuracy": 95.5, "school": "Mexico City Tech", "country": "Mexico"},
        {"rank": 3, "name": "Fatima Ali", "accuracy": 95.3, "school": "Dubai STEM School", "country": "UAE"},
        {"rank": 4, "name": "Kareem Mostafa", "accuracy": 95.1, "school": "El-Abtal Language School", "country": "Egypt"},
        {"rank": 5, "name": "Olivia Smith", "accuracy": 94.9, "school": "London Science Academy", "country": "UK"}
    ],
    "imdb": [
        {"rank": 1, "name": "Amina Yusuf", "accuracy": 94.8, "school": "Lagos AI Institute", "country": "Nigeria"},
        {"rank": 2, "name": "Diego Fernandez", "accuracy": 94.6, "school": "Buenos Aires Tech", "country": "Argentina"},
        {"rank": 3, "name": "Chen Wei", "accuracy": 94.4, "school": "Shanghai International", "country": "China"},
        {"rank": 4, "name": "Sarah Johnson", "accuracy": 94.2, "school": "Boston STEM Academy", "country": "USA"},
        {"rank": 5, "name": "Yuki Tanaka", "accuracy": 94.0, "school": "Osaka Tech Prep", "country": "Japan"}
    ]
}

@router.get("/{dataset}")
async def get_leaderboard(dataset: str):
    """
    Get leaderboard for a specific dataset
    """
    try:
        logger.info(f"Fetching leaderboard for dataset: {dataset}")
        
        if dataset.lower() not in LEADERBOARD_DATA:
            raise HTTPException(
                status_code=404,
                detail=f"Leaderboard not available for dataset: {dataset}"
            )
        
        return {
            "dataset": dataset.lower(),
            "entries": LEADERBOARD_DATA[dataset.lower()],
            "last_updated": datetime.utcnow().isoformat(),
            "total_students": sum(len(entries) for entries in LEADERBOARD_DATA.values()),
            "countries": list(set(entry["country"] for entries in LEADERBOARD_DATA.values() for entry in entries)),
            "status": "success"
        }
        
    except Exception as e:
        logger.error(f"Leaderboard API Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
async def get_all_leaderboards():
    """
    Get all leaderboards
    """
    try:
        return {
            "leaderboards": LEADERBOARD_DATA,
            "summary": {
                "total_datasets": len(LEADERBOARD_DATA),
                "total_students": sum(len(entries) for entries in LEADERBOARD_DATA.values()),
                "countries": list(set(entry["country"] for entries in LEADERBOARD_DATA.values() for entry in entries)),
                "last_updated": datetime.utcnow().isoformat()
            }
        }
    except Exception as e:
        logger.error(f"All Leaderboards Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/countries")
async def get_countries():
    """
    Get list of countries in the leaderboard
    """
    try:
        countries = list(set(
            entry["country"] 
            for entries in LEADERBOARD_DATA.values() 
            for entry in entries
        ))
        return {
            "countries": sorted(countries),
            "count": len(countries)
        }
    except Exception as e:
        logger.error(f"Countries API Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
