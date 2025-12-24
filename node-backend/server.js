const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");
const FormData = require("form-data");

const app = express();
const upload = multer();

// Use environment variables
const PORT = process.env.PORT || 3000;
const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:8000";

app.use(cors());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "Node API is running", python_api: PYTHON_API_URL });
});

app.post("/api/predict", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(
      `${PYTHON_API_URL}/predict`,
      formData,
      { headers: formData.getHeaders() }
    );

    res.json(response.data);

  } catch (err) {
    console.error("ML prediction error:", err.message);
    res.status(500).json({ error: "ML prediction failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Node API running on port ${PORT}`);
  console.log(`Python API URL: ${PYTHON_API_URL}`);
});
