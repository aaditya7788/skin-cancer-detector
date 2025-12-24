# 🔬 Skin Disease Detection - Full Stack ML Application

A complete machine learning application with PyTorch backend, Node.js API gateway, and Angular frontend.

## 🏗️ Architecture

```
Angular Frontend (localhost:4200)
        ↓
Node.js API Gateway (localhost:3000)
        ↓
Python ML API (localhost:8000)
```

## 📋 Prerequisites

- Python 3.x with pip
- Node.js and npm
- Angular CLI (`npm install -g @angular/cli`)

## 🚀 Setup & Run

### 1️⃣ Python ML Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

The ML API will be available at `http://localhost:8000`

### 2️⃣ Node.js API Gateway

```bash
cd node-backend
npm install
node server.js
```

The Node API will be available at `http://localhost:3000`

### 3️⃣ Angular Frontend

```bash
cd frontend
npm install
ng serve
```

The Angular app will be available at `http://localhost:4200`

## 📝 Usage

1. Make sure all three services are running (Python, Node, Angular)
2. Open your browser to `http://localhost:4200`
3. Upload a skin lesion image
4. Click "Predict"
5. View the prediction and confidence score

## ⚠️ Important Notes

- **Order matters**: Start Python backend first, then Node, then Angular
- The app is for educational purposes only - not for medical diagnosis
- Always consult healthcare professionals for medical concerns

## 🛠️ Troubleshooting

### "Could not import module 'app'" error
Run uvicorn from the `backend` directory:
```bash
cd backend
uvicorn app:app --reload --port 8000
```

### PowerShell script execution error
Run this in PowerShell:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Port already in use
Make sure no other services are running on ports 3000, 4200, or 8000.

## 📦 Project Structure

```
skin_cancer_detector/
├── backend/                    # Python ML API
│   ├── app.py                 # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── classes.json          # Disease class names
│   └── skin_disease_resnet50_weights.pth
├── node-backend/              # Node.js API Gateway
│   ├── server.js             # Express server
│   └── package.json
└── frontend/                  # Angular Frontend
    ├── src/
    │   ├── app/
    │   │   ├── upload/       # Upload component
    │   │   └── ...
    │   └── ...
    ├── angular.json
    └── package.json
```

## 🎯 What You've Built

A production-ready full-stack ML application featuring:
- **Deep Learning**: ResNet-50 model with PyTorch
- **REST API**: FastAPI with CORS support
- **API Gateway**: Node.js/Express middleware layer
- **Modern Frontend**: Angular with TypeScript
- **End-to-end data flow**: Image upload → ML inference → Results display

Perfect for portfolios and interviews!
