"""
AetherAI - Career Path Advisor
File: backend/utils/career_advisor.py
Purpose: Analyze student performance and suggest career paths
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students connect their AI skills to future universities and careers.
"""

from typing import Dict, Any, List
import random
from datetime import datetime

class CareerAdvisor:
    """
    Analyze student performance and provide career guidance
    """
    
    # University rankings and requirements
    UNIVERSITY_DATA = {
        "MIT": {
            "ranking": 1,
            "focus": "AI Research",
            "suggested_gpa": 4.0,
            "suggested_projects": 5,
            "suggested_accuracy": 0.98,
            "location": "Cambridge, USA",
            "advice": "Focus on research publications and math competitions"
        },
        "Stanford": {
            "ranking": 2,
            "focus": "AI Entrepreneurship",
            "suggested_gpa": 3.9,
            "suggested_projects": 4,
            "suggested_accuracy": 0.97,
            "location": "California, USA",
            "advice": "Build startups and participate in hackathons"
        },
        "Oxford": {
            "ranking": 3,
            "focus": "Theoretical AI",
            "suggested_gpa": 3.8,
            "suggested_projects": 3,
            "suggested_accuracy": 0.96,
            "location": "Oxford, UK",
            "advice": "Focus on mathematics and theoretical computer science"
        },
        "ETH Zurich": {
            "ranking": 4,
            "focus": "Engineering Excellence",
            "suggested_gpa": 3.7,
            "suggested_projects": 3,
            "suggested_accuracy": 0.95,
            "location": "Zurich, Switzerland",
            "advice": "Emphasize engineering projects and technical skills"
        },
        "National University of Singapore": {
            "ranking": 5,
            "focus": "AI in Asia",
            "suggested_gpa": 3.8,
            "suggested_projects": 4,
            "suggested_accuracy": 0.96,
            "location": "Singapore",
            "advice": "Focus on regional AI challenges and innovation"
        },
        "Cairo University": {
            "ranking": "Top in Egypt",
            "focus": "Local AI Development",
            "suggested_gpa": 3.5,
            "suggested_projects": 2,
            "suggested_accuracy": 0.90,
            "location": "Cairo, Egypt",
            "advice": "Build solutions for local community problems"
        },
        "Future University in Egypt": {
            "ranking": "Emerging",
            "focus": "Tech Innovation",
            "suggested_gpa": 3.4,
            "suggested_projects": 2,
            "suggested_accuracy": 0.88,
            "location": "New Cairo, Egypt",
            "advice": "Focus on practical applications and industry projects"
        }
    }

    @staticmethod
    def advise_student(profile: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze student profile and provide career advice
        """
        try:
            # Extract student data
            accuracy = profile.get("best_accuracy", 0.0)
            projects_completed = profile.get("projects_completed", 0)
            collaboration_score = profile.get("collaboration_score", 0)
            improvement_rate = profile.get("improvement_rate", 0)
            country = profile.get("country", "Unknown")
            
            # Calculate student level
            if accuracy >= 0.97 and projects_completed >= 4:
                level = "World-Class"
                emoji = "🚀"
            elif accuracy >= 0.95 and projects_completed >= 3:
                level = "Excellent"
                emoji = "🏆"
            elif accuracy >= 0.90 and projects_completed >= 2:
                level = "Good"
                emoji = "👍"
            else:
                level = "Developing"
                emoji = "🌱"
            
            # Find suitable universities
            recommended_unis = []
            for uni_name, uni_data in CareerAdvisor.UNIVERSITY_DATA.items():
                # Calculate match score
                accuracy_match = accuracy >= uni_data["suggested_accuracy"]
                project_match = projects_completed >= uni_data["suggested_projects"]
                strong_match = accuracy_match and project_match
                
                if strong_match or (accuracy_match and projects_completed >= 1):
                    recommended_unis.append({
                        "name": uni_name,
                        "match": "Strong Match" if strong_match else "Good Potential",
                        "focus": uni_data["focus"],
                        "location": uni_data["location"],
                        "advice": uni_data["advice"]
                    })
            
            # Career suggestions
            if level == "World-Class":
                career_paths = [
                    "AI Research Scientist",
                    "Machine Learning Engineer at top tech company",
                    "PhD in Artificial Intelligence"
                ]
                next_steps = [
                    "Publish your research on arXiv",
                    "Apply for research internships",
                    "Participate in international AI competitions"
                ]
            elif level == "Excellent":
                career_paths = [
                    "AI Developer",
                    "Data Scientist",
                    "MSc in Machine Learning"
                ]
                next_steps = [
                    "Build a portfolio of AI projects",
                    "Contribute to open-source AI projects",
                    "Apply for AI internships"
                ]
            elif level == "Good":
                career_paths = [
                    "Junior AI Engineer",
                    "Data Analyst",
                    "BSc in Computer Science with AI focus"
                ]
                next_steps = [
                    "Complete more AI projects",
                    "Learn advanced mathematics for AI",
                    "Join AI study groups"
                ]
            else:
                career_paths = [
                    "AI Student",
                    "Beginner Data Analyst",
                    "High School AI Club Member"
                ]
                next_steps = [
                    "Complete beginner AI courses",
                    "Practice with MNIST and CIFAR-10",
                    "Collaborate with classmates"
                ]
            
            # Generate encouragement
            encouragements = [
                "Your journey in AI has just begun! Keep learning and experimenting.",
                "Every expert was once a beginner. You're on your way to greatness.",
                "Don't compare yourself to others. Focus on your own progress.",
                "You're building valuable skills that will open doors worldwide.",
                "Believe in yourself. You have the potential to change the world with AI."
            ]
            
            return {
                "student_level": {
                    "level": level,
                    "emoji": emoji,
                    "description": f"You're performing at a {level.lower()} level in AI"
                },
                "recommended_universities": recommended_unis[:3],
                "career_paths": career_paths,
                "next_steps": next_steps,
                "encouragement": random.choice(encouragements),
                "analysis_timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            return {
                "error": f"Failed to generate career advice: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }

# Example usage
if __name__ == "__main__":
    advisor = CareerAdvisor()
    
    # Test student profiles
    test_profiles = [
        {
            "best_accuracy": 0.983,
            "projects_completed": 5,
            "collaboration_score": 0.9,
            "improvement_rate": 0.15,
            "country": "Egypt"
        },
        {
            "best_accuracy": 0.92,
            "projects_completed": 3,
            "collaboration_score": 0.7,
            "improvement_rate": 0.1,
            "country": "Nigeria"
        }
    ]
    
    for i, profile in enumerate(test_profiles):
        print(f"\n🎯 Student {i+1} Career Advice:")
        advice = advisor.advise_student(profile)
        
        print(f"Level: {advice['student_level']['level']} {advice['student_level']['emoji']}")
        
        print("\n🏫 Recommended Universities:")
        for uni in advice['recommended_universities']:
            print(f"  • {uni['name']} ({uni['match']})")
        
        print("\n💼 Career Paths:")
        for path in advice['career_paths']:
            print(f"  • {path}")
        
        print(f"\n💡 {advice['encouragement']}")
