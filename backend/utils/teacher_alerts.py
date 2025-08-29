"""
AetherAI - Teacher Intervention Alerts
File: backend/utils/teacher_alerts.py
Purpose: Generate alerts for teachers when students need help
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help teachers identify and support struggling students.
"""

from typing import Dict, Any, List
import random
from datetime import datetime, timedelta

class TeacherAlerts:
    """
    Generate intelligent alerts for teachers about student progress
    """
    
    # Alert types and thresholds
    ALERT_TYPES = {
        "struggling": {
            "name": "Struggling Student",
            "description": "Student performance is below expected level",
            "severity": "high"
        },
        "stagnant": {
            "name": "Stagnant Progress",
            "description": "Student progress has plateaued",
            "severity": "medium"
        },
        "disengaged": {
            "name": "Disengaged Student",
            "description": "Low activity and participation",
            "severity": "high"
        },
        "improving": {
            "name": "Improving Student",
            "description": "Significant improvement detected",
            "severity": "low"
        },
        "excelling": {
            "name": "Excelling Student",
            "description": "Exceptional performance and engagement",
            "severity": "low"
        }
    }
    
    @staticmethod
    def generate_alerts(classroom_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze classroom data and generate intervention alerts
        """
        try:
            students = classroom_data.get("students", [])
            class_id = classroom_data.get("class_id", "unknown")
            teacher_id = classroom_data.get("teacher_id", "unknown")
            
            alerts = []
            
            for student in students:
                student_id = student.get("student_id", "unknown")
                name = student.get("name", "Student")
                accuracy_history = student.get("accuracy_history", [])
                recent_accuracy = accuracy_history[-1] if accuracy_history else 0.0
                best_accuracy = max(accuracy_history) if accuracy_history else 0.0
                activity_level = student.get("activity_level", 0.5)
                collaboration_score = student.get("collaboration_score", 0.0)
                improvement_rate = student.get("improvement_rate", 0.0)
                country = student.get("country", "Unknown")
                
                # Check for struggling students
                if recent_accuracy < 0.7 and best_accuracy < 0.8:
                    alert = {
                        "alert_id": f"alert_{len(alerts) + 1}",
                        "student_id": student_id,
                        "student_name": name,
                        "class_id": class_id,
                        "type": "struggling",
                        "severity": "high",
                        "title": f"{name} is struggling with AI concepts",
                        "message": f"{name} has been consistently scoring below 70% accuracy. They may need additional support.",
                        "recommendations": [
                            "Schedule a one-on-one session",
                            "Review basic neural network concepts",
                            "Assign simpler experiments to rebuild confidence",
                            "Pair with a peer mentor"
                        ],
                        "data_points": {
                            "recent_accuracy": recent_accuracy,
                            "best_accuracy": best_accuracy,
                            "improvement_rate": improvement_rate
                        },
                        "timestamp": datetime.utcnow().isoformat()
                    }
                    alerts.append(alert)
                
                # Check for stagnant progress
                elif len(accuracy_history) >= 5 and improvement_rate < 0.02:
                    alert = {
                        "alert_id": f"alert_{len(alerts) + 1}",
                        "student_id": student_id,
                        "student_name": name,
                        "class_id": class_id,
                        "type": "stagnant",
                        "severity": "medium",
                        "title": f"{name}'s progress has plateaued",
                        "message": f"{name} has shown little improvement over the last 5 experiments. They may need new challenges or approaches.",
                        "recommendations": [
                            "Introduce new dataset or model architecture",
                            "Encourage participation in social feed discussions",
                            "Suggest collaborative projects",
                            "Review training visualization together"
                        ],
                        "data_points": {
                            "recent_accuracy": recent_accuracy,
                            "accuracy_history": accuracy_history[-5:],
                            "improvement_rate": improvement_rate
                        },
                        "timestamp": datetime.utcnow().isoformat()
                    }
                    alerts.append(alert)
                
                # Check for disengaged students
                elif activity_level < 0.3 and collaboration_score < 0.4:
                    alert = {
                        "alert_id": f"alert_{len(alerts) + 1}",
                        "student_id": student_id,
                        "student_name": name,
                        "class_id": class_id,
                        "type": "disengaged",
                        "severity": "high",
                        "title": f"{name} appears disengaged",
                        "message": f"{name} has low activity and collaboration. They may be losing interest or facing challenges.",
                        "recommendations": [
                            "Check in personally about their experience",
                            "Identify potential technical or motivational barriers",
                            "Connect them with peer study groups",
                            "Highlight their past successes to rebuild motivation"
                        ],
                        "data_points": {
                            "activity_level": activity_level,
                            "collaboration_score": collaboration_score,
                            "last_active": student.get("last_active", "Unknown")
                        },
                        "timestamp": datetime.utcnow().isoformat()
                    }
                    alerts.append(alert)
                
                # Positive alerts for improving students
                elif improvement_rate > 0.1 and recent_accuracy > 0.8:
                    alert = {
                        "alert_id": f"alert_{len(alerts) + 1}",
                        "student_id": student_id,
                        "student_name": name,
                        "class_id": class_id,
                        "type": "improving",
                        "severity": "low",
                        "title": f"{name} is making excellent progress!",
                        "message": f"{name} has shown rapid improvement and strong performance. They're on an excellent trajectory!",
                        "recommendations": [
                            "Recognize their progress in class",
                            "Challenge them with advanced projects",
                            "Consider them as a peer mentor",
                            "Encourage them to share insights on social feed"
                        ],
                        "data_points": {
                            "recent_accuracy": recent_accuracy,
                            "improvement_rate": improvement_rate,
                            "projects_completed": student.get("projects_completed", 0)
                        },
                        "timestamp": datetime.utcnow().isoformat()
                    }
                    alerts.append(alert)
                
                # Positive alerts for excelling students
                elif recent_accuracy > 0.95 and collaboration_score > 0.8:
                    alert = {
                        "alert_id": f"alert_{len(alerts) + 1}",
                        "student_id": student_id,
                        "student_name": name,
                        "class_id": class_id,
                        "type": "excelling",
                        "severity": "low",
                        "title": f"{name} is excelling in AI learning!",
                        "message": f"{name} is performing at an exceptional level with high engagement. They're a model student!",
                        "recommendations": [
                            "Provide advanced research opportunities",
                            "Nominate for AI competitions",
                            "Feature their work in class",
                            "Discuss career pathways in AI"
                        ],
                        "data_points": {
                            "accuracy": recent_accuracy,
                            "collaboration_score": collaboration_score,
                            "best_accuracy": best_accuracy
                        },
                        "timestamp": datetime.utcnow().isoformat()
                    }
                    alerts.append(alert)
            
            # Sort alerts by severity
            severity_order = {"high": 3, "medium": 2, "low": 1}
            alerts.sort(key=lambda x: severity_order[x["severity"]], reverse=True)
            
            return {
                "status": "success",
                "class_id": class_id,
                "teacher_id": teacher_id,
                "total_alerts": len(alerts),
                "alerts": alerts,
                "summary": {
                    "high_severity": len([a for a in alerts if a["severity"] == "high"]),
                    "medium_severity": len([a for a in alerts if a["severity"] == "medium"]),
                    "low_severity": len([a for a in alerts if a["severity"] == "low"])
                },
                "generated_at": datetime.utcnow().isoformat(),
                "message": f"🎯 {len(alerts)} alerts generated for class {class_id}!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to generate alerts: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def get_intervention_strategies() -> Dict[str, Any]:
        """
        Get evidence-based intervention strategies for different student needs
        """
        strategies = {
            "basic_concepts": [
                "Review neural network fundamentals with visual aids",
                "Use analogies to explain complex concepts",
                "Break down problems into smaller steps",
                "Provide additional practice with immediate feedback"
            ],
            "motivation": [
                "Connect AI concepts to student's interests and goals",
                "Highlight small wins and progress",
                "Share success stories from diverse AI professionals",
                "Create a growth mindset culture"
            ],
            "technical_barriers": [
                "Ensure reliable device and internet access",
                "Provide clear step-by-step instructions",
                "Offer multiple ways to access content",
                "Use screen readers and accessibility tools"
            ],
            "collaboration": [
                "Create structured peer learning activities",
                "Assign diverse group projects",
                "Teach effective communication skills",
                "Celebrate team achievements"
            ],
            "advanced_challenge": [
                "Introduce research-level problems",
                "Connect with AI professionals for mentorship",
                "Encourage participation in competitions",
                "Support publication of student work"
            ]
        }
        
        return {
            "status": "success",
            "strategies": strategies,
            "message": "📚 Evidence-based intervention strategies loaded!"
        }

# Example usage
if __name__ == "__main__":
    alerts = TeacherAlerts()
    
    # Test classroom data
    test_classroom = {
        "class_id": "cls_101",
        "teacher_id": "tch_001",
        "students": [
            {
                "student_id": "std_001",
                "name": "Kareem Mostafa",
                "country": "Egypt",
                "accuracy_history": [0.85, 0.92, 0.96, 0.983],
                "activity_level": 0.9,
                "collaboration_score": 0.9,
                "improvement_rate": 0.15,
                "projects_completed": 5
            },
            {
                "student_id": "std_002",
                "name": "Yusuf Mohammed",
                "country": "Egypt",
                "accuracy_history": [0.65, 0.68, 0.70, 0.69, 0.71],
                "activity_level": 0.2,
                "collaboration_score": 0.3,
                "improvement_rate": 0.01,
                "projects_completed": 2
            },
            {
                "student_id": "std_003",
                "name": "Lina Chen",
                "country": "China",
                "accuracy_history": [0.91, 0.93, 0.95, 0.97, 0.98],
                "activity_level": 0.8,
                "collaboration_score": 0.85,
                "improvement_rate": 0.12,
                "projects_completed": 4
            }
        ]
    }
    
    print("🎯 Teacher Alerts Test:")
    
    # Test alert generation
    result = alerts.generate_alerts(test_classroom)
    if "error" not in result:
        print(f"  Generated {result['total_alerts']} alerts")
        for alert in result["alerts"]:
            print(f"  - {alert['title']} [{alert['severity']}]")
    
    # Test intervention strategies
    strategies = alerts.get_intervention_strategies()
    if "error" not in strategies:
        print(f"  Loaded {len(strategies['strategies'])} intervention strategy categories")
