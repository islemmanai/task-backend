const express = require("express");
const cors = require("cors");

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

// ================= CHATBOT =================
app.post("/chatbot", (req, res) => {
  const msg = req.body.message?.toLowerCase();

  let reply = "Je ne comprends pas votre demande.";

  // ===== SALUTATIONS =====
  if (
    msg.includes("bonjour") ||
    msg.includes("salut") ||
    msg.includes("hello")
  ) {
    reply = "Bonjour technicien 👋 Comment puis-je vous aider ?";
  }

  // ===== PANNE =====
  else if (msg.includes("panne")) {
    reply =
      "Vérifiez l'alimentation électrique et redémarrez l'équipement.";
  }

  // ===== RÉSEAU =====
  else if (msg.includes("réseau") || msg.includes("wifi")) {
    reply =
      "Vérifiez la connexion réseau, le routeur et les câbles Ethernet.";
  }

  // ===== IMPRIMANTE =====
  else if (msg.includes("imprimante")) {
    reply =
      "Vérifiez le papier, les câbles USB et redémarrez l'imprimante.";
  }

  // ===== MOT DE PASSE =====
  else if (msg.includes("mot de passe")) {
    reply =
      "Demandez à l'administrateur de réinitialiser le mot de passe.";
  }

  // ===== SERVEUR =====
  else if (msg.includes("serveur")) {
    reply =
      "Vérifiez les logs serveur et assurez-vous que le service est actif.";
  }

  // ===== DEFAULT =====
  else {
    reply =
      "Votre demande a été analysée par l'assistant technique.";
  }

  res.json({ reply });
});

// ================= SERVER =================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});