"""
AetherAI - Adaptive Learning Path Generator
File: backend/utils/adaptive_learning.py
Purpose: Generate personalized learning paths based on student progress and interests
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students follow the optimal path in their AI learning journey.
"""

from typing import Dict, Any, List
import random
from datetime import datetime, timedelta

class AdaptiveLearningPath:
    """
    Generate personalized learning paths based on student progress and interests
    """
    
    # Learning path stages
    LEARNING_STAGES = {
        "beginner": {
            "name": "Beginner",
            "description": "Foundational concepts and basic skills",
            "next_stages": ["intermediate"],
            "duration_weeks": 8
        },
        "intermediate": {
            "name": "Intermediate",
            "description": "Core AI concepts and practical applications",
            "next_stages": ["advanced"],
            "duration_weeks": 12
        },
        "advanced": {
            "name": "Advanced",
            "description": "Specialized topics and research-level concepts",
            "next_stages": ["expert"],
            "duration_weeks": 16
        },
        "expert": {
            "name": "Expert",
            "description": "Cutting-edge research and innovation",
            "next_stages": [],
            "duration_weeks": 20
        }
    }
    
    # Learning resources
    LEARNING_RESOURCES = {
        "foundations": [
            {"title": "Introduction to AI", "type": "course", "difficulty": "beginner", "duration": "4 weeks", "platform": "Coursera"},
            {"title": "Python for Data Science", "type": "course", "difficulty": "beginner", "duration": "6 weeks", "platform": "edX"},
            {"title": "Mathematics for Machine Learning", "type": "course", "difficulty": "beginner", "duration": "8 weeks", "platform": "Coursera"},
            {"title": "AI Ethics Fundamentals", "type": "course", "difficulty": "beginner", "duration": "3 weeks", "platform": "FutureLearn"}
        ],
        "core_concepts": [
            {"title": "Deep Learning Specialization", "type": "course", "difficulty": "intermediate", "duration": "12 weeks", "platform": "Coursera"},
            {"title": "Hands-On Machine Learning", "type": "book", "difficulty": "intermediate", "duration": "10 weeks", "platform": "O'Reilly"},
            {"title": "PyTorch Tutorials", "type": "tutorial", "difficulty": "intermediate", "duration": "6 weeks", "platform": "PyTorch.org"},
            {"title": "Computer Vision Basics", "type": "course", "difficulty": "intermediate", "duration": "8 weeks", "platform": "Udacity"}
        ],
        "advanced_topics": [
            {"title": "Advanced Deep Learning", "type": "course", "difficulty": "advanced", "duration": "16 weeks", "platform": "Stanford Online"},
            {"title": "Generative Models", "type": "course", "difficulty": "advanced", "duration": "12 weeks", "platform": "Coursera"},
            {"title": "Reinforcement Learning", "type": "course", "difficulty": "advanced", "duration": "14 weeks", "platform": "Udacity"},
            {"title": "Natural Language Processing", "type": "course", "difficulty": "advanced", "duration": "10 weeks", "platform": "DeepLearning.AI"}
        ],
        "research_level": [
            {"title": "Research Methods in AI", "type": "course", "difficulty": "expert", "duration": "20 weeks", "platform": "MIT OpenCourseWare"},
            {"title": "AI Research Paper Reading Group", "type": "community", "difficulty": "expert", "duration": "ongoing", "platform": "Discord"},
            {"title": "Conference Paper Writing", "type": "workshop", "difficulty": "expert", "duration": "8 weeks", "platform": "NeurIPS"},
            {"title": "Open Source AI Contribution", "type": "project", "difficulty": "expert", "duration": "ongoing", "platform": "GitHub"}
        ]
    }
    
    # Career paths
    CAREER_PATHS = {
        "research_scientist": {
            "name": "Research Scientist",
            "description": "Focus on advancing AI knowledge through research",
            "required_skills": ["mathematics", "statistics", "research methods", "scientific writing"],
            "recommended_resources": ["Research Methods in AI", "AI Research Paper Reading Group"]
        },
        "machine_learning_engineer": {
            "name": "Machine Learning Engineer",
            "description": "Build and deploy AI systems in production",
            "required_skills": ["programming", "software engineering", "system design", "deployment"],
            "recommended_resources": ["Deep Learning Specialization", "Hands-On Machine Learning"]
        },
        "data_scientist": {
            "name": "Data Scientist",
            "description": "Extract insights from data using AI techniques",
            "required_skills": ["data analysis", "statistics", "visualization", "business understanding"],
            "recommended_resources": ["Mathematics for Machine Learning", "Python for Data Science"]
        },
        "ai_ethicist": {
            "name": "AI Ethicist",
            "description": "Ensure AI systems are fair, transparent, and responsible",
            "required_skills": ["ethics", "philosophy", "bias detection", "policy"],
            "recommended_resources": ["AI Ethics Fundamentals", "AI Research Paper Reading Group"]
        }
    }
    
    @staticmethod
    def generate_learning_path(student_profile: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate personalized learning path based on student profile
        """
        try:
            student_id = student_profile.get("student_id", "unknown")
            name = student_profile.get("name", "Student")
            current_level = student_profile.get("current_level", "beginner")
            interests = student_profile.get("interests", [])
            goals = student_profile.get("goals", [])
            country = student_profile.get("country", "Egypt")
            best_accuracy = student_profile.get("best_accuracy", 0.7)
            projects_completed = student_profile.get("projects_completed", 0)
            collaboration_score = student_profile.get("collaboration_score", 0.5)
            improvement_rate = student_profile.get("improvement_rate", 0.1)
            past_experiments = student_profile.get("past_experiments", [])
            
            # Determine current stage
            if current_level not in AdaptiveLearningPath.LEARNING_STAGES:
                current_level = "beginner"
            
            current_stage = AdaptiveLearningPath.LEARNING_STAGES[current_level]
            
            # Calculate progress percentage
            total_progress = (best_accuracy * 30 + 
                            projects_completed * 15 + 
                            collaboration_score * 25 + 
                            improvement_rate * 30)
            progress_percentage = min(100, int(total_progress))
            
            # Determine next stage
            next_stages = current_stage["next_stages"]
            next_stage = next_stages[0] if next_stages else current_level
            
            # Select focus area based on interests
            focus_areas = ["foundations", "core_concepts", "advanced_topics", "research_level"]
            if "AI" in interests or "Machine Learning" in interests:
                focus_area = "core_concepts"
            elif "Ethics" in interests:
                focus_area = "research_level"
            elif "Programming" in interests:
                focus_area = "foundations"
            else:
                focus_area = random.choice(focus_areas)
            
            # Select career path based on goals
            career_path_id = "research_scientist"  # Default
            if "become AI researcher" in [g.lower() for g in goals]:
                career_path_id = "research_scientist"
            elif "work in industry" in [g.lower() for g in goals]:
                career_path_id = "machine_learning_engineer"
            elif "analyze data" in [g.lower() for g in goals]:
                career_path_id = "data_scientist"
            elif "ethical AI" in [g.lower() for g in goals]:
                career_path_id = "ai_ethicist"
            
            career_path = AdaptiveLearningPath.CAREER_PATHS[career_path_id]
            
            # Select resources based on focus area and career path
            available_resources = AdaptiveLearningPath.LEARNING_RESOURCES[focus_area]
            recommended_resources = []
            
            # Prioritize resources that match career path
            career_resources = career_path["recommended_resources"]
            for resource in available_resources:
                if resource["title"] in career_resources:
                    recommended_resources.append(resource)
            
            # Fill remaining slots with other resources
            remaining_slots = 3 - len(recommended_resources)
            other_resources = [r for r in available_resources if r not in recommended_resources]
            selected_other = random.sample(other_resources, min(remaining_slots, len(other_resources)))
            recommended_resources.extend(selected_other)
            
            # Generate timeline
            start_date = datetime.utcnow()
            end_date = start_date + timedelta(weeks=current_stage["duration_weeks"])
            
            # Generate encouragement message
            if progress_percentage >= 80:
                encouragement = f"Amazing progress, {name}! You're on an excellent path to becoming an AI expert."
            elif progress_percentage >= 60:
                encouragement = f"Good job, {name}! With consistent effort, you'll reach your AI goals."
            else:
                encouragement = f"Keep learning, {name}! Every step brings you closer to your AI dreams."
            
            # Generate improvement suggestions
            suggestions = []
            
            if projects_completed < 2:
                suggestions.append("Complete more AI projects to build practical experience")
            
            if collaboration_score < 0.7:
                suggestions.append("Collaborate with classmates to improve teamwork skills")
            
            if improvement_rate < 0.15:
                suggestions.append("Focus on understanding concepts deeply rather than just completing tasks")
            
            if not suggestions:
                suggestions.append("You're doing great! Keep following your learning path.")
            
            learning_path = {
                "student_id": student_id,
                "name": name,
                "generation_date": datetime.utcnow().isoformat(),
                "current_level": current_level,
                "current_stage": current_stage["name"],
                "progress_percentage": progress_percentage,
                "next_stage": AdaptiveLearningPath.LEARNING_STAGES[next_stage]["name"] if next_stages else "Expert",
                "focus_area": focus_area.replace("_", " ").title(),
                "career_path": career_path["name"],
                "recommended_resources": recommended_resources,
                "timeline": {
                    "start_date": start_date.isoformat(),
                    "end_date": end_date.isoformat(),
                    "duration_weeks": current_stage["duration_weeks"]
                },
                "milestones": [
                    f"Complete {len(recommended_resources)} recommended resources",
                    "Build 2 more AI projects",
                    "Collaborate with 3 classmates",
                    "Achieve 90%+ accuracy on a challenging dataset"
                ],
                "suggestions": suggestions,
                "recommendations": [
                    "Set specific weekly goals for your learning",
                    "Join AI communities to connect with peers",
                    "Teach concepts to others to reinforce your understanding",
                    "Apply AI to real-world problems that interest you"
                ],
                "encouragement": encouragement
            }
            
            return {
                "status": "success",
                "learning_path": learning_path,
                "message": f"🎯 Personalized learning path generated for {name}!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to generate learning path: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def get_learning_guidelines() -> Dict[str, Any]:
        """
        Get guidelines for effective AI learning
        """
        guidelines = {
            "study_tips": [
                "Practice coding daily, even if only for 30 minutes",
                "Work on projects that interest you to stay motivated",
                "Explain concepts to others to deepen your understanding",
                "Review and refactor your code regularly"
            ],
            "project_ideas": [
                "Build a simple image classifier for handwritten digits",
                "Create a chatbot that answers questions about AI",
                "Develop a recommendation system for movies or books",
                "Analyze a dataset from your community or country"
            ],
            "collaboration": [
                "Join study groups with classmates",
                "Participate in online AI communities",
                "Share your experiments and learn from feedback",
                "Collaborate on open-source AI projects"
            ],
            "career_development": [
                "Build a portfolio of your AI projects",
                "Attend virtual AI conferences and meetups",
                "Connect with AI professionals on LinkedIn",
                "Publish your work in student journals or blogs"
            ]
        }
        
        return {
            "status": "success",
            "guidelines": guidelines,
            "message": "📚 Best practices for AI learning"
        }

# Example usage
if __name__ == "__main__":
    path_generator = AdaptiveLearningPath()
    
    # Test student profiles
    test_students = [
        {
            "student_id": "std_123",
            "name": "Kareem Mostafa",
            "current_level": "intermediate",
            "interests": ["AI", "Machine Learning"],
            "goals": ["become AI researcher"],
            "country": "Egypt",
            "best_accuracy": 0.983,
            "projects_completed": 5,
            "collaboration_score": 0.9,
            "improvement_rate": 0.15,
            "past_experiments": [
                {"accuracy": 0.85, "loss": 0.4, "model": "MLP", "dataset": "MNIST"},
                {"accuracy": 0.92, "loss": 0.2, "model": "CNN", "dataset": "MNIST"},
                {"accuracy": 0.96, "loss": 0.1, "model": "CNN", "dataset": "CIFAR-10"},
                {"accuracy": 0.983, "loss": 0.054, "model": "Custom CNN", "dataset": "MNIST"}
            ]
        },
        {
            "student_id": "std_456",
            "name": "Yusuf Mohammed",
            "current_level": "beginner",
            "interests": ["Programming", "Ethics"],
            "goals": ["ethical AI development"],
            "country": "Egypt",
            "best_accuracy": 0.75,
            "projects_completed": 1,
            "collaboration_score": 0.6,
            "improvement_rate": 0.12,
            "past_experiments": [
                {"accuracy": 0.65, "loss": 0.8, "model": "MLP", "dataset": "MNIST"}
            ]
        }
    ]
    
    print("🎯 Adaptive Learning Path Generator Test:")
    
    for student in test_students:
        print(f"\n👤 Generating learning path for: {student['name']} (Level: {student['current_level']})")
        
        # Test path generation
        result = path_generator.generate_learning_path(student)
        if "error" not in result:
            path = result["learning_path"]
            print(f"  Progress: {path['progress_percentage']}%")
            print(f  "  Next stage: {path['next_stage']}")
            print(f  "  Career path: {path['career_path']}")
        
        # Test guidelines
        guidelines = path_generator.get_learning_guidelines()
        if "error" not in guidelines:
            print(f"  Loaded {len(guidelines['guidelines'])} guideline categories")
