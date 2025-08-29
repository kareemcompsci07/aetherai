"""
AetherAI - Research Paper Generator
File: backend/utils/paper_generator.py
Purpose: Generate academic papers from student experiments
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students publish their AI research with professional formatting.
"""

from typing import Dict, Any
import random
from datetime import datetime

class PaperGenerator:
    """
    Generate academic research papers from experiment data
    """
    
    @staticmethod
    def generate_paper(experiment_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate a complete research paper from experiment data
        """
        try:
            # Extract experiment data
            model_type = experiment_data.get("model", "CNN")
            dataset = experiment_data.get("dataset", "MNIST")
            final_accuracy = experiment_data.get("final_accuracy", 0.983)
            final_loss = experiment_data.get("final_loss", 0.054)
            training_time = experiment_data.get("training_time", 240)
            epochs = experiment_data.get("epochs", 10)
            
            # Generate paper components
            title = PaperGenerator._generate_title(model_type, dataset)
            abstract = PaperGenerator._generate_abstract(model_type, dataset, final_accuracy)
            introduction = PaperGenerator._generate_introduction(model_type, dataset)
            methodology = PaperGenerator._generate_methodology(model_type, dataset, epochs)
            results = PaperGenerator._generate_results(final_accuracy, final_loss, training_time)
            discussion = PaperGenerator._generate_discussion(final_accuracy, final_loss)
            conclusion = PaperGenerator._generate_conclusion(final_accuracy)
            references = PaperGenerator._generate_references()
            
            return {
                "status": "success",
                "paper": {
                    "title": title,
                    "abstract": abstract,
                    "introduction": introduction,
                    "methodology": methodology,
                    "results": results,
                    "discussion": discussion,
                    "conclusion": conclusion,
                    "references": references,
                    "generated_date": datetime.utcnow().isoformat(),
                    "format": "IEEE Conference Template"
                },
                "message": "📄 AI-powered research paper generated!"
            }
            
        except Exception as e:
            return {
                "error": f"Failed to generate research paper: {str(e)}",
                "timestamp": datetime.utcnow().isoformat()
            }
    
    @staticmethod
    def _generate_title(model_type: str, dataset: str) -> str:
        """Generate academic paper title"""
        titles = [
            f"An Efficient {model_type.upper()} Architecture for {dataset.upper()} Classification",
            f"Deep Learning for {dataset.upper()}: A {model_type.upper()} Approach",
            f"Performance Analysis of {model_type.upper()} on {dataset.upper()} Dataset",
            f"Optimizing {model_type.upper()} Hyperparameters for {dataset.upper()} Recognition",
            f"Comparative Study of Neural Networks on {dataset.upper()} with {model_type.upper()}"
        ]
        return random.choice(titles)
    
    @staticmethod
    def _generate_abstract(model_type: str, dataset: str, accuracy: float) -> str:
        """Generate paper abstract"""
        return (
            f"This paper presents a deep learning approach for {dataset.upper()} classification "
            f"using a {model_type.upper()} architecture. The proposed model achieves a test accuracy "
            f"of {accuracy*100:.2f}% on the {dataset.upper()} dataset, demonstrating competitive "
            f"performance compared to state-of-the-art methods. The architecture consists of "
            f"multiple convolutional and fully connected layers with appropriate activation functions "
            f"and regularization techniques. Training was conducted using the Adam optimizer with "
            f"a learning rate of 0.001. The results indicate that the {model_type.upper()} model "
            f"is effective for image classification tasks, particularly on the {dataset.upper()} dataset."
        )
    
    @staticmethod
    def _generate_introduction(model_type: str, dataset: str) -> str:
        """Generate paper introduction"""
        return (
            f"Image classification has become a fundamental task in computer vision, with applications "
            f"ranging from medical diagnosis to autonomous vehicles. The {dataset.upper()} dataset, "
            f"introduced in 1998, remains a benchmark for evaluating machine learning algorithms. "
            f"Convolutional Neural Networks (CNNs) have revolutionized the field of computer vision, "
            f"achieving human-level performance on various image recognition tasks.\n\n"
            f"This paper explores the application of a {model_type.upper()} architecture to the "
            f"{dataset.upper()} classification problem. The {model_type.upper()} model is particularly "
            f"suited for this task due to its ability to capture spatial hierarchies in images through "
            f"convolutional layers. Our implementation builds upon established deep learning principles "
            f"while optimizing hyperparameters for maximum performance on the {dataset.upper()} dataset."
        )
    
    @staticmethod
    def _generate_methodology(model_type: str, dataset: str, epochs: int) -> str:
        """Generate paper methodology"""
        return (
            f"The proposed {model_type.upper()} architecture consists of the following layers:\n\n"
            f"1. Input Layer: {dataset.upper()} images of size 28x28 pixels\n"
            f"2. Convolutional Layer 1: 32 filters, 3x3 kernel, ReLU activation\n"
            f"3. Max Pooling Layer 1: 2x2 pool size\n"
            f"4. Convolutional Layer 2: 64 filters, 3x3 kernel, ReLU activation\n"
            f"5. Max Pooling Layer 2: 2x2 pool size\n"
            f"6. Dropout Layer: 25% dropout rate\n"
            f"7. Fully Connected Layer 1: 128 units, ReLU activation\n"
            f"8. Dropout Layer: 50% dropout rate\n"
            f"9. Output Layer: 10 units (for 10 classes), Softmax activation\n\n"
            f"Training was conducted for {epochs} epochs using the Adam optimizer with a learning rate "
            f"of 0.001 and a batch size of 128. The model was implemented using PyTorch and trained "
            f"on a simulated environment. Data augmentation techniques including random rotations "
            f"and translations were applied to improve generalization."
        )
    
    @staticmethod
    def _generate_results(accuracy: float, loss: float, training_time: int) -> str:
        """Generate paper results"""
        return (
            f"The proposed model achieved the following results on the {training_time} seconds of training:\n\n"
            f"- **Test Accuracy**: {accuracy*100:.2f}%\n"
            f"- **Final Training Loss**: {loss:.4f}\n"
            f"- **Training Time**: {training_time//60} minutes {training_time%60} seconds\n"
            f"- **Peak Memory Usage**: 512 MB (simulated)\n\n"
            f"Figure 1 shows the training and validation accuracy curves over {training_time//60} epochs. "
            f"The model demonstrates consistent improvement in accuracy with minimal overfitting, "
            f"indicating good generalization capabilities. The final test accuracy of {accuracy*100:.2f}% "
            f"is competitive with published results on the {accuracy*100:.2f}% accuracy."
        )
    
    @staticmethod
    def _generate_discussion(accuracy: float, loss: float) -> str:
        """Generate paper discussion"""
        if accuracy >= 0.98:
            performance = "excellent"
            comment = "The high accuracy suggests that the model has effectively learned the underlying patterns in the data."
        elif accuracy >= 0.95:
            performance = "very good"
            comment = "The results indicate strong performance, though there is room for improvement through hyperparameter tuning."
        else:
            performance = "moderate"
            comment = "The model shows promise but would benefit from architectural improvements and additional training."
            
        return (
            f"The {performance} performance achieved by the {performance} generalization. "
            f"{comment}\n\n"
            f"Potential limitations include the relatively simple architecture and the use of simulated training. "
            f"Future work could explore more complex architectures such as ResNet or EfficientNet, "
            f"as well as transfer learning techniques. Additionally, testing the model on more diverse "
            f"datasets would provide insights into its robustness and generalizability."
        )
    
    @staticmethod
    def _generate_conclusion(accuracy: float) -> str:
        """Generate paper conclusion"""
        return (
            f"In conclusion, this study demonstrates the effectiveness of a {accuracy*100:.2f}% accuracy on the MNIST dataset. "
            f"The results validate the suitability of deep learning approaches for image classification tasks. "
            f"This work provides a foundation for further research in neural network optimization and "
            f"architecture design. The methodology presented can be extended to other image recognition "
            f"problems with appropriate modifications to the network architecture and training parameters."
        )
    
    @staticmethod
    def _generate_references() -> List[Dict[str, str]]:
        """Generate academic references"""
        return [
            {
                "citation": "Y. LeCun, L. Bottou, Y. Bengio, and P. Haffner, 'Gradient-based learning applied to document recognition,' Proceedings of the IEEE, vol. 86, no. 11, pp. 2278-2324, 1998.",
                "link": "https://doi.org/10.1109/5.726791"
            },
            {
                "citation": "K. He, X. Zhang, S. Ren, and J. Sun, 'Deep residual learning for image recognition,' in Proceedings of the IEEE conference on computer vision and pattern recognition, 2016, pp. 770-778.",
                "link": "https://doi.org/10.1109/CVPR.2016.90"
            },
            {
                "citation": "A. Krizhevsky, I. Sutskever, and G. E. Hinton, 'ImageNet classification with deep convolutional neural networks,' Advances in neural information processing systems, vol. 25, 2012.",
                "link": "https://doi.org/10.1145/3065386"
            },
            {
                "citation": "D. P. Kingma and J. Ba, 'Adam: A method for stochastic optimization,' arXiv preprint arXiv:1412.6980, 2014.",
                "link": "https://arxiv.org/abs/1412.6980"
            }
        ]

# Example usage
if __name__ == "__main__":
    generator = PaperGenerator()
    
    # Test experiment data
    test_experiment = {
        "model": "cnn",
        "dataset": "mnist",
        "final_accuracy": 0.983,
        "final_loss": 0.054,
        "training_time": 240,
        "epochs": 10
    }
    
    print("📄 Research Paper Generation Test:")
    paper = generator.generate_paper(test_experiment)
    
    if "error" not in paper:
        print(f"Title: {paper['paper']['title']}")
        print(f"\nAbstract: {paper['paper']['abstract'][:200]}...")
        print(f"\nIntroduction: {paper['paper']['introduction'][:200]}...")
        print(f"\nMethodology: {paper['paper']['methodology'][:200]}...")
        print(f"\nResults: {paper['paper']['results'][:200]}...")
        print(f"\nDiscussion: {paper['paper']['discussion'][:200]}...")
        print(f"\nConclusion: {paper['paper']['conclusion'][:200]}...")
        print(f"\nReferences: {len(paper['paper']['references'])} references")
