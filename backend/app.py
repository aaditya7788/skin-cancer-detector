from fastapi import FastAPI, UploadFile, File
from PIL import Image
import torch
import torch.nn as nn
from torchvision import models, transforms
import json
import io

app = FastAPI()

device = torch.device("cpu")

# load classes
with open("classes.json") as f:
    class_names = json.load(f)

# load model
model = models.resnet50(pretrained=False)
model.fc = nn.Linear(model.fc.in_features, len(class_names))
model.load_state_dict(torch.load("skin_disease_resnet50_weights.pth", map_location=device))
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

@app.get("/")
def root():
    return {"status": "ML API running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    img = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(img)
        probs = torch.softmax(outputs, dim=1)
        conf, pred = torch.max(probs, 1)

    confidence = round(conf.item() * 100, 2)

    if confidence < 60:
        return {
            "prediction": "Normal / Uncertain",
            "confidence": confidence
        }

    return {
        "prediction": class_names[pred.item()],
        "confidence": confidence
    }
