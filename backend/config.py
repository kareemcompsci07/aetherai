"""
AetherAI - Configuration Module
File: backend/config.py
Purpose: Centralized configuration for the entire application
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: No GPU? No problem. Just configure and train.
"""

import os
from pathlib import Path
from typing import Dict, Any

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Dataset settings
DATASET_SETTINGS = {
    "upload_dir": BASE_DIR / "uploads" / "datasets",
    "max_file_size": 100 * 1024 * 1024,  # 100MB
    "allowed_extensions": {".zip"},
    "preloaded_datasets": [
        "mnist", "cifar-10", "fashion-mnist", 
        "imdb", "sst-2", "iris"
    ]
}

# Training settings
TRAINING_SETTINGS = {
    "default_epochs": 10,
    "default_batch_size": 32,
    "default_learning_rate": 0.001,
    "supported_models": [
        "cnn", "transformer", "mlp", "resnet-18",
        "lstm", "vit", "efficientnet"
    ],
    "simulation_profiles": {
        "cnn": {"acc_start": 0.1, "acc_end": 0.98, "loss_start": 2.3, "loss_end": 0.05},
        "transformer": {"acc_start": 0.15, "acc_end": 0.92, "loss_start": 2.1, "loss_end": 0.1},
        "mlp": {"acc_start": 0.1, "acc_end": 0.9, "loss_start": 2.3, "loss_end": 0.1},
        "default": {"acc_start": 0.1, "acc_end": 0.9, "loss_start": 2.3, "loss_end": 0.1}
    }
}

# Report settings
REPORT_SETTINGS = {
    "template_dir": BASE_DIR / "templates",
    "output_dir": BASE_DIR / "reports",
    "pdf_filename_prefix": "aetherai_experiment_",
    "default_font": "Segoe UI",
    "colors": {
        "primary": "#00FFFF",
        "secondary": "#0F172A",
        "success": "#4CAF50",
        "error": "#F44336"
    }
}

# API settings
API_SETTINGS = {
    "version": "v1",
    "prefix": "/api",
    "docs_url": "/docs",
    "redoc_url": "/redoc",
    "openapi_url": "/openapi.json",
    "contact": {
        "name": "Kareem Mostafa",
        "email": "kareemcompsci.07@gmail.com",
        "github": "https://github.com/kareemcompsci07"
    }
}

# Environment settings
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
DEBUG = ENVIRONMENT == "development"

# Database (for future use)
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://aether_user:secret@db:5432/aetherdb"
)

# Cloud settings (simulated)
CLOUD_SETTINGS = {
    "provider": "AetherAI Free Tier",
    "device": "cloud-gpu-simulator",
    "region": "global",
    "free_tier_active": True,
    "max_duration_minutes": 10
}

# Create required directories
def setup_directories():
    """Create necessary directories on startup"""
    DATASET_SETTINGS["upload_dir"].mkdir(parents=True, exist_ok=True)
    REPORT_SETTINGS["output_dir"].mkdir(parents=True, exist_ok=True)
    REPORT_SETTINGS["template_dir"].mkdir(parents=True, exist_ok=True)

# Initialize directories
setup_directories()

# Project metadata
PROJECT_METADATA: Dict[str, Any] = {
    "name": "AetherAI",
    "description": "Open-source AI research platform for students",
    "version": "0.1.0",
    "developer": "Kareem Mostafa",
    "location": "Future City, Cairo, Egypt",
    "school": "El-Abtal Language School for Girls",
    "graduation_year": 2026,
    "vision": "Democratizing AI research for students in developing countries",
    "mission": "To become the 'Kaggle for Students'",
    "license": "MIT",
    "source_code": "https://github.com/kareemcompsci07/aetherai"
}
