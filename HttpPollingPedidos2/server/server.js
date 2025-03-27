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
    //console.log(`[HTTP Polling] Enviando ${pollingMessages.length} pedidos.`);
    res.json({ orders: pollingMessages });
});

app.post("/polling/send", (req, res) => {
  const message = req.body.message;
  if (message) {
    pollingMessages.push(message);
    console.log(`[HTTP Polling] Pedido recebido: "${message}"`);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
    console.log("📡 HTTP Polling: Verifica mensagens a cada 2 segundos.");
});

// Exclui um pedido pelo índice
app.delete("/polling/delete/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < pollingMessages.length) {
    pollingMessages.splice(index, 1);
    console.log(`[HTTP Polling] Pedido removido.`);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

// Atualiza um pedido pelo índice
app.put("/polling/update/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const newMessage = req.body.message;
  if (index >= 0 && index < pollingMessages.length && newMessage) {
    pollingMessages[index] = newMessage;
    console.log(`[HTTP Polling] Pedido atualizado: "${newMessage}"`);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});