"""
AetherAI - Code Auto-Completion System
File: backend/utils/code_autocomplete.py
Purpose: Provide AI-powered code suggestions for AI model building
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students write better AI code with intelligent suggestions.
"""

from typing import Dict, Any, List
import random
from datetime import datetime, timedelta

class CodeAutoComplete:
    """
    Provide intelligent code completion suggestions for AI model building
    """
    
    # Common AI code patterns
    CODE_PATTERNS = {
        "pytorch_model": {
            "template": '''
import torch
import torch.nn as nn
import torch.nn.functional as F

class {model_name}(nn.Module):
    def __init__(self):
        super().__init__()
        {layers}
    
    def forward(self, x):
        {forward_pass}
        return x
''',
            "layers": [
                "self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)",
                "self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)",
                "self.pool = nn.MaxPool2d(2, 2)",
                "self.fc1 = nn.Linear(64 * 8 * 8, 512)",
                "self.fc2 = nn.Linear(512, 10)",
                "self.dropout = nn.Dropout(0.5)"
            ],
            "forward_pass": [
                "x = self.pool(F.relu(self.conv1(x)))",
                "x = self.pool(F.relu(self.conv2(x)))",
                "x = x.view(-1, 64 * 8 * 8)",
                "x = F.relu(self.fc1(x))",
                "x = self.dropout(x)",
                "x = self.fc2(x)"
            ],
            "imports": [
                "import torch",
                "import torch.nn as nn",
                "import torch.nn.functional as F"
            ]
        },
        "training_loop": {
            "template": '''
def train_model(model, train_loader, criterion, optimizer, num_epochs):
    model.train()
    for epoch in range(num_epochs):
        running_loss = 0.0
        correct = 0
        total = 0
        
        for inputs, labels in train_loader:
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()
        
        print(f'Epoch {epoch+1}, Loss: {running_loss/len(train_loader):.3f}, Accuracy: {100.*correct/total:.2f}%')
''',
            "imports": [
                "import torch"
            ]
        },
        "data_loader": {
            "template": '''
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

train_dataset = datasets.{dataset_name}('./data', train=True, download=True, transform=transform)
test_dataset = datasets.{dataset_name}('./data', train=False, download=True, transform=transform)

train_loader = DataLoader(train_dataset, batch_size={batch_size}, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size={batch_size}, shuffle=False)
''',
            "datasets": ["MNIST", "CIFAR10", "FashionMNIST"],
            "imports": [
                "from torch.utils.data import DataLoader",
                "from torchvision import datasets, transforms"
            ]
        },
        "hyperparameter_suggestion": {
            "template": '''
# Hyperparameters
learning_rate = {learning_rate}
batch_size = {batch_size}
num_epochs = {num_epochs}
optimizer = "{optimizer}"
criterion = "{criterion}"

# Model configuration
model_architecture = "{model_type}"
input_size = {input_size}
output_size = {output_size}
''',
            "optimizers": ["Adam", "SGD", "RMSprop"],
            "criteria": ["CrossEntropyLoss", "MSELoss"],
            "imports": []
        }
    }
    
    # Common errors and fixes
    ERROR_FIXES = {
        "dimension_mismatch": {
            "error": "RuntimeError: shape '[*]' is invalid for input of size [*]",
            "explanation": "The tensor dimensions don't match for the operation",
            "solutions": [
                "Check the output shape of your previous layer",
                "Use .view() or .reshape() to adjust tensor dimensions",
                "Verify your input size matches the first layer",
                "Print tensor shapes during forward pass for debugging"
            ],
            "code_example": '''
# Debug tensor shapes
print(f"Input shape: {x.shape}")
x = self.conv1(x)
print(f"After conv1: {x.shape}")
x = self.pool(x)
print(f"After pool: {x.shape}")
'''
        },
        "missing_module": {
            "error": "ModuleNotFoundError: No module named 'torch'",
            "explanation": "The required library is not installed",
            "solutions": [
                "Install PyTorch using pip: pip install torch",
                "For GPU support: pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118",
                "Check your Python environment and virtual environment",
                "Verify the installation with: import torch; print(torch.__version__)"
            ],
            "code_example": '''
# Test installation
try:
    import torch
    print(f"PyTorch version: {torch.__version__}")
except ImportError as e:
    print(f"Import error: {e}")
'''
        },
        "optimizer_step": {
            "error": "ValueError: optimizer got an empty parameter list",
            "explanation": "The optimizer doesn't have any parameters to optimize",
            "solutions": [
                "Make sure your model inherits from nn.Module",
                "Verify your layers are defined in __init__ method",
                "Check that you're passing model.parameters() to the optimizer",
                "Ensure your model is on the correct device (CPU/GPU)"
            ],
            "code_example": '''
# Correct optimizer setup
model = MyModel()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Wrong - this won't work
# optimizer = torch.optim.Adam([], lr=0.001)
'''
        }
    }
    
    @staticmethod
    def generate_suggestions(code_context: str, language: str = "python") -> Dict[str, Any]:
        """
        Generate intelligent code completion suggestions
        """
        try:
            suggestions = []
            
            # Analyze code context
            if "import torch" in code_context and "class" in code_context and "(nn.Module)" in code_context:
                # Suggest model structure
                layers = random.sample(CodeAutoComplete.CODE_PATTERNS["pytorch_model"]["layers"], 3)
                forward_pass = random.sample(CodeAutoComplete.CODE_PATTERNS["pytorch_model"]["forward_pass"], 3)
                
                model_name = "CustomCNN"
                if "MNIST" in code_context:
                    model_name = "MNISTClassifier"
                elif "CIFAR" in code_context:
                    model_name = "CIFARClassifier"
                
                suggestion = {
                    "type": "model_structure",
                    "title": "Suggested Model Architecture",
                    "description": "Complete neural network structure for your task",
                    "code": CodeAutoComplete.CODE_PATTERNS["pytorch_model"]["template"].format(
                        model_name=model_name,
                        layers="\n        ".join(layers),
                        forward_pass="\n        ".join(forward_pass)
                    ),
                    "confidence": 0.95
                }
                suggestions.append(suggestion)
            
            elif "DataLoader" in code_context and "datasets" in code_context:
                # Suggest data loading code
                dataset_name = random.choice(CodeAutoComplete.CODE_PATTERNS["data_loader"]["datasets"])
                batch_size = random.choice([32, 64, 128])
                
                suggestion = {
                    "type": "data_loader",
                    "title": "Complete Data Loading Setup",
                    "description": "Full data loading pipeline with transforms",
                    "code": CodeAutoComplete.CODE_PATTERNS["data_loader"]["template"].format(
                        dataset_name=dataset_name,
                        batch_size=batch_size
                    ),
                    "confidence": 0.90
                }
                suggestions.append(suggestion)
            
            elif "train" in code_context and "model" in code_context and "optimizer" in code_context:
                # Suggest training loop
                suggestion = {
                    "type": "training_loop",
                    "title": "Complete Training Loop",
                    "description": "Full training loop with loss tracking and accuracy calculation",
                    "code": CodeAutoComplete.CODE_PATTERNS["training_loop"]["template"],
                    "confidence": 0.85
                }
                suggestions.append(suggestion)
            
            # Suggest hyperparameters if model type is mentioned
            if "CNN" in code_context or "MLP" in code_context or "RNN" in code_context:
                model_type = "CNN" if "CNN" in code_context else "MLP"
                learning_rate = round(random.uniform(0.0001, 0.01), 4)
                batch_size = random.choice([32, 64, 128])
                num_epochs = random.choice([10, 20, 50])
                optimizer = random.choice(CodeAutoComplete.CODE_PATTERNS["hyperparameter_suggestion"]["optimizers"])
                criterion = random.choice(CodeAutoComplete.CODE_PATTERNS["hyperparameter_suggestion"]["criteria"])
                
                suggestion = {
                    "type": "hyperparameters",
                    "title": "Recommended Hyperparameters",
                    "description": "Optimal settings for your model and dataset",
                    "code": CodeAutoComplete.CODE_PATTERNS["hyperparameter_suggestion"]["template"].format(
                        learning_rate=learning_rate,
                        batch_size=batch_size,
                        num_epochs=num_epochs,
                        optimizer=optimizer,
                        criterion=criterion,
                        model_type=model_type,
                        input_size=784 if "MNIST" in code_context else 3072,
                        output_size=10
                    ),
                    "confidence": 0.80
                }
                suggestions.append(suggestion)
            
            # If no specific context, suggest common imports
            if not suggestions:
                suggestion = {
                    "type": "basic_setup",
                    "title": "Essential Imports",
                    "description": "Common libraries needed for AI development",
                    "code": "\n".join([
                        "import torch",
                        "import torch.nn as nn",
                        "import torch.optim as optim",
                        "import torch.nn.functional as F",
                        "from torch.utils.data import DataLoader",
                        "import torchvision",
                        "import numpy as np",
                        "import matplotlib.pyplot as plt"
                    ]),
                    "confidence": 0.75
                }
                suggestions.append(suggestion)
            
            return {
                "status": "success",
                "code_context": code_context,
                "suggestions": suggestions,
                "total_suggestions": len(suggestions),
                "timestamp": datetime.utcnow().isoformat(),
                "message": f"💡 {len(suggestions)} code suggestions generated!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to generate code suggestions: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def analyze_error(error_message: str) -> Dict[str, Any]:
        """
        Analyze error message and provide solutions
        """
        try:
            # Check against known errors
            for error_type, error_data in CodeAutoComplete.ERROR_FIXES.items():
                if error_data["error"].split(":")[0] in error_message:
                    return {
                        "status": "success",
                        "error_type": error_type,
                        "error_message": error_message,
                        "explanation": error_data["explanation"],
                        "solutions": error_data["solutions"],
                        "code_example": error_data["code_example"],
                        "confidence": 0.95,
                        "timestamp": datetime.utcnow().isoformat(),
                        "message": "🔧 Error analysis complete!"
                    }
            
            # Generic error analysis
            return {
                "status": "success",
                "error_type": "unknown",
                "error_message": error_message,
                "explanation": "An error occurred during code execution",
                "suggestions": [
                    "Check the line number mentioned in the error",
                    "Verify all variables are properly defined",
                    "Ensure proper indentation in Python",
                    "Check for missing parentheses or brackets",
                    "Confirm all required libraries are imported"
                ],
                "confidence": 0.60,
                "timestamp": datetime.utcnow().isoformat(),
                "message": "🔍 Generic error analysis"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to analyze error: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def get_best_practices() -> Dict[str, Any]:
        """
        Get best practices for AI code development
        """
        practices = {
            "model_design": [
                "Use modular design with separate layers",
                "Include dropout for regularization",
                "Use batch normalization for faster training",
                "Initialize weights properly (Xavier, He, etc.)"
            ],
            "training": [
                "Use learning rate scheduling",
                "Implement early stopping to prevent overfitting",
                "Monitor both training and validation loss",
                "Use gradient clipping for RNNs"
            ],
            "debugging": [
                "Print tensor shapes during forward pass",
                "Use small batch sizes for debugging",
                "Test on a small subset of data first",
                "Visualize model architecture"
            ],
            "performance": [
                "Use GPU acceleration when available",
                "Optimize data loading with proper batch sizes",
                "Consider model quantization for deployment",
                "Profile code to identify bottlenecks"
            ]
        }
        
        return {
            "status": "success",
            "best_practices": practices,
            "message": "📚 Best practices for AI development"
        }

# Example usage
if __name__ == "__main__":
    completer = CodeAutoComplete()
    
    # Test code contexts
    test_contexts = [
        "import torch\nimport torch.nn as nn\nclass MNISTClassifier(nn.Module):",
        "from torch.utils.data import DataLoader\nfrom torchvision import datasets",
        "def train_model(model, train_loader, criterion, optimizer):"
    ]
    
    print("💡 Code Auto-Completion Test:")
    
    for context in test_contexts:
        print(f"\n📝 Analyzing code context: {context[:50]}...")
        
        # Test suggestion generation
        result = completer.generate_suggestions(context)
        if "error" not in result:
            print(f"  Generated {result['total_suggestions']} suggestions")
            for suggestion in result["suggestions"]:
                print(f"  - {suggestion['title']} [{suggestion['type']}]")
        
        # Test error analysis
        error_result = completer.analyze_error("RuntimeError: shape '[*]' is invalid for input of size [*]")
        if "error" not in error_result:
            print(f"  Error analysis: {error_result['explanation']}")
