"""
AetherAI - Energy Efficiency Analyzer
File: backend/utils/energy_efficiency.py
Purpose: Analyze energy consumption and carbon savings of AI training
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students understand the environmental impact of AI training.
"""

from typing import Dict, Any, List
import random
from datetime import datetime, timedelta

class EnergyEfficiencyAnalyzer:
    """
    Analyze energy consumption and carbon savings of AI training
    """
    
    # Energy consumption data (in watts)
    ENERGY_CONSUMPTION = {
        "cpu": {
            "laptop": 60,      # Average laptop CPU
            "desktop": 120,    # Average desktop CPU
            "server": 200      # Server-grade CPU
        },
        "gpu": {
            "none": 0,
            "integrated": 30,  # Integrated graphics
            "mid_range": 150,  # Mid-range GPU
            "high_end": 300    # High-end GPU (e.g., RTX 3080)
        },
        "cloud": {
            "cpu": 100,        # Average cloud CPU instance
            "gpu": 250         # Average cloud GPU instance
        }
    }
    
    # Carbon emission factors (g CO2 per kWh)
    CARBON_FACTORS = {
        "global_average": 475,
        "egypt": 520,          # Egypt's grid emission factor
        "usa": 450,
        "europe": 250,
        "renewable": 50
    }
    
    @staticmethod
    def analyze_energy_consumption(training_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze energy consumption and carbon savings of AI training
        """
        try:
            training_time_minutes = training_data.get("training_time_minutes", 60)
            model_type = training_data.get("model_type", "cnn")
            dataset_size = training_data.get("dataset_size", 1000)
            hardware_type = training_data.get("hardware_type", "cpu")
            hardware_details = training_data.get("hardware_details", "laptop")
            cloud_simulation = training_data.get("cloud_simulation", False)
            country = training_data.get("country", "Egypt")
            
            # Convert minutes to hours
            training_time_hours = training_time_minutes / 60
            
            # Calculate energy consumption based on hardware
            if cloud_simulation:
                # Cloud simulation - using cloud instance
                if "gpu" in model_type.lower():
                    power_watts = EnergyEfficiencyAnalyzer.ENERGY_CONSUMPTION["cloud"]["gpu"]
                else:
                    power_watts = EnergyEfficiencyAnalyzer.ENERGY_CONSUMPTION["cloud"]["cpu"]
            else:
                # Local training
                cpu_power = EnergyEfficiencyAnalyzer.ENERGY_CONSUMPTION["cpu"].get(hardware_details, 100)
                gpu_power = EnergyEfficiencyAnalyzer.ENERGY_CONSUMPTION["gpu"].get(hardware_details, 0)
                power_watts = cpu_power + gpu_power
            
            # Calculate energy consumption in kWh
            energy_kwh = (power_watts * training_time_hours) / 1000
            
            # Get carbon factor based on country
            carbon_factor = EnergyEfficiencyAnalyzer.CARBON_FACTORS.get(country.lower(), 
                                                                       EnergyEfficiencyAnalyzer.CARBON_FACTORS["global_average"])
            
            # Calculate carbon emissions
            carbon_emissions_grams = energy_kwh * carbon_factor
            carbon_emissions_kg = carbon_emissions_grams / 1000
            
            # Calculate equivalent environmental impact
            trees_needed = carbon_emissions_kg / 20  # One tree absorbs ~20kg CO2 per year
            car_miles = carbon_emissions_kg / 0.404  # Average car emits 0.404 kg CO2 per mile
            
            # Compare with average AI training
            avg_training_time = 120  # Average training time in minutes
            avg_power = 180  # Average power consumption in watts
            avg_training_hours = avg_training_time / 60
            avg_energy_kwh = (avg_power * avg_training_hours) / 1000
            avg_carbon_kg = avg_energy_kwh * carbon_factor / 1000
            
            # Calculate savings compared to average
            energy_savings_kwh = max(0, avg_energy_kwh - energy_kwh)
            carbon_savings_kg = max(0, avg_carbon_kg - carbon_emissions_kg)
            
            # Generate efficiency score (0-100)
            # Higher score for less energy consumption and lower emissions
            efficiency_score = max(10, min(100, int(100 - (energy_kwh / 10) * 20)))
            
            # Generate improvement suggestions
            suggestions = []
            
            if not cloud_simulation and "gpu" not in hardware_type:
                suggestions.append("Consider using cloud GPU instances for faster and potentially more efficient training")
            
            if training_time_minutes > 120:
                suggestions.append("Optimize your model architecture to reduce training time")
            
            if model_type == "cnn" and dataset_size < 5000:
                suggestions.append("Use data augmentation to improve model performance with smaller datasets")
            
            if not suggestions:
                suggestions.append("Your training process is highly efficient! Great job on resource optimization.")
            
            # Generate comparison metrics
            comparison_metrics = {
                "energy_consumption": {
                    "your_usage": round(energy_kwh, 3),
                    "average_usage": round(avg_energy_kwh, 3),
                    "unit": "kWh",
                    "savings": round(energy_savings_kwh, 3)
                },
                "carbon_emissions": {
                    "your_emissions": round(carbon_emissions_kg, 3),
                    "average_emissions": round(avg_carbon_kg, 3),
                    "unit": "kg CO2",
                    "savings": round(carbon_savings_kg, 3)
                },
                "training_time": {
                    "your_time": training_time_minutes,
                    "average_time": avg_training_time,
                    "unit": "minutes",
                    "savings": max(0, avg_training_time - training_time_minutes)
                }
            }
            
            # Generate encouragement message
            if efficiency_score >= 80:
                encouragement = f"Amazing work on energy efficiency, {training_data.get('student_name', 'Student')}! You're setting a great example for sustainable AI development."
            elif efficiency_score >= 60:
                encouragement = f"Good job on energy efficiency, {training_data.get('student_name', 'Student')}! With a few optimizations, you can make your AI training even more sustainable."
            else:
                encouragement = f"Keep learning about sustainable AI, {training_data.get('student_name', 'Student')}! Every optimization helps reduce the environmental impact of AI."
            
            efficiency_report = {
                "analysis_date": datetime.utcnow().isoformat(),
                "training_time_minutes": training_time_minutes,
                "model_type": model_type,
                "dataset_size": dataset_size,
                "hardware_type": hardware_type,
                "hardware_details": hardware_details,
                "cloud_simulation": cloud_simulation,
                "country": country,
                "energy_kwh": energy_kwh,
                "power_watts": power_watts,
                "carbon_emissions_kg": carbon_emissions_kg,
                "carbon_factor_g_per_kwh": carbon_factor,
                "efficiency_score": efficiency_score,
                "trees_equivalent": round(trees_needed, 2),
                "car_miles_equivalent": round(car_miles, 2),
                "comparison": comparison_metrics,
                "suggestions": suggestions,
                "recommendations": [
                    "Use smaller model architectures when possible",
                    "Implement early stopping to prevent unnecessary training",
                    "Use mixed precision training to reduce energy consumption",
                    "Consider using renewable energy sources for computing"
                ],
                "encouragement": encouragement
            }
            
            return {
                "status": "success",
                "efficiency_report": efficiency_report,
                "message": f"🌍 Energy efficiency analysis complete! Score: {efficiency_score}/100"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to analyze energy efficiency: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def get_sustainability_guidelines() -> Dict[str, Any]:
        """
        Get guidelines for sustainable AI development
        """
        guidelines = {
            "energy_efficient_training": [
                "Use early stopping to prevent overtraining",
                "Implement learning rate scheduling for faster convergence",
                "Use smaller batch sizes when possible",
                "Consider mixed precision training (FP16)"
            ],
            "model_optimization": [
                "Use model pruning to remove unnecessary weights",
                "Implement knowledge distillation from larger models",
                "Use quantization to reduce model size and inference cost",
                "Consider model compression techniques"
            ],
            "hardware_choices": [
                "Use cloud instances with access to renewable energy",
                "Train during off-peak hours when grid is greener",
                "Share computing resources with collaborators",
                "Consider the energy efficiency of hardware when purchasing"
            ],
            "data_efficiency": [
                "Use data augmentation to make the most of limited data",
                "Implement active learning to reduce labeling needs",
                "Use synthetic data generation when appropriate",
                "Clean and preprocess data to remove noise and redundancy"
            ]
        }
        
        return {
            "status": "success",
            "guidelines": guidelines,
            "message": "📚 Best practices for sustainable AI development"
        }

# Example usage
if __name__ == "__main__":
    analyzer = EnergyEfficiencyAnalyzer()
    
    # Test training data
    test_trainings = [
        {
            "training_time_minutes": 240,
            "model_type": "cnn",
            "dataset_size": 60000,
            "hardware_type": "cpu",
            "hardware_details": "laptop",
            "cloud_simulation": False,
            "country": "Egypt",
            "student_name": "Kareem Mostafa"
        },
        {
            "training_time_minutes": 90,
            "model_type": "mlp",
            "dataset_size": 1000,
            "hardware_type": "cpu",
            "hardware_details": "laptop",
            "cloud_simulation": True,
            "country": "Egypt",
            "student_name": "Yusuf Mohammed"
        }
    ]
    
    print("🌍 Energy Efficiency Analyzer Test:")
    
    for training in test_trainings:
        print(f"\n📊 Analyzing training: {training['model_type']} model, {training['training_time_minutes']} minutes")
        
        # Test energy analysis
        result = analyzer.analyze_energy_consumption(training)
        if "error" not in result:
            report = result["efficiency_report"]
            print(f"  Efficiency score: {report['efficiency_score']}/100")
            print(f  "  Carbon emissions: {report['carbon_emissions_kg']:.3f} kg CO2")
        
        # Test sustainability guidelines
        guidelines = analyzer.get_sustainability_guidelines()
        if "error" not in guidelines:
            print(f"  Loaded {len(guidelines['guidelines'])} guideline categories")
