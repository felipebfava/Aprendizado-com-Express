//Sistema de compras de mercado (lista de compras) com métodos de adicionar, remover e editar as compras
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const clients = [];
// Array com todos os alunos da turma
let presentStudents = [
  { name: 'Bruno', present: false },
  { name: 'Fabricio', present: false },
  { name: 'Lucas', present: false },
  { name: 'Rafael', present: false },
  { name: 'Ricardo', present: false },
  { name: 'Thiago', present: false },
  { name: 'Victor', present: false },
  { name: 'Vinicius', present: false },
  { name: 'Vitor', present: false },
  { name: 'Wesley', present: false },
  { name: 'Yuri', present: false },
];

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  clients.push(res);

  req.on('close', () => {
    clients.splice(clients.indexOf(res), 1);
  });
});

app.get('/students', (req, res) => {
  res.json({ students: presentStudents.sort((a, b) => a.name.localeCompare(b.name))});
});

app.post('/markAttendance', (req, res) => {
  const { name, present } = req.body;
  if (name && present !== undefined) {
    markAttendance({ name, present});

    res.sendStatus(200, 'Attendance marked');
  } else {
    res.sendStatus(400, 'Invalid request');
  }
});

function markAttendance(student) {
  const { name, present } = student;
  const studentIndex = presentStudents.findIndex(s => s.name === name);
  if (studentIndex !== -1) {
    presentStudents[studentIndex].present = present === 'true' ? true : false;
    console.log(presentStudents[studentIndex]);
    broadcastAttendance();
  } else {
    console.log('Student not found');
  }
}

function broadcastAttendance() {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify({ presentStudents })}\n\n`);
  });
}

app.post('/reset', (req, res) => {
  presentStudents = presentStudents.map(s => ({ ...s, present: false }));
  broadcastAttendance();
  res.sendStatus(200);
});

// adicionando ip geral com 0.0.0.0 
// significa que posso acessar a aplicação em qualquer outro dispositivo
// desde que o firewall não bloqueie o acesso

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${port}`);
});
