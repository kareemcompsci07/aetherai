"""
AetherAI - Experiment Reviewer
File: backend/utils/experiment_reviewer.py
Purpose: Automatically review completed AI experiments and provide feedback
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students improve their AI experiments with smart feedback.
"""

from typing import Dict, Any, List
import random
from datetime import datetime

class ExperimentReviewer:
    """
    Analyze experiment results and provide educational feedback
    """
    
    @staticmethod
    def review_experiment(results: Dict[str, Any]) -> Dict[str, Any]:
        """
        Review an experiment and return structured feedback
        """
        try:
            # Extract metrics
            final_accuracy = results.get("final_accuracy", 0.0)
            final_loss = results.get("final_loss", 0.0)
            training_time = results.get("training_time", 0)
            model_type = results.get("model", "unknown")
            dataset = results.get("dataset", "unknown")
            epochs = results.get("epochs", 10)
            
            # Generate feedback
            feedback = {
                "summary": ExperimentReviewer._get_summary(final_accuracy, final_loss),
                "strengths": ExperimentReviewer._get_strengths(results),
                "improvement_suggestions": ExperimentReviewer._get_suggestions(results),
                "technical_insights": ExperimentReviewer._get_technical_insights(results),
                "encouragement": ExperimentReviewer._get_encouragement(),
                "review_timestamp": datetime.utcnow().isoformat()
            }
            
            return feedback
            
        except Exception as e:
            return {
                "error": f"Failed to review experiment: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def _get_summary(accuracy: float, loss: float) -> Dict[str, Any]:
        """Generate performance summary"""
        if accuracy >= 0.95:
            level = "Excellent"
            emoji = "🏆"
            comment = "Outstanding performance! Your model is highly accurate."
        elif accuracy >= 0.85:
            level = "Good"
            emoji = "👍"
            comment = "Solid performance. Good balance of accuracy and training."
        elif accuracy >= 0.70:
            level = "Fair"
            emoji = "💡"
            comment = "Decent start. There's room for improvement."
        else:
            level = "Needs Work"
            emoji = "🔧"
            comment = "Basic performance. Focus on improving accuracy."
        
        return {
            "performance_level": level,
            "emoji": emoji,
            "comment": comment,
            "accuracy": f"{accuracy*100:.1f}%",
            "loss": f"{loss:.3f}"
        }
    
    @staticmethod
    def _get_strengths(results: Dict) -> List[str]:
        """Identify experiment strengths"""
        strengths = []
        accuracy = results.get("final_accuracy", 0)
        loss = results.get("final_loss", 0)
        time = results.get("training_time", 0)
        
        if accuracy >= 0.90:
            strengths.append("High accuracy achieved")
        if loss < 0.1:
            strengths.append("Low final loss indicates good model fit")
        if time < 300:  # < 5 minutes
            strengths.append("Efficient training time")
        
        if not strengths:
            strengths.append("Completed the full training process")
        
        return strengths
    
    @staticmethod
    def _get_suggestions(results: Dict) -> List[str]:
        """Generate improvement suggestions"""
        suggestions = []
        accuracy = results.get("final_accuracy", 0)
        loss = results.get("final_loss", 0)
        epochs = results.get("epochs", 10)
        model = results.get("model", "")
        
        if accuracy < 0.90:
            suggestions.append("Try increasing the number of epochs for better convergence")
            suggestions.append("Consider using data augmentation to improve generalization")
        
        if loss > 0.1:
            suggestions.append("High final loss suggests the model could be improved")
            suggestions.append("Try reducing the learning rate or using a different optimizer")
        
        if "cnn" in model.lower() and accuracy < 0.95:
            suggestions.append("For CNN models, adding dropout layers can prevent overfitting")
            suggestions.append("Try using batch normalization for more stable training")
        
        if len(suggestions) == 0:
            suggestions.append("Experiment is well-optimized. Try testing on new datasets!")
        
        # Limit to 3 suggestions
        return suggestions[:3]
    
    @staticmethod
    def _get_technical_insights(results: Dict) -> List[str]:
        """Provide deeper technical insights"""
        insights = []
        
        # Check for overfitting
        train_acc = results.get("final_accuracy", 0)
        val_acc = results.get("validation_accuracy", train_acc * 0.9)
        if train_acc - val_acc > 0.1:
            insights.append("Signs of overfitting detected (training accuracy much higher than validation)")
            insights.append("Consider adding regularization techniques like dropout or weight decay")
        
        # Check learning curve
        metrics = results.get("metrics", {})
        accuracy_curve = metrics.get("accuracy", [])
        if len(accuracy_curve) > 1:
            if accuracy_curve[-1] - accuracy_curve[0] < 0.3:
                insights.append("Accuracy improved slowly — try increasing the learning rate")
            elif accuracy_curve[-1] - accuracy_curve[0] > 0.7:
                insights.append("Rapid initial learning — good choice of hyperparameters")
        
        if not insights:
            insights.append("Training curve shows stable convergence")
        
        return insights[:2]
    
    @staticmethod
    def _get_encouragement() -> str:
        """Generate encouraging message"""
        messages = [
            "Great job! Every experiment teaches you something new.",
            "Keep going! You're building valuable AI skills.",
            "Impressive work! You're on your way to becoming an AI researcher.",
            "Don't stop now! Your persistence will pay off.",
            "You should be proud of this experiment. Keep learning!"
        ]
        return random.choice(messages)

# Example usage
if __name__ == "__main__":
    # Test reviewer
    test_results = {
        "final_accuracy": 0.983,
        "final_loss": 0.054,
        "training_time": 240,
        "model": "cnn",
        "dataset": "mnist",
        "epochs": 10,
        "validation_accuracy": 0.978,
        "metrics": {
            "accuracy": [0.1, 0.45, 0.67, 0.78, 0.82, 0.86, 0.89, 0.91, 0.95, 0.983],
            "loss": [2.3, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4, 0.054]
        }
    }
    
    reviewer = ExperimentReviewer()
    feedback = reviewer.review_experiment(test_results)
    
    print("🎯 Experiment Review:")
    print(f"Performance: {feedback['summary']['performance_level']} {feedback['summary']['emoji']}")
    print(f"Comment: {feedback['summary']['comment']}")
    
    print("\n✅ Strengths:")
    for s in feedback['strengths']:
        print(f"  • {s}")
    
    print("\n💡 Suggestions:")
    for s in feedback['improvement_suggestions']:
        print(f"  • {s}")
    
    print(f"\n🧠 {feedback['encouragement']}")
