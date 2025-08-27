"""
AetherAI - Main Backend Application
File: backend/main.py
Purpose: Entry point with all routes integrated
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Democratizing AI research for students in developing countries
GitHub: https://github.com/kareemcompsci07/aetherai
Email: kareemcompsci.07@gmail.com

This is the central FastAPI application that integrates:
- Dataset management (upload or select preloaded)
- Cloud-based training simulation (for students without GPU)
- Real-time training progress tracking
- Results visualization with AI-generated insights
- Auto-generated PDF experiment reports

Built entirely from a mobile device in Egypt — proving that innovation has no borders.
No powerful laptop? No GPU? No problem.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import all routers
from routes.datasets import router as datasets_router
from routes.training import router as training_router
from routes.results import router as results_router
from routes.reports import router as reports_router

# Initialize FastAPI app
app = FastAPI(
    title="AetherAI Backend",
    description="An open-source AI research platform for high school & university students worldwide. Designed for accessibility, education, and equity in AI.",
    version="0.1.0",
    contact={
        "name": "Kareem Mostafa",
        "email": "kareemcompsci.07@gmail.com",
        "url": "https://github.com/kareemcompsci07"
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT"
    },
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Add CORS middleware (critical for frontend connectivity)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Will be restricted in production (e.g., to aetherai.app)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"]  # Important for PDF download
)

# Include all API routers
app.include_router(datasets_router)
app.include_router(training_router)
app.include_router(results_router)
app.include_router(reports_router)

# Root endpoint - Health & Info
@app.get("/", tags=["root"])
def home():
    """
    Root endpoint with project info and developer vision
    """
    return {
        "message": "Welcome to AetherAI",
        "status": "running",
        "developer": "Kareem Mostafa",
        "location": "Future City, Cairo, Egypt",
        "institution": "El-Abtal Language School for Girls (Science Stream)",
        "graduation_year": 2026,
        "vision": "Democratizing AI research for students in developing countries",
        "mission": "To become the 'Kaggle for Students' — accessible, educational, and free",
        "documentation": "Visit /docs for full API reference",
        "frontend": "https://github.com/kareemcompsci07/aetherai/tree/main/frontend",
        "source_code": "https://github.com/kareemcompsci07/aetherai",
        "license": "MIT",
        "version": "0.1.0"
    }

@app.get("/health", tags=["health"])
def health_check():
    """
    Health check endpoint for monitoring and deployment
    """
    return {
        "status": "healthy",
        "service": "aetherai-backend",
        "version": "0.1.0",
        "timestamp": __import__('datetime').datetime.utcnow().isoformat(),
        "environment": "development",
        "developer": "Kareem Mostafa (Egypt)",
        "goal": "Enable AI research for students without GPUs"
    }

# Instructions for running
"""
To run this server:
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

To build Docker image:
docker build -t aetherai-backend .

To run with docker-compose:
docker-compose up --build
"""

# Note: All routes are now connected:
# - /api/v1/datasets
# - /api/v1/training
# - /api/v1/results
# - /api/v1/reports
# 
# The system is fully integrated and ready for frontend connection.
