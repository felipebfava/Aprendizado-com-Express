// se não tiver nodemon instalado, lembre de sempre parar o servidor após fazer uma modificação
//ou utilize na execução node --watch api.js

import express from 'express'; //importando um módulo do express com "type": "module"

const app = express();
const PORT = 3000; //indica a porta que iremos usar como uma variável global
//const objResponse = { name: 'João', empresa: 'televisão' }; //um só objeto


const arrResponse = [
    { name: 'João', empresa: 'televisão' },
    { name: 'Caroline', empresa: 'radialista' }
]; //um array de objetos - lista

//Método GET
app.get('/', (req, res) => {
    res.json(arrResponse); //exibe no formato json
});

//Pode ser assim
app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`); //colocado com acento grave (a com crase - à) -> `
});

// ou assim
// app.listen(PORT, () => {console.log(`O servidor está rodando na porta ${PORT}`)});
