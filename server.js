console.log("SERVER STARTING...");

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

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

// ================= OPENAI INIT =================
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ================= CHATBOT =================
app.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Tu es un assistant technique pour techniciens de maintenance. Donne des réponses simples et pratiques.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.log("OPENAI ERROR:", error);

    res.status(500).json({
      error: "Chatbot error",
      details: error.message,
    });
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});