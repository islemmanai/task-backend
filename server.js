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