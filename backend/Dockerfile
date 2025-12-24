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
COPY entrypoint.py .

# Make entrypoint executable
RUN chmod +x entrypoint.py

# Expose port
EXPOSE 8000

# Run with Python entrypoint that handles PORT env variable
CMD ["python", "entrypoint.py"]
