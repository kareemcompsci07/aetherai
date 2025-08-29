"""
AetherAI - Social Feed Manager
File: backend/utils/social_feed.py
Purpose: Manage experiment sharing and social interactions
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Build a community of AI learners who inspire each other.
"""

from typing import Dict, Any, List
import random
from datetime import datetime, timedelta

class SocialFeedManager:
    """
    Manage social feed for experiment sharing and community interaction
    """
    
    # Mock social feed data (in production: use database)
    SOCIAL_FEED = [
        {
            "id": "post_001",
            "student": {
                "id": "std_001",
                "name": "Kareem Mostafa",
                "avatar": "/avatars/kareem.png",
                "school": "El-Abtal Language School",
                "country": "Egypt"
            },
            "experiment": {
                "id": "exp_123",
                "model": "CNN",
                "dataset": "MNIST",
                "accuracy": 0.983,
                "loss": 0.054,
                "training_time": 240,
                "date": "2025-04-15T14:30:00Z"
            },
            "content": "Just achieved 98.3% accuracy on MNIST with my custom CNN! The key was using dropout and data augmentation. Can't believe I did this from my phone!",
            "image": "/experiments/exp_123_preview.png",
            "likes": 24,
            "comments": 8,
            "shares": 3,
            "timestamp": "2025-04-15T14:35:00Z",
            "tags": ["#CNN", "#MNIST", "#MobileAI"]
        },
        {
            "id": "post_002",
            "student": {
                "id": "std_002",
                "name": "Yusuf Mohammed",
                "avatar": "/avatars/yusuf.png",
                "school": "Future City STEM Academy",
                "country": "Egypt"
            },
            "experiment": {
                "id": "exp_124",
                "model": "MLP",
                "dataset": "CIFAR-10",
                "accuracy": 0.721,
                "loss": 0.854,
                "training_time": 360,
                "date": "2025-04-15T13:45:00Z"
            },
            "content": "My first attempt at CIFAR-10! Still struggling with overfitting, but proud of my progress. Any suggestions for improvement?",
            "image": "/experiments/exp_124_preview.png",
            "likes": 18,
            "comments": 12,
            "shares": 5,
            "timestamp": "2025-04-15T14:00:00Z",
            "tags": ["#CIFAR10", "#Beginner", "#Overfitting"]
        },
        {
            "id": "post_003",
            "student": {
                "id": "std_003",
                "name": "Lina Chen",
                "avatar": "/avatars/lina.png",
                "school": "Beijing International School",
                "country": "China"
            },
            "experiment": {
                "id": "exp_125",
                "model": "ResNet",
                "dataset": "MNIST",
                "accuracy": 0.991,
                "loss": 0.032,
                "training_time": 420,
                "date": "2025-04-15T12:20:00Z"
            },
            "content": "Optimized ResNet architecture for MNIST! Used learning rate scheduling and batch normalization. The global leaderboard motivates me to keep improving!",
            "image": "/experiments/exp_125_preview.png",
            "likes": 31,
            "comments": 6,
            "shares": 8,
            "timestamp": "2025-04-15T12:30:00Z",
            "tags": ["#ResNet", "#Optimization", "#Leaderboard"]
        },
        {
            "id": "post_004",
            "student": {
                "id": "std_004",
                "name": "Ahmed Hassan",
                "avatar": "/avatars/ahmed.png",
                "school": "Cairo STEM School",
                "country": "Egypt"
            },
            "experiment": {
                "id": "exp_126",
                "model": "CNN",
                "dataset": "MNIST",
                "accuracy": 0.976,
                "loss": 0.071,
                "training_time": 210,
                "date": "2025-04-14T16:30:00Z"
            },
            "content": "Implemented CNN from scratch! The visualization tools helped me understand how feature maps evolve during training. So satisfying to see the progress!",
            "image": "/experiments/exp_126_preview.png",
            "likes": 22,
            "comments": 9,
            "shares": 4,
            "timestamp": "2025-04-14T16:45:00Z",
            "tags": ["#CNN", "#Visualization", "#Scratch"]
        }
    ]

    @staticmethod
    def get_feed(page: int = 1, limit: int = 10) -> Dict[str, Any]:
        """
        Get social feed with experiments shared by students
        """
        try:
            start_idx = (page - 1) * limit
            end_idx = start_idx + limit
            
            paginated_feed = SocialFeedManager.SOCIAL_FEED[start_idx:end_idx]
            
            return {
                "posts": paginated_feed,
                "pagination": {
                    "current_page": page,
                    "total_pages": (len(SocialFeedManager.SOCIAL_FEED) + limit - 1) // limit,
                    "total_posts": len(SocialFeedManager.SOCIAL_FEED),
                    "has_next": end_idx < len(SocialFeedManager.SOCIAL_FEED),
                    "has_prev": page > 1
                },
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            return {
                "error": f"Failed to get social feed: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def get_post(post_id: str) -> Dict[str, Any]:
        """
        Get a specific post by ID
        """
        try:
            post = next((p for p in SocialFeedManager.SOCIAL_FEED if p["id"] == post_id), None)
            
            if not post:
                return {
                    "error": f"Post {post_id} not found",
                    "timestamp": datetime.utcnow().isoformat()
                }
            
            # Add comments for demonstration
            comments = [
                {
                    "id": f"cm_{i}",
                    "student": {
                        "name": random.choice([
                            "Fatima Ali", "Carlos Rodriguez", "Nina Patel", 
                            "Mohamed Ahmed", "Sarah Johnson"
                        ]),
                        "avatar": f"/avatars/{random.choice(['fatima', 'carlos', 'nina', 'mohamed', 'sarah'])}.png"
                    },
                    "content": random.choice([
                        "Amazing work! Your accuracy is impressive!",
                        "Great experiment! I learned a lot from your approach.",
                        "Keep up the great work! You're inspiring me.",
                        "Your visualization is so clear. Well done!",
                        "I'm trying something similar. Can I ask you questions?"
                    ]),
                    "timestamp": (datetime.utcnow() - timedelta(minutes=random.randint(1, 60))).isoformat()
                }
                for i in range(random.randint(3, 8))
            ]
            
            return {
                "post": post,
                "comments": comments,
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            return {
                "error": f"Failed to get post: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def create_post(student_id: str, experiment_id: str, content: str, tags: List[str] = None) -> Dict[str, Any]:
        """
        Create a new post sharing an experiment
        """
        try:
            # In production: validate student and experiment exist
            
            new_post = {
                "id": f"post_{len(SocialFeedManager.SOCIAL_FEED) + 1:03d}",
                "student": {
                    "id": student_id,
                    "name": f"Student {student_id}",
                    "avatar": f"/avatars/{student_id}.png",
                    "school": "Unknown School",
                    "country": "Unknown"
                },
                "experiment": {
                    "id": experiment_id,
                    "model": "Unknown",
                    "dataset": "Unknown",
                    "accuracy": round(random.uniform(0.7, 0.98), 3),
                    "loss": round(random.uniform(0.05, 0.3), 3),
                    "training_time": random.randint(120, 600),
                    "date": datetime.utcnow().isoformat()
                },
                "content": content,
                "image": f"/experiments/{experiment_id}_preview.png",
                "likes": random.randint(0, 15),
                "comments": 0,
                "shares": 0,
                "timestamp": datetime.utcnow().isoformat(),
                "tags": tags or []
            }
            
            # Add to feed (in production: save to database)
            SocialFeedManager.SOCIAL_FEED.insert(0, new_post)
            
            return {
                "status": "success",
                "post": new_post,
                "message": "🎉 Experiment shared successfully!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to create post: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def like_post(post_id: str, student_id: str) -> Dict[str, Any]:
        """
        Like a post
        """
        try:
            post = next((p for p in SocialFeedManager.SOCIAL_FEED if p["id"] == post_id), None)
            
            if not post:
                return {
                    "error": f"Post {post_id} not found",
                    "timestamp": datetime.utcnow().isoformat()
                }
            
            # In production: check if already liked
            post["likes"] += 1
            
            return {
                "status": "success",
                "likes": post["likes"],
                "message": "❤️ Post liked!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to like post: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def add_comment(post_id: str, student_id: str, content: str) -> Dict[str, Any]:
        """
        Add a comment to a post
        """
        try:
            post = next((p for p in SocialFeedManager.SOCIAL_FEED if p["id"] == post_id), None)
            
            if not post:
                return {
                    "error": f"Post {post_id} not found",
                    "timestamp": datetime.utcnow().isoformat()
                }
            
            comment = {
                "id": f"cm_{len(post.get('comments', 0)) + 1}",
                "student": {
                    "id": student_id,
                    "name": f"Student {student_id}",
                    "avatar": f"/avatars/{student_id}.png"
                },
                "content": content,
                "timestamp": datetime.utcnow().isoformat()
            }
            
            if "comments_list" not in post:
                post["comments_list"] = []
            
            post["comments_list"].insert(0, comment)
            post["comments"] += 1
            
            return {
                "status": "success",
                "comment": comment,
                "message": "💬 Comment added!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to add comment: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }

# Example usage
if __name__ == "__main__":
    manager = SocialFeedManager()
    
    print("🎯 Social Feed Test:")
    
    # Test feed
    feed = manager.get_feed()
    if "error" not in feed:
        print(f"Total posts: {feed['pagination']['total_posts']}")
        print(f"Current page: {feed['pagination']['current_page']}")
        for post in feed["posts"][:2]:
            print(f"  • {post['student']['name']}: {post['content'][:50]}...")
    
    # Test specific post
    print("\n📄 Post Details:")
    post = manager.get_post("post_001")
    if "error" not in post:
        print(f"Post by: {post['post']['student']['name']}")
        print(f"Accuracy: {post['post']['experiment']['accuracy']:.3f}")
        print(f"Comments: {len(post['comments'])}")
