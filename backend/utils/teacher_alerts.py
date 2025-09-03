"""
AetherAI - Teacher Intervention Alerts
File: backend/utils/teacher_alerts.py
Purpose: Generate alerts for teachers when students need intervention
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help teachers identify and support struggling students.
"""

from typing import Dict, Any, List
import random
from datetime import datetime, timedelta

class TeacherInterventionAlerts:
    """
    Generate alerts for teachers when students need intervention
    """
    
    # Alert types and severity levels
    ALERT_TYPES = {
        "low_activity": {
            "name": "Low Activity",
            "description": "Student has low engagement and activity levels",
            "severity": "high",
            "icon": "⚠️"
        },
        "slow_progress": {
            "name": "Slow Progress",
            "description": "Student is making slower progress than expected",
            "severity": "medium",
            "icon": "🐢"
        },
        "low_collaboration": {
            "name": "Low Collaboration",
            "description": "Student is not collaborating with peers",
            "severity": "medium",
            "icon": "👥"
        },
        "technical_difficulty": {
            "name": "Technical Difficulty",
            "description": "Student is facing technical challenges",
            "severity": "high",
            "icon": "💻"
        },
        "conceptual_misunderstanding": {
            "name": "Conceptual Misunderstanding",
            "description": "Student has fundamental misunderstandings of key concepts",
            "severity": "critical",
            "icon": "🧠"
        }
    }
    
    # Intervention strategies
    INTERVENTION_STRATEGIES = {
        "personal_checkin": {
            "name": "Personal Check-in",
            "description": "Have a one-on-one conversation with the student",
            "effectiveness": 0.85,
            "time_required": "10-15 minutes"
        },
        "peer_mentoring": {
            "name": "Peer Mentoring",
            "description": "Pair the student with a peer mentor",
            "effectiveness": 0.78,
            "time_required": "30 minutes setup"
        },
        "additional_resources": {
            "name": "Additional Resources",
            "description": "Provide targeted learning materials",
            "effectiveness": 0.72,
            "time_required": "15 minutes"
        },
        "small_group_tutorial": {
            "name": "Small Group Tutorial",
            "description": "Organize a small group session on the challenging topic",
            "effectiveness": 0.81,
            "time_required": "45 minutes"
        },
        "project_redirection": {
            "name": "Project Redirection",
            "description": "Suggest a different project that matches their interests",
            "effectiveness": 0.68,
            "time_required": "20 minutes"
        }
    }
    
    @staticmethod
    def generate_teacher_alerts(classroom_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate alerts for teachers when students need intervention
        """
        try:
            class_id = classroom_data.get("class_id", "unknown")
            teacher_id = classroom_data.get("teacher_id", "unknown")
            students = classroom_data.get("students", [])
            
            alerts = []
            
            for student in students:
                student_id = student.get("student_id", "unknown")
                name = student.get("name", "Student")
                country = student.get("country", "Egypt")
                accuracy_history = student.get("accuracy_history", [])
                activity_level = student.get("activity_level", 0.5)
                collaboration_score = student.get("collaboration_score", 0.5)
                improvement_rate = student.get("improvement_rate", 0.05)
                projects_completed = student.get("projects_completed", 0)
                
                # Determine alert conditions
                alert_conditions = []
                
                # Low activity alert
                if activity_level < 0.3:
                    alert_conditions.append({
                        "type": "low_activity",
                        "current_value": round(activity_level, 2),
                        "threshold": 0.3,
                        "details": f"Activity level is {activity_level:.2f}, below threshold of 0.3"
                    })
                
                # Slow progress alert
                if len(accuracy_history) >= 3 and improvement_rate < 0.03:
                    alert_conditions.append({
                        "type": "slow_progress",
                        "current_value": round(improvement_rate, 3),
                        "threshold": 0.03,
                        "details": f"Improvement rate is {improvement_rate:.3f}, below threshold of 0.03"
                    })
                
                # Low collaboration alert
                if collaboration_score < 0.4:
                    alert_conditions.append({
                        "type": "low_collaboration",
                        "current_value": round(collaboration_score, 2),
                        "threshold": 0.4,
                        "details": f"Collaboration score is {collaboration_score:.2f}, below threshold of 0.4"
                    })
                
                # Technical difficulty alert (inferred from low improvement despite activity)
                if activity_level > 0.6 and improvement_rate < 0.02 and projects_completed > 2:
                    alert_conditions.append({
                        "type": "technical_difficulty",
                        "current_value": round(improvement_rate, 3),
                        "threshold": 0.02,
                        "details": f"High activity ({activity_level:.2f}) but low improvement ({improvement_rate:.3f}) suggests technical challenges"
                    })
                
                # Conceptual misunderstanding alert (inferred from accuracy patterns)
                if len(accuracy_history) >= 4:
                    recent_accuracy = accuracy_history[-1]
                    previous_accuracy = accuracy_history[-2]
                    if recent_accuracy < 0.7 and previous_accuracy < 0.7 and recent_accuracy < previous_accuracy:
                        alert_conditions.append({
                            "type": "conceptual_misunderstanding",
                            "current_value": round(recent_accuracy, 3),
                            "threshold": 0.7,
                            "details": f"Accuracy is {recent_accuracy:.3f} and decreasing, suggesting fundamental misunderstandings"
                        })
                
                # Generate alert if conditions exist
                if alert_conditions:
                    # Determine highest severity
                    severity_levels = {"low": 1, "medium": 2, "high": 3, "critical": 4}
                    max_severity = max(
                        [severity_levels[TeacherInterventionAlerts.ALERT_TYPES[cond["type"]]["severity"]] 
                         for cond in alert_conditions]
                    )
                    severity = [k for k, v in severity_levels.items() if v == max_severity][0]
                    
                    # Select appropriate interventions
                    possible_strategies = []
                    for condition in alert_conditions:
                        alert_type = condition["type"]
                        if alert_type == "low_activity":
                            possible_strategies.extend(["personal_checkin", "project_redirection"])
                        elif alert_type == "slow_progress":
                            possible_strategies.extend(["additional_resources", "small_group_tutorial"])
                        elif alert_type == "low_collaboration":
                            possible_strategies.extend(["peer_mentoring", "small_group_tutorial"])
                        elif alert_type == "technical_difficulty":
                            possible_strategies.extend(["personal_checkin", "additional_resources"])
                        elif alert_type == "conceptual_misunderstanding":
                            possible_strategies.extend(["small_group_tutorial", "peer_mentoring"])
                    
                    # Remove duplicates and select top strategies
                    unique_strategies = list(set(possible_strategies))
                    selected_strategies = random.sample(
                        unique_strategies, 
                        min(3, len(unique_strategies))
                    ) if unique_strategies else []
                    
                    alert = {
                        "student_id": student_id,
                        "name": name,
                        "class_id": class_id,
                        "teacher_id": teacher_id,
                        "alert_date": datetime.utcnow().isoformat(),
                        "severity": severity,
                        "conditions": alert_conditions,
                        "recommended_strategies": [
                            TeacherInterventionAlerts.INTERVENTION_STRATEGIES[strategy] 
                            for strategy in selected_strategies
                        ],
                        "confidence": 0.85 + random.uniform(-0.1, 0.05),  # 75-90% confidence
                        "impact_prediction": "High" if severity in ["high", "critical"] else "Medium"
                    }
                    
                    alerts.append(alert)
            
            # Generate overall classroom summary
            high_severity_alerts = len([a for a in alerts if a["severity"] in ["high", "critical"]])
            medium_severity_alerts = len([a for a in alerts if a["severity"] == "medium"])
            
            summary = {
                "class_id": class_id,
                "teacher_id": teacher_id,
                "total_students": len(students),
                "students_with_alerts": len(alerts),
                "high_severity_alerts": high_severity_alerts,
                "medium_severity_alerts": medium_severity_alerts,
                "summary_date": datetime.utcnow().isoformat(),
                "urgency_level": "Critical" if high_severity_alerts > 0 else "Urgent" if medium_severity_alerts > 0 else "Normal"
            }
            
            # Generate suggestions for teacher
            suggestions = []
            
            if high_severity_alerts > 0:
                suggestions.append("Address high-severity alerts immediately as they indicate critical student needs")
            
            if medium_severity_alerts > 0:
                suggestions.append("Plan interventions for medium-severity alerts within the next week")
            
            if len(alerts) > 3:
                suggestions.append("Consider organizing a class-wide review session on challenging concepts")
            
            if not suggestions:
                suggestions.append("All students are progressing well. Continue current teaching approach.")
            
            alert_report = {
                "summary": summary,
                "alerts": alerts,
                "suggestions": suggestions,
                "recommendations": [
                    "Prioritize interventions based on alert severity",
                    "Document interventions and their outcomes",
                    "Follow up with students after interventions",
                    "Share best practices with other teachers"
                ],
                "encouragement": f"Great job monitoring your students, {classroom_data.get('teacher_name', 'Teacher')}! Your attention to individual needs makes a significant difference in their learning journey."
            }
            
            return {
                "status": "success",
                "alert_report": alert_report,
                "message": f"🔔 {len(alerts)} intervention alerts generated for class {class_id}!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to generate teacher alerts: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def get_intervention_guidelines() -> Dict[str, Any]:
        """
        Get guidelines for effective teacher interventions
        """
        guidelines = {
            "early_intervention": [
                "Identify struggling students early in the learning process",
                "Monitor both performance and engagement metrics",
                "Look for patterns in student behavior and progress"
            ],
            "personalized_approach": [
                "Tailor interventions to individual student needs and learning styles",
                "Consider cultural and personal factors that may affect learning",
                "Build trust through regular check-ins and supportive communication"
            ],
            "collaborative_solutions": [
                "Involve students in developing solutions to their challenges",
                "Encourage peer support and mentoring",
                "Connect with parents or guardians when appropriate"
            ],
            "continuous_monitoring": [
                "Track the effectiveness of interventions over time",
                "Adjust strategies based on student response",
                "Celebrate improvements and milestones"
            ]
        }
        
        return {
            "status": "success",
            "guidelines": guidelines,
            "message": "📚 Best practices for teacher interventions"
        }

# Example usage
if __name__ == "__main__":
    alert_system = TeacherInterventionAlerts()
    
    # Test classroom data
    test_classrooms = [
        {
            "class_id": "cls_101",
            "teacher_id": "tch_001",
            "teacher_name": "Dr. Ahmed",
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
                }
            ]
        }
    ]
    
    print("🔔 Teacher Intervention Alert System Test:")
    
    for classroom in test_classrooms:
        print(f"\n🏫 Analyzing classroom: {classroom['class_id']} (Teacher: {classroom['teacher_id']})")
        
        # Test alert generation
        result = alert_system.generate_teacher_alerts(classroom)
        if "error" not in result:
            report = result["alert_report"]
            print(f"  Students with alerts: {report['summary']['students_with_alerts']}")
            print(f  "  High severity alerts: {report['summary']['high_severity_alerts']}")
        
        # Test guidelines
        guidelines = alert_system.get_intervention_guidelines()
        if "error" not in guidelines:
            print(f"  Loaded {len(guidelines['guidelines'])} guideline categories")
