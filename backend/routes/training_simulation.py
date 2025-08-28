"""
AetherAI - Training Simulation API
File: backend/routes/training_simulation.py
Purpose: Provide real-time training simulation data for visualization
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students understand how neural networks learn through simulation.
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
import random
import logging
from datetime import datetime

# Initialize router
router = APIRouter(prefix="/api/v1/simulation", tags=["simulation"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mock data generator
def generate_mock_training_data(model_type: str = "cnn", dataset: str = "mnist") -> Dict[str, Any]:
    """Generate realistic mock training data"""
    epochs = 10
    batches_per_epoch = 100
    
    # Generate accuracy and loss curves
    accuracy_curve = [0.1]
    loss_curve = [2.3]
    
    for _ in range(1, epochs):
        last_acc = accuracy_curve[-1]
        last_loss = loss_curve[-1]
        
        # Simulate improvement with diminishing returns
        acc_increase = random.uniform(0.05, 0.15) * (1 - last_acc)
        loss_decrease = random.uniform(0.1, 0.3) * last_loss
        
        accuracy_curve.append(min(0.99, last_acc + acc_increase))
        loss_curve.append(max(0.01, last_loss - loss_decrease))
    
    # Generate neuron activity patterns
    neuron_activity = {
        "input_layer": [[random.random() for _ in range(5)] for _ in range(epochs)],
        "hidden_layer": [[random.random() for _ in range(8)] for _ in range(epochs)],
        "output_layer": [[random.random() for _ in range(6)] for _ in range(epochs)]
    }
    
    # Generate backpropagation events
    backprop_events = []
    for epoch in range(epochs):
        if random.random() < 0.7:  # 70% chance of backprop per epoch
            backprop_events.append({
                "epoch": epoch,
                "batch": random.randint(1, batches_per_epoch),
                "magnitude": random.uniform(0.1, 1.0),
                "timestamp": datetime.utcnow().isoformat()
            })
    
    return {
        "model_type": model_type,
        "dataset": dataset,
        "epochs": epochs,
        "batches_per_epoch": batches_per_epoch,
        "accuracy": accuracy_curve,
        "loss": loss_curve,
        "neuron_activity": neuron_activity,
        "backprop_events": backprop_events,
        "final_accuracy": accuracy_curve[-1],
        "final_loss": loss_curve[-1],
        "training_time": random.randint(200, 600),  # seconds
        "status": "success",
        "message": "Training simulation data generated"
    }

@router.get("/{model_type}/{dataset}")
async def get_training_simulation(model_type: str, dataset: str):
    """
    Get simulated training data for visualization
    """
    try:
        logger.info(f"Generating training simulation for model: {model_type}, dataset: {dataset}")
        
        # Validate inputs
        valid_models = ["cnn", "mlp", "lstm"]
        valid_datasets = ["mnist", "cifar10", "imdb"]
        
        if model_type.lower() not in valid_models:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid model type. Valid options: {valid_models}"
            )
        
        if dataset.lower() not in valid_datasets:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid dataset. Valid options: {valid_datasets}"
            )
        
        # Generate simulation data
        simulation_data = generate_mock_training_data(model_type.lower(), dataset.lower())
        
        return simulation_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Training Simulation API Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{model_type}/{dataset}/stream")
async def stream_training_simulation(model_type: str, dataset: str):
    """
    Stream training simulation data in real-time (for live visualization)
    """
    try:
        logger.info(f"Streaming training simulation for model: {model_type}, dataset: {dataset}")
        
        # In real version: use SSE or WebSocket
        # For now: return full data with streaming hint
        
        simulation_data = generate_mock_training_data(model_type.lower(), dataset.lower())
        
        return {
            **simulation_data,
            "streaming": True,
            "update_interval_ms": 100,
            "message": "This endpoint is designed for real-time streaming"
        }
        
    except Exception as e:
        logger.error(f"Streaming Simulation Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
