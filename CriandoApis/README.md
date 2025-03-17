Criando APIs simples com node e Express

PADRÃO USADO

Utiliza-se o padrão API REST (Representational State Transfer) para permitir a comunicação via solicitações HTTP

Sequência Para Criar o Projeto

Inicializar confirmando tudo com yes e criar arquivo package.json
```js
npm init -y
```

Inserir dependência express em package.json e criar pasta node_modules
```js
npm i express
```

Se quiser obter a mesma versão do express de algum tutorial (exemplo para a versão 4.21.2)
```js
npm i express@4.21.2
```

Adicionando
```json
"type": "module",
```
Essa linha é para trabalharmos com padrões diferentes em códigos. Significa que o código está escrito em ECMAScript (ES) Modules.
Com isso é possível usar ````json import``` ao invés de ```json require```

Para executar o código em api.js
```js
node ./api.js
```
Ou, a mesma coisa, se o arquivo de execução estiver em root (sem estar dentro de uma pasta)
```js
node api.js
```

Alternativa para execução sem o servidor parar após modificações e sem instalar nodemon
```js
node --watch api.js
```

Nesse exemplo eu deletarei a pasta node_modules. Para criá-la após copiar esse projeto, faça:
```js
npm install
```

Para rodar:
```js
node ./api.js
```
