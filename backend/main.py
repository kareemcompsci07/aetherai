"""
AetherAI - Main Backend Application (v1.7 with Debug Assistant)
File: backend/main.py
Purpose: Entry point with all routes integrated, including AI-powered debugging
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Democratizing AI research for students in developing countries
GitHub: https://github.com/kareemcompsci07/aetherai
Email: kareemcompsci.07@gmail.com

This is the central FastAPI application that integrates:
- Dataset management (upload or select preloaded)
- Automatic dataset analysis
- Smart hyperparameter suggestions
- AI-powered student mentoring
- Interactive training visualization
- Real-time training simulation
- Student collaboration and sharing
- AI-powered experiment review
- Global leaderboard for student competition
- AI-powered debugging assistant (NEW)
- Cloud-based training simulation (for students without GPU)
- Real-time training progress tracking
- Results visualization with AI-generated insights
- Auto-generated PDF experiment reports
- Dynamic model creation

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
from routes.ai_insights import router as ai_insights_router
from routes.custom_model import router as custom_model_router
from routes.dataset_analysis import router as dataset_analysis_router
from routes.hyperparameter_suggestion import router as hyperparameter_suggestion_router
from routes.mentor import router as mentor_router
from routes.visualization import router as visualization_router
from routes.collaboration import router as collaboration_router
from routes.ai_review import router as ai_review_router
from routes.leaderboard import router as leaderboard_router
from routes.training_simulation import router as training_simulation_router
from routes.debug_assistant import router as debug_assistant_router  # NEW: Debug Assistant

# Initialize FastAPI app
app = FastAPI(
    title="AetherAI Backend",
    description="An open-source AI research platform for high school & university students worldwide. Designed for accessibility, education, and equity in AI.",
    version="1.7.0",  # Updated version
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
    allow_origins=["*"],  # Will be restricted in production
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
app.include_router(ai_insights_router)
app.include_router(custom_model_router)
app.include_router(dataset_analysis_router)
app.include_router(hyperparameter_suggestion_router)
app.include_router(mentor_router)
app.include_router(visualization_router)
app.include_router(collaboration_router)
app.include_router(ai_review_router)
app.include_router(leaderboard_router)
app.include_router(training_simulation_router)
app.include_router(debug_assistant_router)  # ✅ Include Debug Assistant API

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
        "features": [
            "Upload or select datasets (MNIST, CIFAR-10)",
            "Automatic dataset analysis with educational suggestions",
            "Smart hyperparameter suggestions based on model & dataset",
            "AI-powered student mentoring with educational responses",
            "Interactive training visualization with metrics and feature maps",
            "Real-time training simulation with animated network",
            "Student collaboration: share experiments with classmates",
            "AI-powered experiment review with smart feedback",
            "Global leaderboard: compete with students worldwide",
            "AI-powered debugging assistant: fix errors with AI help (NEW)",
            "Train models without GPU (cloud simulation)",
            "Real-time training dashboard",
            "Auto-generated PDF reports",
            "AI-powered insights in natural language",
            "Create custom AI models"
        ],
        "documentation": "Visit /docs for full API reference",
        "frontend": "https://github.com/kareemcompsci07/aetherai/tree/main/frontend",
        "source_code": "https://github.com/kareemcompsci07/aetherai",
        "license": "MIT",
        "version": "1.7.0"  # Updated
    }

@app.get("/health", tags=["health"])
def health_check():
    """
    Health check endpoint for monitoring and deployment
    """
    return {
        "status": "healthy",
        "service": "aetherai-backend",
        "version": "1.7.0",
        "timestamp": __import__('datetime').datetime.utcnow().isoformat(),
        "environment": "development",
        "developer": "Kareem Mostafa (Egypt)",
        "goal": "Enable AI research for students without GPUs",
        "new_feature": "AI-powered debugging via /api/v1/debug/analyze"
}
