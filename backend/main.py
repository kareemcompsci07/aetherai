"""
AetherAI - FastAPI Backend | Created by Kareem Mostafa (Egypt, 2025)
Open-source AI platform for students. No GPU? No problem.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AetherAI",
    description="An open-source AI research platform for high school & university students worldwide.",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to AetherAI",
        "status": "running",
        "developer": "Kareem Mostafa",
        "location": "Future City, Cairo, Egypt",
        "vision": "Democratizing AI for students in developing countries"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
