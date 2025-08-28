"""
AetherAI - Collaboration API
File: backend/routes/collaboration.py
Purpose: Enable students to share experiments with classmates
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students learn AI together, not alone.
"""

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Dict, Any, Optional
import logging

# Import collaboration utilities
from ..utils.collaboration import CollaborationManager

# Initialize router
router = APIRouter(prefix="/api/v1/collaboration", tags=["collaboration"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Request models
class ShareRequest(BaseModel):
    experiment_id: str
    creator_name: str = "Anonymous"
    expires_in_hours: int = 24

@router.post("/share")
async def create_share_link(request: ShareRequest):
    """
    Create a shareable link for an experiment
    """
    try:
        logger.info(f"Creating share link for experiment: {request.experiment_id}")
        
        manager = CollaborationManager()
        result = manager.create_share_link(
            experiment_id=request.experiment_id,
            creator_name=request.creator_name,
            expires_in_hours=request.expires_in_hours
        )
        
        return result
        
    except Exception as e:
        logger.error(f"Collaboration Error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create share link: {str(e)}"
        )

@router.get("/link/{link_id}")
async def get_experiment_by_link(link_id: str):
    """
    Access an experiment via share link
    """
    try:
        manager = CollaborationManager()
        link_data = manager.get_experiment_by_link(link_id)
        
        if not link_data:
            raise HTTPException(
                status_code=404,
                detail="Share link not found, expired, or used up"
            )
        
        # In full version: return actual experiment data
        return {
            "success": True,
            "link_id": link_id,
            "experiment_id": link_data["experiment_id"],
            "creator": link_data["creator"],
            "message": f"Shared experiment from {link_data['creator']}"
        }
        
    except Exception as e:
        logger.error(f"Collaboration Access Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/info/{link_id}")
async def get_link_info(link_id: str):
    """
    Get information about a share link
    """
    try:
        manager = CollaborationManager()
        info = manager.get_link_info(link_id)
        
        if not info:
            raise HTTPException(
                status_code=404,
                detail="Link not found"
            )
        
        return {
            "link_id": link_id,
            "status": info["status"],
            "experiment_id": info["experiment_id"],
            "creator": info["creator"],
            "created_at": info["created_at"],
            "expires_at": info["expires_at"],
            "uses": f"{info['current_uses']}/{info['allowed_uses']}",
            "message": "Link information retrieved"
        }
        
    except Exception as e:
        logger.error(f"Link Info Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/active")
async def list_active_links():
    """
    List all active collaboration links (for debugging/monitoring)
    """
    try:
        manager = CollaborationManager()
        active_links = manager.list_active_links()
        return {
            "count": len(active_links),
            "links": active_links,
            "message": "Active links retrieved"
        }
    except Exception as e:
        logger.error(f"Active Links Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
