const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task backend is running 🚀");
});

// IMPORTANT POUR RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
app.post("/chatbot", async (req, res) => {
  res.json({ reply: "test chatbot OK" });
});
app.get("/", (req, res) => {
  res.send("HOME OK");
});

app.get("/test", (req, res) => {
  res.send("TEST OK WORKING");
});
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Tu es un assistant technique pour des techniciens de maintenance. Donne des réponses simples, claires et pratiques.",
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

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Chatbot error" });
  }
});