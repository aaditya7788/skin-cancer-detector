# Python Backend Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY app.py .
COPY classes.json .
COPY skin_disease_resnet50_weights.pth .

# Expose port (Render will set PORT env variable)
EXPOSE 8000

# Run the application using PORT environment variable
CMD uvicorn app:app --host 0.0.0.0 --port ${PORT:-8000}
