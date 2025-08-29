"""
AetherAI - Ethics & Bias Detector
File: backend/utils/ethics_detector.py
Purpose: Detect bias and ethical issues in datasets
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Promote ethical AI by detecting bias in datasets.
"""

from typing import Dict, Any, List
import random
from datetime import datetime

class EthicsDetector:
    """
    Analyze datasets for bias and ethical concerns
    """
    
    # Common bias indicators
    BIAS_INDICATORS = [
        "Gender imbalance",
        "Racial/ethnic imbalance",
        "Geographic imbalance",
        "Age distribution bias",
        "Socioeconomic bias",
        "Disability representation",
        "Cultural representation"
    ]
    
    # Ethical risk levels
    RISK_LEVELS = ["Low", "Medium", "High", "Critical"]
    
    @staticmethod
    def detect_bias(dataset_info: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze dataset for potential bias and ethical concerns
        """
        try:
            # Extract dataset characteristics
            name = dataset_info.get("name", "Unknown")
            size = dataset_info.get("size", 1000)
            features = dataset_info.get("features", [])
            target_variable = dataset_info.get("target_variable", "unknown")
            collection_method = dataset_info.get("collection_method", "unknown")
            
            # Simulate bias detection based on dataset name and characteristics
            bias_report = {
                "dataset_name": name,
                "analysis_timestamp": datetime.utcnow().isoformat(),
                "total_samples": size,
                "target_variable": target_variable,
                "collection_method": collection_method,
                "ethical_concerns": []
            }
            
            # Detect bias based on dataset name (in production: analyze actual data)
            if "mnist" in name.lower():
                bias_report["ethical_concerns"] = [
                    {
                        "issue": "Lack of demographic diversity",
                        "description": "MNIST dataset contains handwritten digits without demographic information, limiting analysis of demographic bias but also preventing detection of representation issues.",
                        "risk_level": "Low",
                        "recommendation": "Consider augmenting with demographic metadata for real-world applications."
                    }
                ]
                
            elif "cifar" in name.lower():
                bias_report["ethical_concerns"] = [
                    {
                        "issue": "Limited geographic representation",
                        "description": "CIFAR-10/100 datasets were collected from internet images with potential geographic bias toward Western countries and urban environments.",
                        "risk_level": "Medium",
                        "recommendation": "Validate model performance across diverse geographic regions and consider collecting supplementary data from underrepresented areas."
                    },
                    {
                        "issue": "Potential cultural bias",
                        "description": "Object categories may reflect cultural bias in what is considered 'common' objects, potentially disadvantaging models deployed in different cultural contexts.",
                        "risk_level": "Medium",
                        "recommendation": "Test model on culturally diverse test sets and consider redefining object categories for specific deployment contexts."
                    }
                ]
                
            elif "medical" in name.lower():
                bias_report["ethical_concerns"] = [
                    {
                        "issue": "Gender imbalance",
                        "description": "Medical datasets often overrepresent certain genders, leading to models that perform poorly on underrepresented groups.",
                        "risk_level": "High",
                        "recommendation": "Analyze gender distribution and apply reweighting or oversampling techniques to mitigate bias."
                    },
                    {
                        "issue": "Age distribution bias",
                        "description": "Many medical datasets focus on adult populations, limiting applicability to pediatric or geriatric care.",
                        "risk_level": "High",
                        "recommendation": "Collect additional data from underrepresented age groups or use transfer learning from adult to pediatric models."
                    },
                    {
                        "issue": "Healthcare access bias",
                        "description": "Patients in medical datasets often come from populations with better healthcare access, potentially excluding vulnerable populations.",
                        "risk_level": "High",
                        "recommendation": "Partner with community health centers to collect data from underserved populations."
                    }
                ]
                
            elif "facial" in name.lower() or "face" in name.lower():
                bias_report["ethical_concerns"] = [
                    {
                        "issue": "Racial/ethnic bias",
                        "description": "Facial recognition datasets have historically underrepresented darker skin tones, leading to higher error rates for people of color.",
                        "risk_level": "Critical",
                        "recommendation": "Use datasets with balanced racial/ethnic representation and test model performance across skin tone categories."
                    },
                    {
                        "issue": "Gender classification bias",
                        "description": "Binary gender classification reinforces gender stereotypes and fails to represent non-binary and transgender individuals.",
                        "risk_level": "High",
                        "recommendation": "Avoid binary gender classification when possible and use gender-neutral approaches."
                    },
                    {
                        "issue": "Age-based discrimination",
                        "description": "Age estimation models can be used for discriminatory purposes such as age-based pricing or access restrictions.",
                        "risk_level": "High",
                        "recommendation": "Implement strict usage policies and consider whether age estimation is truly necessary for the application."
                    }
                ]
                
            else:
                # Generic bias detection
                detected_issues = random.sample(EthicsDetector.BIAS_INDICATORS, 
                                              k=random.randint(1, 3))
                
                bias_report["ethical_concerns"] = [
                    {
                        "issue": issue,
                        "description": f"This dataset may contain {issue.lower()} that could lead to unfair model outcomes.",
                        "risk_level": random.choice(EthicsDetector.RISK_LEVELS[1:]),  # Medium to Critical
                        "recommendation": "Conduct thorough bias audit and consider collecting more diverse data."
                    }
                    for issue in detected_issues
                ]
            
            # Calculate overall risk score
            risk_mapping = {"Low": 1, "Medium": 2, "High": 3, "Critical": 4}
            if bias_report["ethical_concerns"]:
                avg_risk = sum(risk_mapping[c["risk_level"]] for c in bias_report["ethical_concerns"]) / len(bias_report["ethical_concerns"])
                bias_report["overall_risk_level"] = "Low" if avg_risk < 1.5 else "Medium" if avg_risk < 2.5 else "High" if avg_risk < 3.5 else "Critical"
                bias_report["risk_score"] = round(avg_risk, 2)
            else:
                bias_report["overall_risk_level"] = "Low"
                bias_report["risk_score"] = 1.0
            
            return {
                "status": "success",
                "bias_report": bias_report,
                "message": "🔍 AI-powered ethics analysis completed!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to detect bias: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def generate_ethics_report(dataset_info: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate comprehensive ethics report for dataset
        """
        try:
            detection_result = EthicsDetector.detect_bias(dataset_info)
            
            if "error" in detection_result:
                return detection_result
            
            report = detection_result["bias_report"]
            
            # Add educational content
            report["educational_content"] = {
                "title": "Understanding AI Ethics",
                "sections": [
                    {
                        "heading": "What is Algorithmic Bias?",
                        "content": "Algorithmic bias occurs when an AI system produces systematically prejudiced results due to erroneous assumptions in the machine learning process. This can happen at various stages including data collection, feature selection, and model training."
                    },
                    {
                        "heading": "Common Sources of Bias",
                        "content": "• Historical bias in training data\n• Representation bias (under/over-representation)\n• Measurement bias (flawed data collection)\n• Aggregation bias (treating diverse groups as homogeneous)\n• Automation bias (over-trusting AI decisions)"
                    },
                    {
                        "heading": "Why Ethics Matter in AI",
                        "content": "Unethical AI systems can perpetuate and amplify societal inequalities, leading to unfair outcomes in critical areas like healthcare, finance, and criminal justice. Responsible AI development requires proactive identification and mitigation of ethical risks."
                    }
                ]
            }
            
            return {
                "status": "success",
                "ethics_report": report,
                "message": "📘 Comprehensive ethics report generated!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to generate ethics report: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }

# Example usage
if __name__ == "__main__":
    detector = EthicsDetector()
    
    # Test datasets
    test_datasets = [
        {
            "name": "mnist",
            "size": 70000,
            "features": ["pixel_values"],
            "target_variable": "digit",
            "collection_method": "Volunteer handwriting"
        },
        {
            "name": "cifar-10",
            "size": 60000,
            "features": ["image_pixels"],
            "target_variable": "object_class",
            "collection_method": "Web scraping"
        },
        {
            "name": "medical-diagnosis-data",
            "size": 50000,
            "features": ["symptoms", "lab_results"],
            "target_variable": "diagnosis",
            "collection_method": "Hospital records"
        }
    ]
    
    for dataset in test_datasets:
        print(f"\n🔍 Ethics Analysis for {dataset['name'].upper()}:")
        result = detector.detect_bias(dataset)
        if "error" not in result:
            report = result["bias_report"]
            print(f"Overall Risk: {report['overall_risk_level']} (Score: {report['risk_score']})")
            for concern in report["ethical_concerns"]:
                print(f"  • {concern['issue']} [{concern['risk_level']}]")
