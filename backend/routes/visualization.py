"""
AetherAI - Visualization API
File: backend/routes/visualization.py
Purpose: Serve training visualization data to the frontend
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students understand how neural networks learn.
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
import random
import logging

# Initialize router
router = APIRouter(prefix="/api/v1/visualization", tags=["visualization"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mock data generator
def generate_mock_confusion_matrix(num_classes: int = 10) -> List[List[int]]:
    """Generate realistic confusion matrix"""
    matrix = [[max(0, random.randint(5, 20) - abs(i-j)*3) for j in range(num_classes)] 
              for i in range(num_classes)]
    # Make diagonal stronger
    for i in range(num_classes):
        matrix[i][i] = random.randint(30, 50)
    return matrix

def generate_mock_feature_maps(model_type: str) -> Dict[str, Any]:
    """Generate mock feature map descriptions"""
    if "cnn" in model_type.lower():
        return {
            "layers": [
                {
                    "name": "Input Layer",
                    "description": "Raw pixel data from images",
                    "patterns": ["Pixel values", "Color channels"]
                },
                {
                    "name": "Conv1 + ReLU",
                    "description": "Detects simple features like edges and corners",
                    "patterns": ["Vertical edges", "Horizontal edges", "Diagonal lines"]
                },
                {
                    "name": "Conv2 + Pool",
                    "description": "Combines simple features into complex patterns",
                    "patterns": ["Circles", "Squares", "Curves"]
                },
                {
                    "name": "Fully Connected",
                    "description": "Makes final decision based on detected patterns",
                    "patterns": ["Digit classification", "Confidence scores"]
                }
            ],
            "insight": "CNNs learn from simple to complex features, just like human vision!"
        }
    else:
        return {
            "layers": [
                {
                    "name": "Input Layer",
                    "description": "Flattened input data",
                    "patterns": ["Numerical values"]
                },
                {
                    "name": "Hidden Layer 1",
                    "description": "Learns basic combinations of input features",
                    "patterns": ["Linear combinations", "Weighted sums"]
                },
                {
                    "name": "Hidden Layer 2",
                    "description": "Learns more complex relationships",
                    "patterns": ["Non-linear combinations", "Feature interactions"]
                },
                {
                    "name": "Output Layer",
                    "description": "Produces final classification",
                    "patterns": ["Probability distribution", "Class scores"]
                }
            ],
            "insight": "MLPs learn abstract representations of data through multiple layers."
        }

@router.get("/{experiment_id}")
async def get_visualization_data(experiment_id: str):
    """
    Get comprehensive visualization data for a training experiment
    """
    try:
        logger.info(f"Generating visualization data for experiment: {experiment_id}")
        
        # In real version: fetch from database
        # For now: generate mock data
        
        return {
            "experiment_id": experiment_id,
            "metrics": {
                "accuracy": [round(random.uniform(0.1, 0.9) + i*0.08, 3) for i in range(10)],
                "loss": [round(random.uniform(2.0, 0.1), 3) for i in range(10)]
            },
            "confusion_matrix": generate_mock_confusion_matrix(),
            "feature_maps": generate_mock_feature_maps("cnn"),
            "training_insights": [
                "Accuracy increased steadily, indicating stable training",
                "Final loss is low, suggesting good model fit",
                "Confusion matrix shows strong diagonal, meaning good classification",
                "Some confusion between similar classes (e.g. 4 and 9)"
            ],
            "status": "success",
            "message": "Visualization data generated successfully"
        }
        
    except Exception as e:
        logger.error(f"Visualization API Error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate visualization data: {str(e)}"
        )

@router.get("/{experiment_id}/confusion-matrix")
async def get_confusion_matrix(experiment_id: str):
    """Get only the confusion matrix"""
    try:
        data = await get_visualization_data(experiment_id)
        return {
            "experiment_id": experiment_id,
            "confusion_matrix": data["confusion_matrix"],
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{experiment_id}/feature-maps")
async def get_feature_maps(experiment_id: str):
    """Get only the feature map analysis"""
    try:
        data = await get_visualization_data(experiment_id)
        return {
            "experiment_id": experiment_id,
            "feature_maps": data["feature_maps"],
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
