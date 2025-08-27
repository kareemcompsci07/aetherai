# AetherAI - Dockerfile
# Created by Kareem Mostafa | Future City, Cairo, Egypt | 2025
# Lightweight container for students to run AI experiments without GPU dependency

FROM python:3.11-slim

# Set metadata
LABEL maintainer="Kareem Mostafa"
LABEL description="AetherAI - Open-Source AI Research Platform for Students"
LABEL version="0.1.0"
LABEL org.opencontainers.image.source="https://github.com/kareemcompsci07/aetherai"

# Set working directory
WORKDIR /app

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install system dependencies for WeasyPrint (PDF generation) and performance
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libharfbuzz0b \
    libcairo2 \
    libgdk-pixbuf2.0-0 \
    libxml2-dev \
    libxslt1-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the entire backend code
COPY backend/ ./backend/

# Expose port 8000 (FastAPI default)
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the FastAPI server with Uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
