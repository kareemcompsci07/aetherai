"""
AetherAI - Dataset Quality Scorer
File: backend/utils/dataset_quality.py
Purpose: Analyze dataset quality and provide improvement suggestions
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students identify and fix dataset issues before training.
"""

from typing import Dict, Any, List
import random
from datetime import datetime, timedelta
import numpy as np

class DatasetQualityScorer:
    """
    Analyze dataset quality and provide improvement suggestions
    """
    
    # Quality metrics and thresholds
    QUALITY_METRICS = {
        "balance": {
            "name": "Class Balance",
            "description": "Distribution of classes across the dataset",
            "ideal_range": [0.4, 0.6],  # Balanced if between 40-60%
            "weight": 0.3
        },
        "cleanliness": {
            "name": "Data Cleanliness",
            "description": "Presence of missing values, duplicates, and outliers",
            "ideal_range": [0.9, 1.0],  # Clean if 90-100% clean
            "weight": 0.25
        },
        "diversity": {
            "name": "Data Diversity",
            "description": "Variety and representativeness of data samples",
            "ideal_range": [0.7, 1.0],  # Diverse if 70-100%
            "weight": 0.2
        },
        "relevance": {
            "name": "Feature Relevance",
            "description": "How well features relate to the target variable",
            "ideal_range": [0.6, 1.0],  # Relevant if 60-100%
            "weight": 0.15
        },
        "size": {
            "name": "Dataset Size",
            "description": "Adequacy of data quantity for the task",
            "ideal_range": [0.8, 1.0],  # Adequate if 80-100% of recommended size
            "weight": 0.1
        }
    }
    
    @staticmethod
    def score_dataset(dataset_info: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze dataset quality and return comprehensive score
        """
        try:
            dataset_name = dataset_info.get("name", "Unknown Dataset")
            model_type = dataset_info.get("model_type", "classification")
            target_variable = dataset_info.get("target_variable", "target")
            feature_count = dataset_info.get("feature_count", 10)
            sample_count = dataset_info.get("sample_count", 1000)
            class_distribution = dataset_info.get("class_distribution", {})
            missing_values = dataset_info.get("missing_values", 0)
            duplicates = dataset_info.get("duplicates", 0)
            outliers = dataset_info.get("outliers", 0)
            
            # Calculate individual metric scores
            scores = {}
            
            # 1. Balance score
            if class_distribution:
                max_class = max(class_distribution.values())
                min_class = min(class_distribution.values())
                total = sum(class_distribution.values())
                balance_ratio = min_class / max_class if max_class > 0 else 0
                scores["balance"] = {
                    "score": balance_ratio,
                    "rating": "Excellent" if balance_ratio >= 0.6 else "Good" if balance_ratio >= 0.4 else "Fair" if balance_ratio >= 0.2 else "Poor",
                    "value": f"{balance_ratio:.2f}",
                    "details": f"Most balanced class ratio: {balance_ratio:.2f}"
                }
            else:
                scores["balance"] = {
                    "score": 1.0,
                    "rating": "Excellent",
                    "value": "N/A",
                    "details": "No class distribution data available"
                }
            
            # 2. Cleanliness score
            total_data_points = sample_count * feature_count
            dirty_points = missing_values + duplicates + outliers
            cleanliness_ratio = max(0, 1 - (dirty_points / total_data_points)) if total_data_points > 0 else 0
            scores["cleanliness"] = {
                "score": cleanliness_ratio,
                "rating": "Excellent" if cleanliness_ratio >= 0.9 else "Good" if cleanliness_ratio >= 0.7 else "Fair" if cleanliness_ratio >= 0.5 else "Poor",
                "value": f"{cleanliness_ratio:.2f}",
                "details": f"Clean data points: {total_data_points - dirty_points}/{total_data_points}"
            }
            
            # 3. Diversity score
            # Simulate diversity based on feature count and sample count
            diversity_score = min(1.0, (feature_count * 0.1 + sample_count / 10000) / 2)
            scores["diversity"] = {
                "score": diversity_score,
                "rating": "Excellent" if diversity_score >= 0.8 else "Good" if diversity_score >= 0.6 else "Fair" if diversity_score >= 0.4 else "Poor",
                "value": f"{diversity_score:.2f}",
                "details": f"Estimated diversity based on {feature_count} features"
            }
            
            # 4. Relevance score
            # Simulate relevance based on correlation with target
            relevance_score = random.uniform(0.5, 0.9)  # Simulated value
            scores["relevance"] = {
                "score": relevance_score,
                "rating": "Excellent" if relevance_score >= 0.8 else "Good" if relevance_score >= 0.6 else "Fair" if relevance_score >= 0.4 else "Poor",
                "value": f"{relevance_score:.2f}",
                "details": "Estimated feature relevance to target variable"
            }
            
            # 5. Size score
            # Recommended sizes based on model type
            recommended_sizes = {
                "classification": 1000,
                "regression": 500,
                "cnn": 5000,
                "rnn": 2000
            }
            recommended_size = recommended_sizes.get(model_type, 1000)
            size_ratio = min(1.0, sample_count / recommended_size)
            scores["size"] = {
                "score": size_ratio,
                "rating": "Excellent" if size_ratio >= 0.9 else "Good" if size_ratio >= 0.7 else "Fair" if size_ratio >= 0.5 else "Poor",
                "value": f"{sample_count}/{recommended_size}",
                "details": f"Recommended: {recommended_size} samples"
            }
            
            # Calculate weighted total score
            total_score = sum(
                scores[metric]["score"] * DatasetQualityScorer.QUALITY_METRICS[metric]["weight"] 
                for metric in scores.keys()
            )
            
            # Generate overall rating
            if total_score >= 0.8:
                overall_rating = "Excellent"
                overall_icon = "🌟"
            elif total_score >= 0.6:
                overall_rating = "Good"
                overall_icon = "✅"
            elif total_score >= 0.4:
                overall_rating = "Fair"
                overall_icon = "⚠️"
            else:
                overall_rating = "Poor"
                overall_icon = "❌"
            
            # Generate improvement suggestions
            suggestions = []
            
            if scores["balance"]["score"] < 0.4:
                suggestions.append("Improve class balance using techniques like oversampling, undersampling, or SMOTE")
            
            if scores["cleanliness"]["score"] < 0.7:
                suggestions.append("Clean the dataset by handling missing values, removing duplicates, and addressing outliers")
            
            if scores["diversity"]["score"] < 0.6:
                suggestions.append("Increase data diversity by collecting more varied samples or using data augmentation")
            
            if scores["relevance"]["score"] < 0.6:
                suggestions.append("Evaluate feature importance and consider feature engineering or selection")
            
            if scores["size"]["score"] < 0.8:
                suggestions.append("Collect more data to improve model performance and generalization")
            
            if not suggestions:
                suggestions.append("Your dataset is in excellent condition! Ready for training.")
            
            # Generate confidence meter
            confidence_meter = "🌕" * int(total_score * 5) + "🌑" * (5 - int(total_score * 5))
            
            quality_report = {
                "dataset_name": dataset_name,
                "analysis_date": datetime.utcnow().isoformat(),
                "model_type": model_type,
                "sample_count": sample_count,
                "feature_count": feature_count,
                "total_score": round(total_score * 100, 1),
                "overall_rating": overall_rating,
                "overall_icon": overall_icon,
                "confidence_meter": confidence_meter,
                "metrics": scores,
                "suggestions": suggestions,
                "recommendations": [
                    "Visualize data distributions to identify potential issues",
                    "Use cross-validation to assess model performance robustness",
                    "Consider data augmentation techniques to improve diversity",
                    "Validate findings with domain experts if available"
                ],
                "encouragement": f"Great job on data preparation, {dataset_info.get('student_name', 'Student')}! High-quality data is the foundation of successful AI models."
            }
            
            return {
                "status": "success",
                "quality_report": quality_report,
                "message": f"{overall_icon} Dataset quality analysis complete! Score: {int(total_score * 100)}/100"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to score dataset: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def get_quality_guidelines() -> Dict[str, Any]:
        """
        Get guidelines for high-quality datasets
        """
        guidelines = {
            "data_collection": [
                "Collect diverse and representative samples",
                "Ensure adequate sample size for your task",
                "Document data collection methods and sources",
                "Consider ethical implications of data collection"
            ],
            "data_cleaning": [
                "Handle missing values appropriately (imputation or removal)",
                "Remove duplicate entries",
                "Address outliers and anomalies",
                "Standardize data formats and units"
            ],
            "data_balancing": [
                "Ensure balanced class distribution for classification tasks",
                "Use techniques like SMOTE for imbalanced datasets",
                "Consider stratified sampling for train/test splits",
                "Monitor class distribution throughout the pipeline"
            ],
            "feature_engineering": [
                "Select relevant features for your task",
                "Create new features that capture important patterns",
                "Normalize or standardize numerical features",
                "Encode categorical variables appropriately"
            ],
            "validation": [
                "Use cross-validation to assess model robustness",
                "Split data into train/validation/test sets",
                "Monitor for data leakage",
                "Validate model performance on unseen data"
            ]
        }
        
        return {
            "status": "success",
            "guidelines": guidelines,
            "message": "📚 Best practices for dataset quality"
        }

# Example usage
if __name__ == "__main__":
    scorer = DatasetQualityScorer()
    
    # Test dataset information
    test_datasets = [
        {
            "name": "MNIST Classification",
            "model_type": "cnn",
            "target_variable": "digit",
            "feature_count": 784,
            "sample_count": 60000,
            "class_distribution": {str(i): 6000 for i in range(10)},
            "missing_values": 0,
            "duplicates": 0,
            "outliers": 100,
            "student_name": "Kareem Mostafa"
        },
        {
            "name": "Medical Diagnosis",
            "model_type": "classification",
            "target_variable": "disease",
            "feature_count": 20,
            "sample_count": 500,
            "class_distribution": {"healthy": 400, "diseased": 100},
            "missing_values": 50,
            "duplicates": 20,
            "outliers": 30,
            "student_name": "Yusuf Mohammed"
        }
    ]
    
    print("📊 Dataset Quality Scorer Test:")
    
    for dataset in test_datasets:
        print(f"\n🔍 Analyzing: {dataset['name']}")
        
        # Test quality scoring
        result = scorer.score_dataset(dataset)
        if "error" not in result:
            report = result["quality_report"]
            print(f"  Score: {report['total_score']}/100 [{report['overall_rating']}]")
            print(f  "  Suggestions: {len(report['suggestions'])}")
        
        # Test quality guidelines
        guidelines = scorer.get_quality_guidelines()
        if "error" not in guidelines:
            print(f"  Loaded {len(guidelines['guidelines'])} guideline categories")
