// 4.Notificações de Novos Pedidos em um Restaurante usando HTTP Polling

const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Armazenamento de mensagens e clientes
let pollingMessages = [];

// HTTP Polling
app.get("/polling", (req, res) => {
  if (pollingMessages.length > 0) {
    const message = pollingMessages[pollingMessages.length - 1]; // Última mensagem
    console.log(`[HTTP Polling] Enviando mensagem: "${message}"`);
    res.json({ message });
  } else {
    res.json({ message: null });
  }
});

app.post("/polling/send", (req, res) => {
  const message = req.body.message;
  if (message) {
    pollingMessages.push(message);
    console.log(`[HTTP Polling] Mensagem recebida: "${message}"`);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
    console.log("📡 HTTP Polling: Verifica mensagens a cada 2 segundos.");
});
  