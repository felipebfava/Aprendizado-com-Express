// 4.Notificações de Novos Pedidos em um Restaurante usando HTTP Polling

let pollingInterval;
let longPollingActive = false;
let ws;

// Polling: verifica mensagens enviadas por qualquer cliente
(function startPolling() {
  pollingInterval = setInterval(async () => {
    try {
      const response = await fetch("/polling");
      const data = await response.json();
      if (data.pedidos.length > 0) {
        const messagesDiv = document.getElementById("polling-messages");
        messagesDiv.innerHTML = "<ul>" + data.pedidos.map(pedido => `<li>${pedido}</li>`).join("") + "</ul>";
        console.log(`[Polling] Pedidos recebidos:`, data.pedidos);
      }
    } catch (error) {
      console.error("[Polling] Erro ao buscar pedidos:", error);
    }
  }, 2000);
  console.log("Polling iniciado automaticamente.");
})();

async function sendPollingMessage() {
  const input = document.getElementById("polling-input");
  const message = input.value.trim();
  if (!message) return;
  input.value = "";
  try {
    await fetch("/polling/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    document.getElementById("polling-messages").innerText = message; // Atualiza localmente
    console.log(`[Polling] Mensagem enviada: "${message}"`);
  } catch (error) {
    console.error("[Polling] Erro ao enviar mensagem:", error);
  }
}