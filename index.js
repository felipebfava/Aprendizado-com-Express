//incluir bibliotecas
const express = require('express');

//podemos usar uma biblioteca para ficar restartando o servidor toda vez que fizermos uma modificação

//chamar a função express
const app = express();

//req - requisição /request (ex: dados de formulário)
//res - resposta /response
// criar a rota do tipo GET direcionado a raiz do projeto
app.get('/', function(req, res) {
    //retornar frase
    res.send('Página inicial do site');
});


app.get('/sobre-empresa', (req, res) => {
    //retornar frase
    res.send('Página sobre a empresa do site');
});

app.get('/contato', (req, res) => {
    //retornar frase
    res.send('Página de contato do site');
});


// porta 8080 é padrão para HTTP
// porta 443 é padrão para HTTPS
// HTTPS é uma versão com certificado segura do protocolo HTTP
// certificado pode ser autoassinado (grátis, você gera, não é seguro) ou
// assinados por uma autoridade de certificação (CA) (pago, é seguro) 
// porta que irá 'escutar' no meu localhost
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
//utilizando arrow function
//ctrl + c para parar