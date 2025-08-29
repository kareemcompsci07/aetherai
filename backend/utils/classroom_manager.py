"""
AetherAI - Classroom Manager
File: backend/utils/classroom_manager.py
Purpose: Manage classroom data and teacher dashboard
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help teachers monitor and support AI students effectively.
"""

from typing import Dict, Any, List
import random
from datetime import datetime

class ClassroomManager:
    """
    Manage classroom data and generate teacher dashboard
    """
    
    # Mock classroom data (in production: use database)
    CLASSROOM_DATA = {
        "cairo_science_10a": {
            "class_name": "Science 10A",
            "school": "El-Abtal Language School",
            "teacher": "Dr. Amira Hassan",
            "students_count": 28,
            "students": [
                {
                    "id": "std_001",
                    "name": "Kareem Mostafa",
                    "best_accuracy": 0.983,
                    "best_loss": 0.054,
                    "projects_completed": 5,
                    "last_active": "2025-04-15T14:30:00Z",
                    "improvement_rate": 0.15,
                    "collaboration_score": 0.9
                },
                {
                    "id": "std_002",
                    "name": "Yusuf Mohammed",
                    "best_accuracy": 0.978,
                    "best_loss": 0.061,
                    "projects_completed": 4,
                    "last_active": "2025-04-15T13:45:00Z",
                    "improvement_rate": 0.12,
                    "collaboration_score": 0.85
                },
                {
                    "id": "std_003",
                    "name": "Lina Chen",
                    "best_accuracy": 0.992,
                    "best_loss": 0.041,
                    "projects_completed": 6,
                    "last_active": "2025-04-15T12:20:00Z",
                    "improvement_rate": 0.18,
                    "collaboration_score": 0.92
                },
                {
                    "id": "std_004",
                    "name": "Ahmed Hassan",
                    "best_accuracy": 0.965,
                    "best_loss": 0.078,
                    "projects_completed": 3,
                    "last_active": "2025-04-14T16:30:00Z",
                    "improvement_rate": 0.10,
                    "collaboration_score": 0.78
                },
                {
                    "id": "std_005",
                    "name": "Fatima Ali",
                    "best_accuracy": 0.951,
                    "best_loss": 0.092,
                    "projects_completed": 4,
                    "last_active": "2025-04-15T11:15:00Z",
                    "improvement_rate": 0.14,
                    "collaboration_score": 0.88
                }
            ]
        },
        "future_city_stem_9b": {
            "class_name": "STEM 9B",
            "school": "Future City STEM Academy",
            "teacher": "Prof. Mahmoud Ahmed",
            "students_count": 32,
            "students": [
                {
                    "id": "std_101",
                    "name": "Nina Patel",
                    "best_accuracy": 0.957,
                    "best_loss": 0.083,
                    "projects_completed": 4,
                    "last_active": "2025-04-15T10:20:00Z",
                    "improvement_rate": 0.13,
                    "collaboration_score": 0.82
                },
                {
                    "id": "std_102",
                    "name": "Carlos Rodriguez",
                    "best_accuracy": 0.945,
                    "best_loss": 0.095,
                    "projects_completed": 3,
                    "last_active": "2025-04-14T18:45:00Z",
                    "improvement_rate": 0.11,
                    "collaboration_score": 0.75
                }
            ]
        }
    }

    @staticmethod
    def get_classroom_summary(class_id: str) -> Dict[str, Any]:
        """
        Get classroom summary for teacher dashboard
        """
        try:
            if class_id not in ClassroomManager.CLASSROOM_DATA:
                return {
                    "error": f"Classroom {class_id} not found",
                    "timestamp": datetime.utcnow().isoformat()
                }
            
            class_data = ClassroomManager.CLASSROOM_DATA[class_id]
            
            # Calculate class statistics
            accuracies = [student["best_accuracy"] for student in class_data["students"]]
            losses = [student["best_loss"] for student in class_data["students"]]
            projects = [student["projects_completed"] for student in class_data["students"]]
            
            stats = {
                "average_accuracy": sum(accuracies) / len(accuracies),
                "average_loss": sum(losses) / len(losses),
                "average_projects": sum(projects) / len(projects),
                "top_student": max(class_data["students"], key=lambda x: x["best_accuracy"]),
                "most_improved": max(class_data["students"], key=lambda x: x["improvement_rate"]),
                "most_collaborative": max(class_data["students"], key=lambda x: x["collaboration_score"]),
                "active_students": len([s for s in class_data["students"] if 
                                      (datetime.utcnow() - datetime.fromisoformat(s["last_active"].replace("Z", "+00:00"))).days < 7])
            }
            
            return {
                "classroom": class_data,
                "statistics": stats,
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            return {
                "error": f"Failed to get classroom summary: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def get_student_progress(student_id: str, class_id: str) -> Dict[str, Any]:
        """
        Get individual student progress report
        """
        try:
            if class_id not in ClassroomManager.CLASSROOM_DATA:
                return {
                    "error": f"Classroom {class_id} not found",
                    "timestamp": datetime.utcnow().isoformat()
                }
            
            students = ClassroomManager.CLASSROOM_DATA[class_id]["students"]
            student = next((s for s in students if s["id"] == student_id), None)
            
            if not student:
                return {
                    "error": f"Student {student_id} not found in classroom {class_id}",
                    "timestamp": datetime.utcnow().isoformat()
                }
            
            # Generate progress insights
            if student["best_accuracy"] >= 0.97:
                level = "Excellent"
                emoji = "🏆"
                feedback = "Outstanding performance! Keep challenging yourself with advanced projects."
            elif student["best_accuracy"] >= 0.90:
                level = "Good"
                emoji = "👍"
                feedback = "Solid performance. Focus on improving consistency."
            else:
                level = "Needs Improvement"
                emoji = "🔧"
                feedback = "Keep practicing. Focus on understanding the fundamentals."
            
            return {
                "student": student,
                "progress_level": {
                    "level": level,
                    "emoji": emoji,
                    "feedback": feedback
                },
                "recommendations": [
                    "Complete more AI experiments to build confidence",
                    "Try collaborating with classmates on projects",
                    "Explore advanced topics like CNNs and RNNs"
                ],
                "timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            return {
                "error": f"Failed to get student progress: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }

# Example usage
if __name__ == "__main__":
    manager = ClassroomManager()
    
    # Test classroom summary
    print("🎯 Classroom Summary:")
    summary = manager.get_classroom_summary("cairo_science_10a")
    if "error" not in summary:
        print(f"Class: {summary['classroom']['class_name']}")
        print(f"Teacher: {summary['classroom']['teacher']}")
        print(f"Students: {summary['classroom']['students_count']}")
        print(f"Average Accuracy: {summary['statistics']['average_accuracy']:.3f}")
        print(f"Top Student: {summary['statistics']['top_student']['name']} ({summary['statistics']['top_student']['best_accuracy']:.3f})")
    
    # Test student progress
    print("\n📊 Student Progress:")
    progress = manager.get_student_progress("std_001", "cairo_science_10a")
    if "error" not in progress:
        print(f"Student: {progress['student']['name']}")
        print(f"Level: {progress['progress_level']['level']} {progress['progress_level']['emoji']}")
        print(f"Feedback: {progress['progress_level']['feedback']}")
