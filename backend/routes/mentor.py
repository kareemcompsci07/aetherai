"""
AetherAI - AI Mentor API
File: backend/routes/mentor.py
Purpose: Serve AI-powered educational responses to student questions
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Every student deserves a personal AI tutor.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import logging
import random

# Initialize router
router = APIRouter(prefix="/api/v1/mentor", tags=["mentor"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Educational response rules (in full version: replace with Hugging Face API)
RESPONSE_RULES = {
    "accuracy": [
        "If accuracy isn't increasing, try increasing the learning rate slightly.",
        "Check if your dataset is balanced — imbalanced data can hurt accuracy.",
        "Add more layers to your model to increase its learning capacity.",
        "Train for more epochs — some models need time to 'break through' plateaus."
    ],
    "loss": [
        "High loss means the model isn't learning well. Try reducing the learning rate.",
        "Use a different optimizer — Adam is usually a safe choice.",
        "Check your data preprocessing — wrong scaling can cause high loss.",
        "Ensure your labels are correct and properly formatted."
    ],
    "cnn": [
        "CNNs are great for image data like MNIST or CIFAR-10.",
        "Use CNNs when you have spatial patterns in your data.",
        "Start with 2-3 convolutional layers for simple image tasks."
    ],
    "mlp": [
        "MLPs work well for tabular or flattened data.",
        "Use MLPs when there's no spatial structure in your data.",
        "They're simpler than CNNs but can still learn complex patterns."
    ],
    "lstm": [
        "LSTMs are designed for sequential data like text or time series.",
        "Use them for tasks like sentiment analysis or language modeling.",
        "They can remember long-term dependencies better than simple RNNs."
    ],
    "learning rate": [
        "Too high learning rate: loss jumps around or diverges.",
        "Too low learning rate: training is very slow.",
        "Start with 0.001 for Adam, 0.01 for SGD.",
        "Adjust in powers of 10 (0.1 → 0.01 → 0.001)."
    ],
    "overfitting": [
        "Signs of overfitting: training accuracy ↑ but validation accuracy ↓.",
        "Add dropout layers to reduce overfitting.",
        "Use data augmentation to increase dataset diversity.",
        "Reduce model complexity or use early stopping."
    ],
    "default": [
        "I understand you're asking about AI training! Here are general tips:",
        "Start simple, then increase complexity.",
        "Use validation data to check performance.",
        "Don't be afraid to experiment!",
        "Small steps lead to big discoveries."
    ]
}

class MentorMessage(BaseModel):
    message: str

@router.post("/chat")
async def ai_mentor_chat(msg: MentorMessage):
    """
    Get AI-powered educational response to student questions
    """
    try:
        user_message = msg.message.lower()
        response_parts = []

        # Check for keywords
        found = False
        for keyword, responses in RESPONSE_RULES.items():
            if keyword in user_message:
                response_parts.append(random.choice(responses))
                found = True

        # Add general advice
        if not found:
            response_parts = RESPONSE_RULES["default"]

        # Add encouragement
        encouragement = [
            "Keep experimenting — every great researcher started where you are!",
            "Don't worry if it doesn't work at first. AI is about iteration.",
            "You're doing great! Every experiment teaches you something new.",
            "Remember: even PhD students struggle with these concepts."
        ]
        response_parts.append(random.choice(encouragement))

        full_response = "\n\n".join(response_parts)

        logger.info(f"AI Mentor responded to: {msg.message[:50]}...")
        
        return {
            "success": True,
            "response": full_response,
            "source": "educational_rules_v1",
            "timestamp": __import__('datetime').datetime.utcnow().isoformat()
        }

    except Exception as e:
        logger.error(f"AI Mentor Error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate response: {str(e)}"
  )
