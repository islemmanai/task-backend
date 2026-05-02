const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("Task backend is running 🚀");
});

// ================= TEST =================
app.get("/test", (req, res) => {
  res.send("TEST OK WORKING");
});

// ================= CHATBOT (FREE) =================
app.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        inputs: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      }
    );

    const reply =
      response.data.generated_text ||
      response.data[0]?.generated_text ||
      "No response";

    res.json({ reply });

  } catch (error) {
    console.log("HF ERROR:", error.message);
    res.status(500).json({ error: "Chatbot error (HF)" });
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});