"""
AetherAI - AI-Powered Report Generator
File: backend/utils/report_generator.py
Purpose: Generate intelligent, natural language insights using Hugging Face Transformers
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: No GPU? No problem. Just generate smart reports.
"""

from transformers import pipeline
import logging
from typing import Dict, Any, List
import re

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize text generation pipeline (will run on CPU)
try:
    generator = pipeline(
        "text-generation",
        model="gpt2",  # Lightweight, works on CPU
        max_new_tokens=150,
        temperature=0.7,
        top_p=0.9,
        repetition_penalty=1.2
    )
    MODEL_LOADED = True
    logger.info("✅ Hugging Face GPT-2 model loaded successfully (CPU mode)")
except Exception as e:
    logger.warning(f"⚠️ Failed to load GPT-2 model: {str(e)}. Running in fallback mode.")
    MODEL_LOADED = False

def generate_ai_insights(metrics: Dict[str, List[float]], model: str, dataset: str, accuracy: float) -> List[str]:
    """
    Generate AI-powered natural language insights about training performance
    """
    if not MODEL_LOADED:
        return _fallback_insights(accuracy, model, dataset)
    
    try:
        # Create prompt for the model
        prompt = f"""
Analyze this AI training experiment:
- Model: {model.upper()}
- Dataset: {dataset}
- Final Accuracy: {accuracy:.1%}
- Training was {'successful' if accuracy > 0.8 else 'moderate' if accuracy > 0.6 else 'needs improvement'}

Key metrics:
- Accuracy started at {metrics['accuracy'][0]:.3f} and ended at {metrics['accuracy'][-1]:.3f}
- Loss decreased from {metrics['loss'][0]:.3f} to {metrics['loss'][-1]:.3f}

Write a short, professional analysis with:
1. Performance summary
2. What went well
3. One suggestion for improvement

Keep it educational and encouraging for students.
"""
        
        # Generate text
        outputs = generator(prompt, max_new_tokens=120, num_return_sequences=1)
        generated_text = outputs[0]["generated_text"][len(prompt):].strip()
        
        # Clean and format
        sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', generated_text) if s.strip()]
        sentences = sentences[:4]  # Limit to 4 sentences
        
        # Ensure last sentence is complete
        if sentences and not re.match(r'.*[.!?]$', sentences[-1]):
            sentences[-1] += "."
        
        return [f"🧠 {sent}" for sent in sentences]
    
    except Exception as e:
        logger.error(f"Error in AI insight generation: {str(e)}")
        return _fallback_insights(accuracy, model, dataset)

def _fallback_insights(accuracy: float, model: str, dataset: str) -> List[str]:
    """
    Fallback static insights if model fails to load
    """
    base = [
        f"✅ {model.upper()} model trained on {dataset} dataset.",
        f"📊 Final accuracy: {accuracy:.1%}."
    ]
    
    if accuracy > 0.9:
        base.append("🎉 Excellent performance! The model learned the patterns effectively.")
        base.append("💡 Tip: Try a more complex dataset to challenge it further.")
    elif accuracy > 0.7:
        base.append("👍 Good result. The model is learning well.")
        base.append("💡 Tip: Increase epochs or adjust learning rate for better accuracy.")
    else:
        base.append("⚠️ Accuracy is low. Check data quality or try a different model.")
        base.append("💡 Tip: Preprocess your data or use data augmentation techniques.")
    
    return base

# Example usage (for testing)
if __name__ == "__main__":
    sample_metrics = {
        "accuracy": [0.1, 0.45, 0.67, 0.78, 0.82, 0.86, 0.89, 0.91, 0.95, 0.983],
        "loss": [2.3, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4, 0.054]
    }
    
    insights = generate_ai_insights(sample_metrics, "cnn", "MNIST", 0.983)
    for insight in insights:
        print(insight)
