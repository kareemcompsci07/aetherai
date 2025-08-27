"""
AetherAI - Dynamic Model Factory
File: backend/utils/model_factory.py
Purpose: Create AI models dynamically based on student configuration
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Let students experiment with custom architectures — no PhD needed.
"""

import torch
import torch.nn as nn
from typing import Dict, Any, Optional

class SimpleCNN(nn.Module):
    """
    Simple CNN for image classification (e.g. MNIST, CIFAR-10)
    """
    def __init__(self, input_channels: int = 1, num_classes: int = 10, hidden_layers: int = 2):
        super().__init__()
        layers = []
        in_channels = input_channels
        out_channels = 32
        
        # Convolutional layers
        for _ in range(hidden_layers):
            layers.extend([
                nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
                nn.ReLU(),
                nn.MaxPool2d(2)
            ])
            in_channels = out_channels
            out_channels = min(out_channels * 2, 128)
        
        self.features = nn.Sequential(*layers)
        
        # Classifier
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d((4, 4)),
            nn.Flatten(),
            nn.Linear(4 * 4 * in_channels, 128),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(128, num_classes)
        )
    
    def forward(self, x):
        x = self.features(x)
        return self.classifier(x)

class SimpleMLP(nn.Module):
    """
    Multi-Layer Perceptron for tabular or flattened data
    """
    def __init__(self, input_size: int = 784, num_classes: int = 10, hidden_layers: int = 3, hidden_size: int = 128):
        super().__init__()
        layers = []
        in_features = input_size
        
        # Hidden layers
        for _ in range(hidden_layers):
            layers.extend([
                nn.Linear(in_features, hidden_size),
                nn.ReLU(),
                nn.Dropout(0.3)
            ])
            in_features = hidden_size
        
        # Output layer
        layers.append(nn.Linear(in_features, num_classes))
        
        self.network = nn.Sequential(*layers)
    
    def forward(self, x):
        if x.dim() > 2:
            x = x.view(x.size(0), -1)  # Flatten
        return self.network(x)

class LSTMClassifier(nn.Module):
    """
    LSTM for text classification
    """
    def __init__(self, vocab_size: int = 10000, embed_dim: int = 128, hidden_dim: int = 128, num_layers: int = 2, num_classes: int = 2):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, num_layers, batch_first=True, dropout=0.3 if num_layers > 1 else 0)
        self.classifier = nn.Linear(hidden_dim, num_classes)
    
    def forward(self, x):
        x = self.embedding(x)
        x, (hidden, _) = self.lstm(x)
        return self.classifier(hidden[-1])

def create_model(config: Dict[str, Any]) -> Optional[nn.Module]:
    """
    Factory function to create a model based on configuration
    """
    model_type = config.get("type", "mlp").lower()
    dataset = config.get("dataset", "").lower()
    
    # Auto-detect input/output sizes
    input_size = config.get("input_size", 784)  # Default for MNIST
    num_classes = config.get("num_classes", 10)
    
    if "mnist" in dataset or "fashion-mnist" in dataset:
        input_size = 784
        num_classes = 10
    elif "cifar" in dataset:
        input_size = 3072  # 32x32x3
        num_classes = 10
    elif "imdb" in dataset or "sst" in dataset:
        input_size = 5000  # Max sequence length
        num_classes = 2
    
    # Create model
    if model_type == "cnn":
        return SimpleCNN(
            input_channels=1 if "mnist" in dataset else 3,
            num_classes=num_classes,
            hidden_layers=config.get("hidden_layers", 2)
        )
    elif model_type == "mlp":
        return SimpleMLP(
            input_size=input_size,
            num_classes=num_classes,
            hidden_layers=config.get("hidden_layers", 3),
            hidden_size=config.get("hidden_size", 128)
        )
    elif model_type == "lstm":
        return LSTMClassifier(
            vocab_size=config.get("vocab_size", 10000),
            num_classes=num_classes,
            hidden_dim=config.get("hidden_dim", 128),
            num_layers=config.get("num_layers", 2)
        )
    else:
        raise ValueError(f"Unsupported model type: {model_type}")

# Example usage
if __name__ == "__main__":
    # Test model creation
    config = {
        "type": "cnn",
        "dataset": "mnist",
        "hidden_layers": 2
    }
    
    model = create_model(config)
    print(f"✅ Created {config['type'].upper()} model for {config['dataset']}")
    print(f"   Total parameters: {sum(p.numel() for p in model.parameters()):,}")
