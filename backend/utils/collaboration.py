"""
AetherAI - Collaboration Utilities
File: backend/utils/collaboration.py
Purpose: Handle student collaboration features (sharing, permissions, etc.)
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students learn AI together, not alone.
"""

import uuid
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, List

# In production: use database (SQLite/PostgreSQL)
# For now: in-memory storage (will be lost on restart)
COLLABORATION_LINKS: Dict[str, Dict] = {}

class CollaborationManager:
    """
    Manage collaboration links between students
    """
    
    @staticmethod
    def create_share_link(experiment_id: str, creator_name: str = "Anonymous", 
                         expires_in_hours: int = 24) -> Dict[str, Any]:
        """
        Create a shareable link for an experiment
        """
        link_id = str(uuid.uuid4())[:8]  # Short ID
        
        expires_at = datetime.utcnow() + timedelta(hours=expires_in_hours)
        
        link_data = {
            "link_id": link_id,
            "experiment_id": experiment_id,
            "creator": creator_name,
            "created_at": datetime.utcnow().isoformat(),
            "expires_at": expires_at.isoformat(),
            "view_count": 0,
            "max_views": 100,
            "allowed_uses": 10,
            "current_uses": 0
        }
        
        COLLABORATION_LINKS[link_id] = link_data
        
        return {
            "success": True,
            "link": f"/share/{link_id}",
            "full_url": f"http://localhost:3000/share/{link_id}",
            "link_id": link_id,
            "expires_in": f"{expires_in_hours} hours",
            "message": "✅ Share link created! Send this to your classmate."
        }
    
    @staticmethod
    def get_experiment_by_link(link_id: str) -> Optional[Dict]:
        """
        Get experiment data by share link
        """
        if link_id not in COLLABORATION_LINKS:
            return None
        
        link_data = COLLABORATION_LINKS[link_id]
        
        # Check expiration
        expires_at = datetime.fromisoformat(link_data["expires_at"])
        if datetime.utcnow() > expires_at:
            del COLLABORATION_LINKS[link_id]
            return None
        
        # Check usage limits
        if link_data["current_uses"] >= link_data["allowed_uses"]:
            return None  # Link expired by use count
        
        # Increment counters
        link_data["current_uses"] += 1
        link_data["view_count"] += 1
        
        return link_data
    
    @staticmethod
    def get_link_info(link_id: str) -> Optional[Dict]:
        """
        Get information about a share link
        """
        if link_id not in COLLABORATION_LINKS:
            return None
        
        link_data = COLLABORATION_LINKS[link_id].copy()
        
        # Add status
        expires_at = datetime.fromisoformat(link_data["expires_at"])
        now = datetime.utcnow()
        
        if now > expires_at:
            link_data["status"] = "expired (time)"
        elif link_data["current_uses"] >= link_data["allowed_uses"]:
            link_data["status"] = "expired (uses)"
        else:
            link_data["status"] = "active"
        
        return link_data
    
    @staticmethod
    def list_active_links() -> List[Dict]:
        """
        List all active collaboration links
        """
        active_links = []
        now = datetime.utcnow()
        
        for link_id, data in COLLABORATION_LINKS.items():
            expires_at = datetime.fromisoformat(data["expires_at"])
            if now <= expires_at and data["current_uses"] < data["allowed_uses"]:
                active_links.append({
                    "link_id": link_id,
                    "experiment_id": data["experiment_id"],
                    "creator": data["creator"],
                    "created_at": data["created_at"],
                    "expires_at": data["expires_at"],
                    "uses": f"{data['current_uses']}/{data['allowed_uses']}",
                    "status": "active"
                })
        
        return active_links

# Example usage
if __name__ == "__main__":
    # Test collaboration
    manager = CollaborationManager()
    
    # Create link
    result = manager.create_share_link("exp_123", "Kareem", 2)
    print("Created link:", result)
    
    # Get link info
    info = manager.get_link_info(result["link_id"])
    print("Link info:", info)
    
    # List active links
    active = manager.list_active_links()
    print("Active links:", active)
