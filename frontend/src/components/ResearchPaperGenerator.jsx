/**
 * AetherAI - Research Paper Generator Component
 * File: ResearchPaperGenerator.jsx
 * Purpose: Generate academic papers from student experiments
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students publish their AI research with professional formatting.
 */

import React, { useState } from 'react';

const ResearchPaperGenerator = ({ experimentData }) => {
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('ieee');

  const handleGenerate = () => {
    if (!experimentData) {
      alert('Complete an experiment to generate a research paper');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock paper based on experiment data
      const mockPaper = {
        title: experimentData.finalAccuracy >= 0.98 ? 
          "An Efficient CNN Architecture for MNIST Classification" :
          experimentData.finalAccuracy >= 0.95 ?
          "Deep Learning for MNIST: A CNN Approach" :
          "Performance Analysis of CNN on MNIST Dataset",
        abstract: `This paper presents a deep learning approach for MNIST classification using a CNN architecture. The proposed model achieves a test accuracy of ${(experimentData.finalAccuracy * 100).toFixed(2)}% on the MNIST dataset, demonstrating competitive performance compared to state-of-the-art methods. The architecture consists of multiple convolutional and fully connected layers with appropriate activation functions and regularization techniques.`,
        introduction: `Image classification has become a fundamental task in computer vision, with applications ranging from medical diagnosis to autonomous vehicles. The MNIST dataset, introduced in 1998, remains a benchmark for evaluating machine learning algorithms. Convolutional Neural Networks (CNNs) have revolutionized the field of computer vision, achieving human-level performance on various image recognition tasks.`,
        methodology: `The proposed CNN architecture consists of the following layers:\n\n1. Input Layer: MNIST images of size 28x28 pixels\n2. Convolutional Layer 1: 32 filters, 3x3 kernel, ReLU activation\n3. Max Pooling Layer 1: 2x2 pool size\n4. Convolutional Layer 2: 64 filters, 3x3 kernel, ReLU activation\n5. Max Pooling Layer 2: 2x2 pool size\n6. Dropout Layer: 25% dropout rate\n7. Fully Connected Layer 1: 128 units, ReLU activation\n8. Dropout Layer: 50% dropout rate\n9. Output Layer: 10 units (for 10 classes), Softmax activation\n\nTraining was conducted for ${experimentData.epochs} epochs using the Adam optimizer with a learning rate of 0.001 and a batch size of 128.`,
        results: `The proposed model achieved the following results:\n\n- **Test Accuracy**: ${(experimentData.finalAccuracy * 100).toFixed(2)}%\n- **Final Training Loss**: ${experimentData.finalLoss.toFixed(4)}\n- **Training Time**: ${Math.floor(experimentData.trainingTime/60)} minutes ${experimentData.trainingTime%60} seconds\n- **Peak Memory Usage**: 512 MB (simulated)`,
        discussion: experimentData.finalAccuracy >= 0.98 ?
          `The excellent performance achieved by the model indicates strong generalization capabilities. The high accuracy suggests that the model has effectively learned the underlying patterns in the data. Potential limitations include the relatively simple architecture and the use of simulated training.` :
          experimentData.finalAccuracy >= 0.95 ?
          `The very good performance achieved by the model indicates strong generalization capabilities. The results indicate strong performance, though there is room for improvement through hyperparameter tuning.` :
          `The moderate performance achieved by the model shows promise but would benefit from architectural improvements and additional training.`,
        conclusion: `In conclusion, this study demonstrates the effectiveness of a CNN model for digit recognition, achieving ${(experimentData.finalAccuracy * 100).toFixed(2)}% accuracy on the MNIST dataset. The results validate the suitability of deep learning approaches for image classification tasks.`,
        references: [
          "Y. LeCun, L. Bottou, Y. Bengio, and P. Haffner, 'Gradient-based learning applied to document recognition,' Proceedings of the IEEE, vol. 86, no. 11, pp. 2278-2324, 1998.",
          "K. He, X. Zhang, S. Ren, and J. Sun, 'Deep residual learning for image recognition,' in Proceedings of the IEEE conference on computer vision and pattern recognition, 2016, pp. 770-778.",
          "A. Krizhevsky, I. Sutskever, and G. E. Hinton, 'ImageNet classification with deep convolutional neural networks,' Advances in neural information processing systems, vol. 25, 2012.",
          "D. P. Kingma and J. Ba, 'Adam: A method for stochastic optimization,' arXiv preprint arXiv:1412.6980, 2014."
        ],
        generatedDate: new Date().toISOString(),
        format: format === 'ieee' ? 'IEEE Conference' : 
                format === 'acm' ? 'ACM Conference' : 
                format === 'springer' ? 'Springer LNCS' : 'arXiv Preprint'
      };

      setPaper(mockPaper);
      setLoading(false);
    }, 1500);
  };

  if (!experimentData) {
    return (
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl text-center">
        <p className="text-gray-400 text-sm">Complete an AI experiment to generate a research paper</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Research Paper Generator 📄
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Generate a professional academic paper from your AI experiment results.
      </p>

      {/* Paper Format Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Paper Format
        </label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="ieee">IEEE Conference</option>
          <option value="acm">ACM Conference</option>
          <option value="springer">Springer LNCS</option>
          <option value="arxiv">arXiv Preprint</option>
        </select>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 disabled:from-gray-600 text-black font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition mb-6"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
            Generating Paper...
          </div>
        ) : (
          "✨ Generate Research Paper"
        )}
      </button>

      {/* Paper Content */}
      {paper && (
        <div className="space-y-6">
          {/* Paper Header */}
          <div className="border-b border-gray-600 pb-4">
            <h4 className="text-lg font-bold text-white mb-2">{paper.title}</h4>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400">
              <span>Format: {paper.format}</span>
              <span>•</span>
              <span>Generated: {new Date(paper.generatedDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Abstract */}
          <div>
            <h5 className="font-semibold text-yellow-400 mb-3">Abstract</h5>
            <p className="text-gray-300 text-sm leading-relaxed">{paper.abstract}</p>
          </div>

          {/* Introduction */}
          <div>
            <h5 className="font-semibold text-blue-400 mb-3">1. Introduction</h5>
            <p className="text-gray-300 text-sm leading-relaxed">{paper.introduction}</p>
          </div>

          {/* Methodology */}
          <div>
            <h5 className="font-semibold text-green-400 mb-3">2. Methodology</h5>
            <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{paper.methodology}</div>
          </div>

          {/* Results */}
          <div>
            <h5 className="font-semibold text-purple-400 mb-3">3. Results</h5>
            <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{paper.results}</div>
          </div>

          {/* Discussion */}
          <div>
            <h5 className="font-semibold text-orange-400 mb-3">4. Discussion</h5>
            <p className="text-gray-300 text-sm leading-relaxed">{paper.discussion}</p>
          </div>

          {/* Conclusion */}
          <div>
            <h5 className="font-semibold text-cyan-400 mb-3">5. Conclusion</h5>
            <p className="text-gray-300 text-sm leading-relaxed">{paper.conclusion}</p>
          </div>

          {/* References */}
          <div>
            <h5 className="font-semibold text-gray-400 mb-3">References</h5>
            <ol className="text-gray-300 text-sm space-y-2">
              {paper.references.map((ref, i) => (
                <li key={i} className="pl-4 border-l-2 border-gray-600">
                  {ref}
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-600">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-black font-bold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition">
              📥 Download PDF
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-black font-bold rounded-lg hover:from-green-500 hover:to-emerald-500 transition">
              📤 Share Paper
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-black font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition">
              🖨️ Print
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes your experiment results and generates a complete academic paper 
          in professional format. In the full version, this connects to an AI model on the server.
        </p>
      </div>
    </div>
  );
};

export default ResearchPaperGenerator;
