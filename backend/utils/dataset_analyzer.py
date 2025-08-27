"""
AetherAI - Dataset Analyzer
File: backend/utils/dataset_analyzer.py
Purpose: Automatically analyze uploaded datasets and provide insights
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Help students understand their data before training.
"""

import zipfile
import os
from pathlib import Path
import json
from typing import Dict, Any, List
import re
from datetime import datetime

# Supported dataset structures
SUPPORTED_FORMATS = ['.zip']
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.bmp', '.gif'}
TEXT_EXTENSIONS = {'.txt', '.csv', '.json'}

class DatasetAnalyzer:
    """
    Analyze uploaded datasets to provide educational insights
    """
    
    def __init__(self, file_path: Path):
        self.file_path = file_path
        self.zip_path = str(file_path)
    
    def analyze(self) -> Dict[str, Any]:
        """
        Analyze the dataset and return structured insights
        """
        try:
            with zipfile.ZipFile(self.zip_path, 'r') as zip_ref:
                file_list = zip_ref.namelist()
                
                analysis = {
                    "summary": self._get_summary(file_list),
                    "structure": self._analyze_structure(file_list),
                    "images": self._analyze_images(zip_ref, file_list),
                    "text": self._analyze_text(file_list),
                    "issues": self._detect_issues(file_list),
                    "suggestions": self._generate_suggestions(file_list),
                    "analysis_timestamp": datetime.utcnow().isoformat()
                }
                
                return analysis
                
        except Exception as e:
            return {
                "error": f"Failed to analyze dataset: {str(e)}",
                "file_path": str(self.file_path),
                "timestamp": datetime.utcnow().isoformat()
            }
    
    def _get_summary(self, file_list: List[str]) -> Dict[str, Any]:
        """Get basic summary of the dataset"""
        total_files = len(file_list)
        directories = len([f for f in file_list if f.endswith('/')])
        files = total_files - directories
        
        return {
            "total_files": total_files,
            "directories": directories,
            "files": files,
            "size_mb": round(os.path.getsize(self.file_path) / (1024 * 1024), 2)
        }
    
    def _analyze_structure(self, file_list: List[str]) -> Dict[str, Any]:
        """Analyze directory structure"""
        root_dirs = set()
        train_dirs = 0
        val_dirs = 0
        test_dirs = 0
        
        for path in file_list:
            parts = [p for p in path.split('/') if p and not p.startswith('.')]
            if len(parts) > 0:
                root_dirs.add(parts[0])
            
            if 'train' in path.lower():
                train_dirs += 1
            if 'val' in path.lower() or 'validation' in path.lower():
                val_dirs += 1
            if 'test' in path.lower():
                test_dirs += 1
        
        return {
            "root_directories": list(root_dirs),
            "has_train_split": train_dirs > 0,
            "has_validation_split": val_dirs > 0,
            "has_test_split": test_dirs > 0,
            "suggests_classification": len(root_dirs) > 1 and all(d.isalpha() for d in root_dirs)
        }
    
    def _analyze_images(self, zip_ref, file_list: List[str]) -> Dict[str, Any]:
        """Analyze image content"""
        image_files = [f for f in file_list if Path(f).suffix.lower() in IMAGE_EXTENSIONS]
        
        if not image_files:
            return {"image_files": 0, "has_images": False}
        
        # Extract sizes (simplified - in real version would extract actual image dimensions)
        sizes = []
        for img_file in image_files[:10]:  # Sample first 10
            try:
                with zip_ref.open(img_file) as img:
                    # This is simplified - in real app would use PIL to get size
                    sizes.append("Unknown (simulated)")
            except:
                continue
        
        return {
            "image_files": len(image_files),
            "has_images": True,
            "sample_sizes": sizes[:3],
            "suggests_cnn": len(image_files) > 0
        }
    
    def _analyze_text(self, file_list: List[str]) -> Dict[str, Any]:
        """Analyze text content"""
        text_files = [f for f in file_list if Path(f).suffix.lower() in TEXT_EXTENSIONS]
        
        if not text_files:
            return {"text_files": 0, "has_text": False}
        
        return {
            "text_files": len(text_files),
            "has_text": True,
            "suggests_nlp": len(text_files) > 0
        }
    
    def _detect_issues(self, file_list: List[str]) -> List[str]:
        """Detect potential issues"""
        issues = []
        
        if len(file_list) == 0:
            issues.append("Dataset appears to be empty")
        
        # Check for very deep nesting
        max_depth = max((len([p for p in f.split('/') if p]) for f in file_list), default=0)
        if max_depth > 5:
            issues.append("Deep directory structure - may be hard to navigate")
        
        # Check for mixed content
        has_images = any(Path(f).suffix.lower() in IMAGE_EXTENSIONS for f in file_list)
        has_text = any(Path(f).suffix.lower() in TEXT_EXTENSIONS for f in file_list)
        if has_images and has_text:
            issues.append("Mixed image and text files - ensure clear organization")
        
        return issues
    
    def _generate_suggestions(self, file_list: List[str]) -> List[str]:
        """Generate educational suggestions"""
        suggestions = []
        
        structure = self._analyze_structure(file_list)
        
        if structure["suggests_classification"]:
            suggestions.append("✅ This structure suggests a classification task. Each folder may be a class.")
        
        images = self._analyze_images(None, file_list)
        if images["has_images"]:
            suggestions.append("📸 Images detected. A CNN model would be appropriate.")
        
        text = self._analyze_text(file_list)
        if text["has_text"]:
            suggestions.append("📄 Text files detected. Consider NLP models like Transformer or LSTM.")
        
        if not structure["has_train_split"]:
            suggestions.append("⚠️ No 'train' split found. Consider organizing data into train/validation/test.")
        
        if not any(Path(f).suffix.lower() in (IMAGE_EXTENSIONS | TEXT_EXTENSIONS) for f in file_list):
            suggestions.append("⚠️ No common data files found. Ensure dataset contains usable files.")
        
        if len(suggestions) == 0:
            suggestions.append("No specific suggestions. Dataset structure is neutral.")
        
        return suggestions

# Example usage
if __name__ == "__main__":
    # This would be called from datasets.py after upload
    analyzer = DatasetAnalyzer(Path("uploads/datasets/sample.zip"))
    result = analyzer.analyze()
    print(json.dumps(result, indent=2))
