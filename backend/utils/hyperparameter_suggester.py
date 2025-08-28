"""
AetherAI - Hyperparameter Suggester
File: backend/utils/hyperparameter_suggester.py
Purpose: Suggest optimal hyperparameters based on model and dataset
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students train better models with smart defaults.
"""

from typing import Dict, Any, Optional

# Knowledge base of hyperparameter suggestions
HYPERPARAMETER_RULES = {
    # CNN for image datasets
    ("cnn", "mnist"): {
        "learning_rate": 0.001,
        "batch_size": 32,
        "epochs": 10,
        "optimizer": "Adam",
        "hidden_layers": 2,
        "dropout": 0.5,
        "suggestion": "Standard CNN setup for MNIST. Good balance of speed and accuracy."
    },
    ("cnn", "fashion-mnist"): {
        "learning_rate": 0.001,
        "batch_size": 64,
        "epochs": 15,
        "optimizer": "Adam",
        "hidden_layers": 3,
        "dropout": 0.5,
        "suggestion": "Fashion-MNIST is harder than MNIST. Increased epochs and layers."
    },
    ("cnn", "cifar-10"): {
        "learning_rate": 0.001,
        "batch_size": 32,
        "epochs": 20,
        "optimizer": "SGD with momentum",
        "hidden_layers": 4,
        "dropout": 0.3,
        "suggestion": "CIFAR-10 has complex images. Deeper network with regularization."
    },
    
    # MLP for tabular/image data
    ("mlp", "mnist"): {
        "learning_rate": 0.001,
        "batch_size": 128,
        "epochs": 50,
        "optimizer": "Adam",
        "hidden_layers": 3,
        "hidden_size": 128,
        "suggestion": "MLP needs more epochs and layers to learn MNIST patterns."
    },
    ("mlp", "iris"): {
        "learning_rate": 0.01,
        "batch_size": 16,
        "epochs": 100,
        "optimizer": "SGD",
        "hidden_layers": 2,
        "hidden_size": 64,
        "suggestion": "Small dataset. High learning rate and many epochs for convergence."
    },
    
    # LSTM for NLP
    ("lstm", "imdb"): {
        "learning_rate": 0.001,
        "batch_size": 32,
        "epochs": 10,
        "optimizer": "Adam",
        "hidden_dim": 128,
        "num_layers": 2,
        "dropout": 0.5,
        "suggestion": "Standard LSTM setup for sentiment analysis."
    },
    ("lstm", "sst-2"): {
        "learning_rate": 0.001,
        "batch_size": 16,
        "epochs": 15,
        "optimizer": "Adam",
        "hidden_dim": 256,
        "num_layers": 1,
        "dropout": 0.3,
        "suggestion": "SST-2 benefits from larger hidden dimension."
    },
    
    # Transformers (future)
    ("transformer", "imdb"): {
        "learning_rate": 2e-5,
        "batch_size": 16,
        "epochs": 3,
        "optimizer": "AdamW",
        "warmup_steps": 100,
        "suggestion": "Transformers need small LR and few epochs to avoid overfitting."
    }
}

def suggest_hyperparameters(model: str, dataset: str, custom_rules: Optional[Dict] = None) -> Dict[str, Any]:
    """
    Suggest hyperparameters based on model and dataset
    """
    # Use custom rules if provided
    rules = custom_rules or HYPERPARAMETER_RULES
    
    # Normalize inputs
    model_lower = model.lower()
    dataset_lower = dataset.lower()
    
    # Try exact match
    key = (model_lower, dataset_lower)
    if key in rules:
        suggestion = rules[key].copy()
        suggestion["source"] = "exact_match"
        return suggestion
    
    # Try model-only match
    model_key = (model_lower, "any")
    if model_key in rules:
        suggestion = rules[model_key].copy()
        suggestion["source"] = "model_only"
        return suggestion
    
    # Try dataset-only match
    for (m, d), value in rules.items():
        if d == dataset_lower:
            suggestion = value.copy()
            suggestion["source"] = "dataset_only"
            suggestion["note"] = f"Using rules for {d}, any model"
            return suggestion
    
    # Default fallback
    return {
        "learning_rate": 0.001,
        "batch_size": 32,
        "epochs": 10,
        "optimizer": "Adam",
        "suggestion": "No specific rules found. Using safe defaults for educational use.",
        "source": "fallback"
    }

# Example usage
if __name__ == "__main__":
    # Test suggestions
    test_cases = [
        ("cnn", "mnist"),
        ("mlp", "iris"),
        ("lstm", "imdb"),
        ("cnn", "unknown-dataset")
    ]
    
    for model, dataset in test_cases:
        suggestion = suggest_hyperparameters(model, dataset)
        print(f"\n🎯 Suggestion for {model.upper()} on {dataset.upper()}:")
        for k, v in suggestion.items():
            print(f"  {k}: {v}")
