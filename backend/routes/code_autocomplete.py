"""
AetherAI - Code Auto-Completion API
File: backend/routes/code_autocomplete.py
Purpose: Provide AI-powered code suggestions for AI model building
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students write better AI code with intelligent suggestions.
"""

from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
import logging

# Import auto-completion system
from ..utils.code_autocomplete import CodeAutoComplete

# Initialize router
router = APIRouter(prefix="/api/v1/code-autocomplete", tags=["code-autocomplete"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/suggest")
async def suggest_code_completion(code_context: dict = Body(...)):
    """
    Generate intelligent code completion suggestions based on context
    """
    try:
        context = code_context.get("context", "")
        logger.info(f"Generating code suggestions for context: {context[:50]}...")
        
        # Use code completer
        completer = CodeAutoComplete()
        result = completer.generate_suggestions(context)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "code_context": result["code_context"],
            "suggestions": result["suggestions"],
            "total_suggestions": result["total_suggestions"],
            "message": f"💡 {result['total_suggestions']} code suggestions generated!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Code Auto-Completion Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze-error")
async def analyze_code_error(error_data: dict = Body(...)):
    """
    Analyze code error and provide solutions
    """
    try:
        error_message = error_data.get("error_message", "")
        logger.info(f"Analyzing code error: {error_message[:50]}...")
        
        # Use code completer
        completer = CodeAutoComplete()
        result = completer.analyze_error(error_message)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "error_type": result["error_type"],
            "error_message": result["error_message"],
            "explanation": result["explanation"],
            "solutions": result["solutions"],
            "code_example": result["code_example"],
            "confidence": result["confidence"],
            "message": "🔧 Error analysis complete!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error Analysis Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/best-practices")
async def get_best_practices():
    """
    Get best practices for AI code development
    """
    try:
        logger.info("Fetching best practices for AI development")
        
        # Use code completer
        completer = CodeAutoComplete()
        result = completer.get_best_practices()
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "best_practices": result["best_practices"],
            "message": "📚 Best practices for AI development"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Best Practices Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
