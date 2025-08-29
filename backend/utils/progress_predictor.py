"""
AetherAI - Student Progress Predictor
File: backend/utils/progress_predictor.py
Purpose: Predict future student performance based on historical data
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students see their growth trajectory and stay motivated.
"""

from typing import Dict, Any, List
import random
from datetime import datetime, timedelta

class ProgressPredictor:
    """
    Predict student's future performance based on past experiments
    """
    
    # Simulated prediction model (in production: use ML model)
    @staticmethod
    def predict_progress(student_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Predict future accuracy and loss based on student's history
        """
        try:
            # Extract student characteristics
            past_experiments = student_data.get("past_experiments", [])
            current_level = student_data.get("current_level", "beginner")
            best_accuracy = student_data.get("best_accuracy", 0.0)
            improvement_rate = student_data.get("improvement_rate", 0.0)
            collaboration_score = student_data.get("collaboration_score", 0.0)
            country = student_data.get("country", "Unknown")
            
            # Base prediction on best performance and trend
            if not past_experiments:
                # New student
                predicted_accuracy = random.uniform(0.6, 0.85)
                predicted_loss = random.uniform(0.3, 0.8)
                confidence = 0.6  # Lower confidence for new students
                explanation = "New student - prediction based on average beginner performance"
            else:
                # Use trend analysis
                accuracies = [exp.get("accuracy", 0.0) for exp in past_experiments]
                recent_accuracy = accuracies[-1] if accuracies else 0.7
                
                # Calculate trend
                if len(accuracies) >= 3:
                    trend = (accuracies[-1] - accuracies[0]) / (len(accuracies) - 1)
                else:
                    trend = 0.005  # Small positive default trend
                
                # Make prediction
                base_prediction = recent_accuracy + trend * 2  # Predict 2 steps ahead
                noise = random.uniform(-0.05, 0.05)  # Small random variation
                predicted_accuracy = max(0.5, min(0.99, base_prediction + noise))
                
                # Predict loss inversely related to accuracy
                predicted_loss = max(0.02, min(0.5, 1.0 - predicted_accuracy + random.uniform(-0.1, 0.1)))
                
                # Calculate confidence (higher for consistent improvers)
                confidence = 0.7 + (improvement_rate * 0.3)
                if len(accuracies) < 3:
                    confidence -= 0.2  # Lower confidence with less data
                if trend < 0:
                    confidence -= 0.15  # Lower confidence if declining
                confidence = max(0.5, min(1.0, confidence))
                
                explanation = f"Based on {len(accuracies)} past experiments with {'positive' if trend > 0 else 'negative' if trend < 0 else 'stable'} trend"
            
            # Generate improvement suggestions
            suggestions = [
                "Continue practicing with different datasets",
                "Try adjusting learning rate and batch size",
                "Experiment with different model architectures",
                "Review feature maps to understand learning process"
            ]
            
            if predicted_accuracy < 0.85:
                suggestions.append("Focus on improving data preprocessing techniques")
            if predicted_accuracy - best_accuracy < 0.05:
                suggestions.append("Challenge yourself with more complex models")
            if collaboration_score < 0.7:
                suggestions.append("Engage more with the learning community for feedback")
            
            # Generate confidence meter (visual indicator)
            confidence_meter = "🌕" * int(confidence * 5) + "🌑" * (5 - int(confidence * 5))
            
            prediction = {
                "student_id": student_data.get("student_id", "unknown"),
                "prediction_date": datetime.utcnow().isoformat(),
                "current_level": current_level,
                "predicted_accuracy": round(predicted_accuracy, 4),
                "predicted_loss": round(predicted_loss, 4),
                "confidence_score": round(confidence, 3),
                "confidence_meter": confidence_meter,
                "explanation": explanation,
                "suggestions": suggestions,
                "next_experiment_type": random.choice([
                    "MNIST with deeper CNN",
                    "CIFAR-10 with data augmentation",
                    "Transfer learning with pretrained model"
                ]),
                "expected_training_time_minutes": random.randint(180, 480)
            }
            
            return {
                "status": "success",
                "prediction": prediction,
                "message": "📈 Progress prediction generated!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to predict progress: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def get_progress_insights(student_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Get motivational insights and growth analysis
        """
        try:
            past_experiments = student_data.get("past_experiments", [])
            best_accuracy = student_data.get("best_accuracy", 0.0)
            projects_completed = student_data.get("projects_completed", 0)
            improvement_rate = student_data.get("improvement_rate", 0.0)
            
            # Calculate growth metrics
            if len(past_experiments) >= 2:
                first_acc = past_experiments[0].get("accuracy", 0.0)
                last_acc = past_experiments[-1].get("accuracy", 0.0)
                improvement = last_acc - first_acc
            else:
                improvement = 0.0
            
            # Generate insights
            insights = []
            
            if best_accuracy >= 0.98:
                insights.append("🎉 You've achieved expert-level accuracy! Your models are highly effective.")
            elif best_accuracy >= 0.95:
                insights.append("🚀 You're on an excellent trajectory! Keep pushing for that 98%+ accuracy.")
            elif best_accuracy >= 0.90:
                insights.append("📈 Solid performance! With a few adjustments, you can reach the next level.")
            else:
                insights.append("🌱 Great effort! Every experiment builds your skills. Focus on consistent improvement.")
            
            if improvement_rate > 0.1:
                insights.append("🔥 You're improving rapidly! Your learning curve is impressive.")
            elif improvement_rate > 0.05:
                insights.append("✅ Steady progress! You're building valuable skills with each experiment.")
            else:
                insights.append("📚 Focus on learning from each experiment. Progress isn't always linear.")
            
            if projects_completed >= 5:
                insights.append("🏆 You've completed multiple projects! This breadth of experience is valuable.")
            elif projects_completed >= 3:
                insights.append("📚 You're building a strong portfolio of AI experiments.")
            
            # Add personalized encouragement
            country = student_data.get("country", "your country")
            name = student_data.get("name", "Student")
            
            encouragement = f"Keep going, {name} from {country}! Your dedication to learning AI is inspiring the next generation of innovators."
            
            return {
                "status": "success",
                "insights": insights,
                "encouragement": encouragement,
                "growth_metrics": {
                    "total_experiments": len(past_experiments),
                    "best_accuracy": best_accuracy,
                    "improvement_rate": round(improvement_rate, 3),
                    "projects_completed": projects_completed
                },
                "message": "💡 Motivational insights generated!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to get progress insights: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }

# Example usage
if __name__ == "__main__":
    predictor = ProgressPredictor()
    
    # Test student profiles
    test_students = [
        {
            "student_id": "std_001",
            "name": "Kareem Mostafa",
            "country": "Egypt",
            "current_level": "intermediate",
            "best_accuracy": 0.983,
            "improvement_rate": 0.15,
            "collaboration_score": 0.9,
            "projects_completed": 5,
            "past_experiments": [
                {"accuracy": 0.85, "loss": 0.4, "model": "MLP", "dataset": "MNIST"},
                {"accuracy": 0.92, "loss": 0.2, "model": "CNN", "dataset": "MNIST"},
                {"accuracy": 0.96, "loss": 0.1, "model": "CNN", "dataset": "CIFAR-10"},
                {"accuracy": 0.983, "loss": 0.054, "model": "Custom CNN", "dataset": "MNIST"}
            ]
        },
        {
            "student_id": "std_002",
            "name": "Yusuf Mohammed",
            "country": "Egypt",
            "current_level": "beginner",
            "best_accuracy": 0.72,
            "improvement_rate": 0.08,
            "collaboration_score": 0.6,
            "projects_completed": 2,
            "past_experiments": [
                {"accuracy": 0.65, "loss": 0.8, "model": "MLP", "dataset": "MNIST"},
                {"accuracy": 0.72, "loss": 0.6, "model": "CNN", "dataset": "MNIST"}
            ]
        }
    ]
    
    print("🎯 Progress Prediction Test:")
    
    for student in test_students:
        print(f"\n📊 Predicting for {student['name']} (Level: {student['current_level']}):")
        
        # Test prediction
        pred_result = predictor.predict_progress(student)
        if "error" not in pred_result:
            pred = pred_result["prediction"]
            print(f"  Predicted Accuracy: {pred['predicted_accuracy']:.3f}")
            print(f"  Confidence: {pred['confidence_score']:.2f} {pred['confidence_meter']}")
            print(f"  Next: {pred['next_experiment_type']}")
        
        # Test insights
        insights_result = predictor.get_progress_insights(student)
        if "error" not in insights_result:
            print(f"  Insights: {len(insights_result['insights'])} motivational points")
            print(f"  Encouragement: {insights_result['encouragement']}")
