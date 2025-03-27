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

// Adicionando novos botões
// Atualiza a exibição dos pedidos com botões
function updateOrderList(orders) {
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = ""; // Limpa a lista antes de atualizar

  if (orders.length === 0) {
    orderList.innerHTML = "<li>Aguardando pedidos...</li>";
    return;
  }

  orders.forEach((order, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${order}
      <div>
        <button class="order-btn edit-btn" onclick="editOrder(${index})">✏️ Editar</button>
        <button class="order-btn delete-btn" onclick="deleteOrder(${index})">🗑️ Excluir</button>
      </div>
    `;
    orderList.appendChild(li);
  });
}

// Função para excluir um pedido
async function deleteOrder(index) {
  try {
    await fetch(`/polling/delete/${index}`, { method: "DELETE" });
    console.log(`[Polling] Pedido removido: ${index}`);
  } catch (error) {
    console.error("[Polling] Erro ao excluir pedido:", error);
  }
}

// Função para editar um pedido
async function editOrder(index) {
  const newOrder = prompt("Digite o novo pedido:");
  if (!newOrder) return;

  try {
    await fetch(`/polling/update/${index}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newOrder }),
    });
    console.log(`[Polling] Pedido atualizado: ${newOrder}`);
  } catch (error) {
    console.error("[Polling] Erro ao editar pedido:", error);
  }
}

// Atualiza a lista periodicamente
setInterval(async () => {
  try {
    const response = await fetch("/polling");
    const data = await response.json();
    if (data.orders) updateOrderList(data.orders);
  } catch (error) {
    console.error("[Polling] Erro ao buscar pedidos:", error);
  }
}, 2000);
