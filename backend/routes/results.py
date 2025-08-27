"""
AetherAI - Results Management Routes
File: backend/routes/results.py
Purpose: Serve training results and insights to the frontend
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Every student deserves to understand their AI experiment results.
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import random
from datetime import datetime

# Initialize router
router = APIRouter(prefix="/api/v1/results", tags=["results"])

# In-memory results store (in production: use PostgreSQL)
training_results: Dict[str, Dict] = {}

# Mock insights generator
def generate_insights(metrics: Dict) -> list:
    accuracy = metrics["accuracy"][-1] if metrics["accuracy"] else 0
    loss = metrics["loss"][-1] if metrics["loss"] else 1.0
    
    insights = []
    
    if accuracy > 0.9:
        insights.append("✅ Excellent accuracy achieved — model learned effectively.")
    elif accuracy > 0.7:
        insights.append("✅ Good accuracy. Consider more epochs or data augmentation.")
    else:
        insights.append("⚠️ Low accuracy. Try a different model or check data quality.")
    
    if loss < 0.1:
        insights.append("📉 Low final loss indicates good convergence.")
    elif loss < 0.5:
        insights.append("📉 Moderate loss. Training is stable.")
    else:
        insights.append("⚠️ High loss. Model may need tuning or more training.")
    
    if len(metrics["accuracy"]) > 1:
        acc_trend = metrics["accuracy"][-1] - metrics["accuracy"][0]
        if acc_trend > 0.5:
            insights.append("📈 Strong improvement in accuracy over epochs.")
        elif acc_trend > 0.2:
            insights.append("📈 Accuracy improved steadily.")
        else:
            insights.append("⚠️ Accuracy improved slowly — consider higher learning rate.")
    
    # Add educational tip
    tips = [
        "💡 Tip: Overfitting? Try dropout or data augmentation.",
        "💡 Tip: Use learning rate scheduling for better convergence.",
        "💡 Tip: For images, consider data normalization and augmentation.",
        "💡 Tip: For text, ensure proper tokenization and padding.",
        "💡 Tip: Monitor loss curve — sudden jumps may indicate unstable training."
    ]
    insights.append(random.choice(tips))
    
    return insights

@router.get("/{job_id}")
async def get_training_results(job_id: str):
    """
    Get final results of a completed training job
    """
    # First check if job exists in training_jobs (active/completed)
    from .training import training_jobs
    
    if job_id not in training_jobs:
        # Check if already stored in results
        if job_id in training_results:
            return training_results[job_id]
        raise HTTPException(status_code=404, detail="Training job not found")
    
    job = training_jobs[job_id]
    
    if job["status"] != "completed":
        raise HTTPException(
            status_code=400, 
            detail=f"Job not completed yet. Current status: {job['status']}"
        )
    
    # Generate result object
    result = {
        "experiment_id": job_id,
        "model": job["config"]["model"],
        "dataset": job["config"]["dataset"],
        "final_accuracy": job["final_accuracy"],
        "final_loss": job["final_loss"],
        "epochs": job["total_epochs"],
        "training_time_seconds": (datetime.fromisoformat(job["end_time"]) - 
                                datetime.fromisoformat(job["start_time"])).seconds,
        "metrics": job["metrics"],
        "generated_at": datetime.utcnow().isoformat(),
        "status": "success",
        "insights": generate_insights(job["metrics"])
    }
    
    # Store in results
    training_results[job_id] = result
    
    return result

@router.get("/{job_id}/insights")
async def get_model_insights(job_id: str):
    """
    Get only the AI-generated insights for a completed training job
    """
    result = await get_training_results(job_id)
    return {"insights": result["insights"]}

@router.get("/summary/{model_type}")
async def get_model_performance_summary(model_type: str):
    """
    Get average performance stats for a model type (educational use)
    """
    # Mock data for demonstration
    summaries = {
        "cnn": {
            "model": "CNN",
            "use_case": "Image Classification",
            "avg_accuracy": 0.95,
            "avg_epochs": 10,
            "difficulty": "Beginner",
            "recommended_for": ["MNIST", "CIFAR-10", "Fashion-MNIST"]
        },
        "transformer": {
            "model": "Transformer",
            "use_case": "Text Classification",
            "avg_accuracy": 0.88,
            "avg_epochs": 15,
            "difficulty": "Intermediate",
            "recommended_for": ["IMDB", "SST-2", "News Classification"]
        },
        "mlp": {
            "model": "MLP",
            "use_case": "Tabular Data",
            "avg_accuracy": 0.82,
            "avg_epochs": 50,
            "difficulty": "Beginner",
            "recommended_for": ["Iris", "Wine", "Breast Cancer"]
        }
    }
    
    model_lower = model_type.lower()
    if model_lower not in [k.lower() for k in summaries.keys()]:
        raise HTTPException(
            status_code=404, 
            detail=f"No summary available for model: {model_type}"
        )
    
    key = next(k for k in summaries.keys() if k.lower() == model_lower)
    return summaries[key]
