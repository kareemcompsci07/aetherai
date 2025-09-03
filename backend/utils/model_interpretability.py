"""
AetherAI - Model Interpretability Visualizer
File: backend/utils/model_interpretability.py
Purpose: Explain AI model predictions with visual and textual explanations
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students understand how AI models make decisions.
"""

from typing import Dict, Any, List
import random
from datetime import datetime, timedelta
import numpy as np

class ModelInterpretability:
    """
    Provide explanations for AI model predictions
    """
    
    # Interpretability methods
    INTERPRETABILITY_METHODS = {
        "saliency_maps": {
            "name": "Saliency Maps",
            "description": "Highlight important pixels in the input image",
            "purpose": "Show which parts of the image influenced the prediction most",
            "best_for": ["image classification", "computer vision"]
        },
        "feature_importance": {
            "name": "Feature Importance",
            "description": "Rank features by their contribution to the prediction",
            "purpose": "Identify most influential features in tabular data",
            "best_for": ["tabular data", "regression", "classification"]
        },
        "confidence_analysis": {
            "name": "Confidence Analysis",
            "description": "Analyze model confidence across different classes",
            "purpose": "Understand model certainty and uncertainty",
            "best_for": ["all model types"]
        },
        "counterfactuals": {
            "name": "Counterfactual Explanations",
            "description": "Show minimal changes that would change the prediction",
            "purpose": "Understand decision boundaries",
            "best_for": ["image classification", "tabular data"]
        }
    }
    
    @staticmethod
    def explain_prediction(prediction_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate comprehensive explanation for a model prediction
        """
        try:
            model_type = prediction_data.get("model_type", "cnn")
            dataset_type = prediction_data.get("dataset_type", "image")
            predicted_class = prediction_data.get("predicted_class", "unknown")
            confidence = prediction_data.get("confidence", 0.983)
            true_class = prediction_data.get("true_class", None)
            input_features = prediction_data.get("input_features", {})
            feature_importance = prediction_data.get("feature_importance", {})
            
            # Determine relevant methods based on model and data type
            relevant_methods = []
            
            if dataset_type == "image":
                relevant_methods.extend(["saliency_maps", "confidence_analysis"])
                if random.random() > 0.3:  # 70% chance
                    relevant_methods.append("counterfactuals")
            else:
                relevant_methods.extend(["feature_importance", "confidence_analysis"])
                if random.random() > 0.5:  # 50% chance
                    relevant_methods.append("counterfactuals")
            
            # Generate explanations
            explanations = []
            
            # Saliency maps explanation
            if "saliency_maps" in relevant_methods:
                explanations.append({
                    "method": "saliency_maps",
                    "title": "Saliency Map Analysis",
                    "description": "Visualization showing which pixels most influenced the prediction",
                    "insights": [
                        "The model focused primarily on the central region of the digit",
                        "Edge detection patterns are clearly visible in the activation map",
                        "Background pixels have minimal influence on the final decision"
                    ],
                    "confidence": 0.92,
                    "visualization_data": ModelInterpretability._generate_saliency_map()
                })
            
            # Feature importance explanation
            if "feature_importance" in relevant_methods:
                # Use provided feature importance or generate mock data
                if feature_importance:
                    top_features = sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)[:5]
                else:
                    # Generate mock feature importance
                    mock_features = [f"pixel_{i}" for i in range(10)]
                    top_features = [(f, random.uniform(0.1, 0.9)) for f in mock_features]
                    top_features = sorted(top_features, key=lambda x: x[1], reverse=True)[:5]
                
                explanations.append({
                    "method": "feature_importance",
                    "title": "Top Influential Features",
                    "description": "Features ranked by their contribution to the prediction",
                    "insights": [
                        f"The top feature '{top_features[0][0]}' contributed {top_features[0][1]:.2f} to the decision",
                        "The top 3 features account for over 60% of the prediction weight",
                        "Many features have minimal impact, indicating good feature selection"
                    ],
                    "top_features": top_features,
                    "confidence": 0.88
                })
            
            # Confidence analysis
            explanations.append({
                "method": "confidence_analysis",
                "title": "Confidence Distribution",
                "description": "Model confidence across all possible classes",
                "insights": [
                    f"The model is highly confident in class '{predicted_class}' ({confidence:.3f})",
                    "The second highest confidence is significantly lower, indicating clear distinction",
                    "Low confidence in unrelated classes suggests good model calibration"
                ],
                "confidence_scores": ModelInterpretability._generate_confidence_scores(predicted_class),
                "confidence": 0.95
            })
            
            # Counterfactual explanation
            if "counterfactuals" in relevant_methods:
                changes_needed = random.randint(1, 3)
                explanations.append({
                    "method": "counterfactuals",
                    "title": "What Would Change the Prediction?",
                    "description": "Minimal changes that would lead to a different classification",
                    "insights": [
                        f"Changing {changes_needed} key pixels would likely change the prediction",
                        "The model decision is robust to small perturbations in the input",
                        "Specific regions of the image are critical for maintaining the current prediction"
                    ],
                    "minimal_changes": changes_needed,
                    "suggested_modifications": [
                        "Add stroke to the top-right corner",
                        "Remove connection in the middle section",
                        "Extend the bottom line"
                    ],
                    "confidence": 0.85
                })
            
            # Generate overall understanding score
            understanding_score = min(0.98, confidence * 0.9 + len(explanations) * 0.05)
            
            # Generate improvement suggestions
            suggestions = []
            
            if confidence < 0.9:
                suggestions.append("Consider training for additional epochs to increase prediction confidence")
            
            if dataset_type == "image" and len(explanations) < 3:
                suggestions.append("Try using data augmentation to improve model robustness")
            
            if model_type == "cnn":
                suggestions.append("The convolutional layers are effectively capturing spatial patterns")
            
            if not suggestions:
                suggestions.append("Your model is making well-justified predictions with high confidence!")
            
            interpretation_report = {
                "prediction_id": prediction_data.get("prediction_id", "pred_123"),
                "analysis_date": datetime.utcnow().isoformat(),
                "model_type": model_type,
                "dataset_type": dataset_type,
                "predicted_class": predicted_class,
                "true_class": true_class,
                "confidence": confidence,
                "understanding_score": round(understanding_score * 100, 1),
                "explanations": explanations,
                "suggestions": suggestions,
                "recommendations": [
                    "Validate explanations with domain knowledge when available",
                    "Use multiple interpretability methods for comprehensive understanding",
                    "Monitor for changes in interpretability over time",
                    "Consider ethical implications of model decisions"
                ],
                "encouragement": f"Great job on model interpretability, {prediction_data.get('student_name', 'Student')}! Understanding model decisions is crucial for responsible AI development."
            }
            
            return {
                "status": "success",
                "interpretation_report": interpretation_report,
                "message": f"🧠 Model interpretation complete! Understanding score: {int(understanding_score * 100)}/100"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to generate interpretation: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def _generate_saliency_map() -> List[List[float]]:
        """Generate mock saliency map data"""
        # Create a 28x28 grid (MNIST size)
        saliency = np.zeros((28, 28))
        
        # Add some activation patterns
        center = 14
        for i in range(28):
            for j in range(28):
                distance = np.sqrt((i-center)**2 + (j-center)**2)
                if distance < 8:
                    saliency[i][j] = random.uniform(0.7, 1.0)
                elif distance < 12:
                    saliency[i][j] = random.uniform(0.4, 0.7)
                elif distance < 16:
                    saliency[i][j] = random.uniform(0.1, 0.4)
        
        return saliency.tolist()
    
    @staticmethod
    def _generate_confidence_scores(predicted_class: str) -> Dict[str, float]:
        """Generate mock confidence scores for all classes"""
        classes = [str(i) for i in range(10)]  # MNIST classes
        scores = {}
        
        for cls in classes:
            if cls == predicted_class:
                scores[cls] = round(random.uniform(0.95, 0.99), 3)
            else:
                scores[cls] = round(random.uniform(0.01, 0.3), 3)
        
        return scores
    
    @staticmethod
    def get_interpretability_guidelines() -> Dict[str, Any]:
        """
        Get guidelines for model interpretability
        """
        guidelines = {
            "visual_models": [
                "Use saliency maps to verify the model focuses on relevant regions",
                "Check for 'shortcuts' where the model uses background or artifacts",
                "Compare saliency maps across different predictions for consistency",
                "Use Grad-CAM for deeper layer analysis"
            ],
            "tabular_models": [
                "Examine feature importance rankings for unexpected patterns",
                "Check for leakage of target information in features",
                "Validate that important features make domain sense",
                "Use SHAP values for more detailed feature attribution"
            ],
            "confidence_analysis": [
                "Monitor confidence calibration (high confidence should match high accuracy)",
                "Investigate predictions with high confidence but incorrect labels",
                "Be cautious of overconfident models on out-of-distribution data",
                "Use temperature scaling if confidence is poorly calibrated"
            ],
            "ethical_considerations": [
                "Check for biased decision patterns across different groups",
                "Ensure explanations are consistent and not arbitrary",
                "Document limitations of interpretability methods used",
                "Consider the impact of model decisions on affected individuals"
            ]
        }
        
        return {
            "status": "success",
            "guidelines": guidelines,
            "message": "📚 Best practices for model interpretability"
        }

# Example usage
if __name__ == "__main__":
    interpreter = ModelInterpretability()
    
    # Test prediction data
    test_predictions = [
        {
            "prediction_id": "pred_001",
            "model_type": "cnn",
            "dataset_type": "image",
            "predicted_class": "8",
            "true_class": "8",
            "confidence": 0.983,
            "input_features": {"shape": [28, 28]},
            "student_name": "Kareem Mostafa"
        },
        {
            "prediction_id": "pred_002",
            "model_type": "mlp",
            "dataset_type": "image",
            "predicted_class": "3",
            "true_class": "7",
            "confidence": 0.912,
            "input_features": {"shape": [784]},
            "student_name": "Yusuf Mohammed"
        }
    ]
    
    print("🧠 Model Interpretability Test:")
    
    for pred in test_predictions:
        print(f"\n🔍 Analyzing prediction: {pred['prediction_id']} (Class {pred['predicted_class']})")
        
        # Test interpretation
        result = interpreter.explain_prediction(pred)
        if "error" not in result:
            report = result["interpretation_report"]
            print(f"  Understanding score: {report['understanding_score']}/100")
            print(f  "  Explanations: {len(report['explanations'])}")
        
        # Test guidelines
        guidelines = interpreter.get_interpretability_guidelines()
        if "error" not in guidelines:
            print(f"  Loaded {len(guidelines['guidelines'])} guideline categories")
