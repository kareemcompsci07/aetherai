"""
AetherAI - Social Feed API
File: backend/routes/social_feed.py
Purpose: Provide social sharing and community interaction
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Build a community of AI learners who inspire each other.
"""

from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
import logging

# Import manager
from ..utils.social_feed import SocialFeedManager

# Initialize router
router = APIRouter(prefix="/api/v1/social", tags=["social"])

# Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.get("/feed")
async def get_social_feed(page: int = 1, limit: int = 10):
    """
    Get paginated social feed of shared experiments
    """
    try:
        logger.info(f"Fetching social feed: page={page}, limit={limit}")
        
        # Use social feed manager
        manager = SocialFeedManager()
        feed = manager.get_feed(page, limit)
        
        if "error" in feed:
            raise HTTPException(status_code=404, detail=feed["error"])
        
        return {
            "status": "success",
            "feed": feed["posts"],
            "pagination": feed["pagination"],
            "message": "🌍 Global social feed loaded!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Social Feed Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/post/{post_id}")
async def get_post(post_id: str):
    """
    Get a specific post and its comments
    """
    try:
        logger.info(f"Fetching post: {post_id}")
        
        # Use social feed manager
        manager = SocialFeedManager()
        result = manager.get_post(post_id)
        
        if "error" in result:
            raise HTTPException(status_code=404, detail=result["error"])
        
        return {
            "status": "success",
            "post": result["post"],
            "comments": result["comments"],
            "message": "📄 Post details loaded!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get Post Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/post")
async def create_post(
    student_id: str = Body(..., embed=True),
    experiment_id: str = Body(..., embed=True),
    content: str = Body(..., embed=True),
    tags: list = Body(default=[], embed=True)
):
    """
    Create a new post sharing an experiment
    """
    try:
        logger.info(f"Creating post for student: {student_id}, experiment: {experiment_id}")
        
        # Use social feed manager
        manager = SocialFeedManager()
        result = manager.create_post(student_id, experiment_id, content, tags)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return {
            "status": "success",
            "post": result["post"],
            "message": "🎉 Experiment shared successfully!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Create Post Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/like/{post_id}")
async def like_post(post_id: str, student_id: str = Body(..., embed=True)):
    """
    Like a post
    """
    try:
        logger.info(f"Liking post: {post_id} by student: {student_id}")
        
        # Use social feed manager
        manager = SocialFeedManager()
        result = manager.like_post(post_id, student_id)
        
        if "error" in result:
            raise HTTPException(status_code=404, detail=result["error"])
        
        return {
            "status": "success",
            "likes": result["likes"],
            "message": "❤️ Post liked!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Like Post Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/comment/{post_id}")
async def add_comment(
    post_id: str,
    student_id: str = Body(..., embed=True),
    content: str = Body(..., embed=True)
):
    """
    Add a comment to a post
    """
    try:
        logger.info(f"Adding comment to post: {post_id} by student: {student_id}")
        
        # Use social feed manager
        manager = SocialFeedManager()
        result = manager.add_comment(post_id, student_id, content)
        
        if "error" in result:
            raise HTTPException(status_code=404, detail=result["error"])
        
        return {
            "status": "success",
            "comment": result["comment"],
            "message": "💬 Comment added!"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Add Comment Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/trending")
async def get_trending_experiments():
    """
    Get trending experiments based on engagement
    """
    try:
        # In production: calculate based on likes, comments, shares
        trending = [
            {
                "experiment_id": "exp_123",
                "title": "98.3% Accuracy on MNIST with Custom CNN",
                "student": "Kareem Mostafa",
                "school": "El-Abtal Language School",
                "country": "Egypt",
                "accuracy": 0.983,
                "engagement_score": 35,
                "image": "/experiments/exp_123_preview.png"
            },
            {
                "experiment_id": "exp_125",
                "title": "Optimized ResNet for MNIST Classification",
                "student": "Lina Chen",
                "school": "Beijing International School",
                "country": "China",
                "accuracy": 0.991,
                "engagement_score": 45,
                "image": "/experiments/exp_125_preview.png"
            },
            {
                "experiment_id": "exp_124",
                "title": "First Attempt at CIFAR-10 Classification",
                "student": "Yusuf Mohammed",
                "school": "Future City STEM Academy",
                "country": "Egypt",
                "accuracy": 0.721,
                "engagement_score": 30,
                "image": "/experiments/exp_124_preview.png"
            }
        ]
        
        return {
            "trending": trending,
            "message": "🔥 Trending AI experiments worldwide"
        }
        
    except Exception as e:
        logger.error(f"Trending Experiments Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
