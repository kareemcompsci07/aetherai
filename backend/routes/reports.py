"""
AetherAI - Report Generation Routes
File: backend/routes/reports.py
Purpose: Auto-generate PDF experiment reports for students
Created by: Kareem Mostafa
Location: Future City, Cairo, Egypt
Year: 2025
Vision: Every student should be able to share their AI research professionally.
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
import json
from datetime import datetime
from typing import Dict, Any
import asyncio

# HTML to PDF
from weasyprint import HTML
from jinja2 import Template

# Initialize router
router = APIRouter(prefix="/api/v1/reports", tags=["reports"])

# In-memory results store (should match results.py)
from .results import training_results

# HTML Template for PDF (inline for simplicity)
PDF_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f9f9f9;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background: linear-gradient(135deg, #000000, #0f172a);
            color: white;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            color: #00FFFF;
        }
        .section {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        h2 {
            color: #0f172a;
            border-bottom: 2px solid #00FFFF;
            padding-bottom: 8px;
            margin-top: 0;
        }
        .metric-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        .metric {
            padding: 15px;
            background: #f0f8ff;
            border-left: 4px solid #00FFFF;
            border-radius: 4px;
        }
        .metric-label {
            font-size: 14px;
            color: #666;
        }
        .metric-value {
            font-size: 20px;
            font-weight: bold;
            color: #0f172a;
        }
        .insight {
            background: #e8f5e8;
            padding: 12px;
            border-radius: 6px;
            margin: 8px 0;
            border-left: 4px solid #4CAF50;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
        .logo {
            width: 50px;
            height: 50px;
            background: #00FFFF;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: black;
            font-weight: bold;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div style="display: flex; align-items: center; justify-content: center;">
            <div class="logo">AI</div>
            <h1>AetherAI Experiment Report</h1>
        </div>
        <p>Generated on {{ report.generation_date }} | AetherAI v0.1.0</p>
    </div>

    <div class="section">
        <h2>🔧 Experiment Configuration</h2>
        <div class="metric-grid">
            <div class="metric">
                <div class="metric-label">Model</div>
                <div class="metric-value">{{ result.model|upper }}</div>
            </div>
            <div class="metric">
                <div class="metric-label">Dataset</div>
                <div class="metric-value">{{ result.dataset }}</div>
            </div>
            <div class="metric">
                <div class="metric-label">Epochs</div>
                <div class="metric-value">{{ result.epochs }}</div>
            </div>
            <div class="metric">
                <div class="metric-label">Training Time</div>
                <div class="metric-value">{{ '%.1f' % (result.training_time_seconds / 60) }} min</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>📊 Performance Metrics</h2>
        <div class="metric-grid">
            <div class="metric">
                <div class="metric-label">Final Accuracy</div>
                <div class="metric-value" style="color: #4CAF50;">{{ '%.2f' % (result.final_accuracy * 100) }}%</div>
            </div>
            <div class="metric">
                <div class="metric-label">Final Loss</div>
                <div class="metric-value" style="color: #F44336;">{{ '%.3f' % result.final_loss }}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>🧠 AI-Generated Insights</h2>
        {% for insight in result.insights %}
        <div class="insight">{{ insight }}</div>
        {% endfor %}
    </div>

    <div class="section">
        <h2>📈 Training Curves (Summary)</h2>
        <p>Accuracy improved from {{ '%.1f' % (result.metrics.accuracy[0] * 100) }}% to {{ '%.1f' % (result.final_accuracy * 100) }}%.</p>
        <p>Loss decreased from {{ '%.3f' % result.metrics.loss[0] }} to {{ '%.3f' % result.final_loss }}.</p>
        <p><strong>Status:</strong> 
            {% if result.final_accuracy > 0.9 %}✅ Excellent performance{% elif result.final_accuracy > 0.7 %}✅ Good performance{% else %}⚠️ Room for improvement{% endif %}
        </p>
    </div>

    <div class="footer">
        <p>Generated by AetherAI – Open-source platform for students without GPUs</p>
        <p>Developed by Kareem Mostafa in Egypt | https://github.com/kareemcompsci07/aetherai</p>
        <p>This report is auto-generated. No manual editing required.</p>
    </div>
</body>
</html>
"""

@router.post("/generate")
async def generate_experiment_report(experiment_data: Dict[Any, Any]):
    """
    Generate a professional PDF report for an AI experiment
    """
    # Extract experiment_id from request
    experiment_id = experiment_data.get("experiment_id")
    
    if not experiment_id:
        raise HTTPException(
            status_code=400,
            detail="experiment_id is required"
        )
    
    # Get result from results store
    if experiment_id not in training_results:
        raise HTTPException(
            status_code=404,
            detail=f"Results not found for experiment: {experiment_id}"
        )
    
    result = training_results[experiment_id]
    
    # Add report metadata
    report_metadata = {
        "generation_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "version": "AetherAI v0.1.0"
    }
    
    # Render HTML with Jinja2
    template = Template(PDF_TEMPLATE)
    html_string = template.render(result=result, report=report_metadata)
    
    # Convert HTML to PDF
    try:
        # Simulate processing time
        await asyncio.sleep(1)
        
        html = HTML(string=html_string)
        pdf = html.write_pdf()
        
        return Response(
            content=pdf,
            media_type='application/pdf',
            headers={
                "Content-Disposition": f"attachment; filename=aetherai_experiment_{experiment_id}.pdf"
            }
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate PDF: {str(e)}"
        )

@router.get("/sample")
async def get_sample_report():
    """
    Generate a sample report for demonstration
    """
    sample_result = {
        "experiment_id": "sample-001",
        "model": "cnn",
        "dataset": "MNIST",
        "final_accuracy": 0.983,
        "final_loss": 0.054,
        "epochs": 10,
        "training_time_seconds": 138,
        "metrics": {
            "accuracy": [0.1, 0.45, 0.67, 0.78, 0.82, 0.86, 0.89, 0.91, 0.95, 0.983],
            "loss": [2.3, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4, 0.054]
        },
        "insights": [
            "✅ Excellent accuracy achieved — model learned effectively.",
            "📉 Low final loss indicates good convergence.",
            "📈 Strong improvement in accuracy over epochs.",
            "💡 Tip: For images, consider data normalization and augmentation."
        ]
    }
    
    # Add report metadata
    report_metadata = {
        "generation_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "version": "AetherAI v0.1.0"
    }
    
    # Render HTML with Jinja2
    template = Template(PDF_TEMPLATE)
    html_string = template.render(result=sample_result, report=report_metadata)
    
    # Convert to PDF
    try:
        html = HTML(string=html_string)
        pdf = html.write_pdf()
        
        return Response(
            content=pdf,
            media_type='application/pdf',
            headers={
                "Content-Disposition": "attachment; filename=aetherai_sample_report.pdf"
            }
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate sample PDF: {str(e)}"
      )
