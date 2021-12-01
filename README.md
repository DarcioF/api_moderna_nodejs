
# API Moderna com Node js

## Iniciando uma aplicação

Para dar início a nossa aplicação, deve seguir os passos do projeto API Simples :
https://github.com/DarcioF/aplicacao_base_node

## Configurando uma estrutura de projeto moderna

Agora vamos separar nosso projeto para melhor organização, assim tornando nossa api escalável.

- Na raiz do projeto vamos adicinar uma pasta chamada "src", onde vai ficar nossos arquivos fontes do projeto.
- Logo após vamos criar 3 arquivos dentro da "src" :
  "app.js"
  "routes.js"
  "server.js"
No arquivo "app.js" vamos adicionar uma classe chamada App: 
```javascript
const express = require("express");
const routes = require("./routes");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
```
  - A função "middlewares()" é uma função que está entre um pedido HTTP e a resposta final que o servidor envia de volta para o cliente.
  - A função "routes()" é passado todo “caminho” que será “chamado” por uma aplicação ou cliente e responderá alguma informação. Cada rota pode ter uma ou mais funções, e ela deve ser única na API, ao receber uma chamada ela faz todo o processamento necessário para retornar os dados que foi solicitado.

No arquivo "server.js" vamos adicionar as seguites informações: 

```javascript
const app = require("./app");

app.listen(3000);
```
  - Basicamente estamos importando a classe App e informamos a porta.
  - Porque não colocamos direto na classe App? Simples, devemos separar a camada lógica e de servidor.  

No arquivo "routes.js" vamos adicionar as seguites informações:  

```javascript
const { Router } = require("express");
const routes = new Router();

routes.get("/hello", (req, res) => {
  return res.json({ message: "Hello" });
});

module.exports = routes;

```
E por ultimo vamos executar nossa API:

```cmd
 npx nodemon ./src/server.js
```

## Configurando uma estrutura de controllers

Nessa etapa vamos criar nossa estrutura onde ficará a parte lógica da API.

Para isso, devemos criar:

- Um novo diretório "src/app/controllers" 
- Dentro desse diretório vamos criar um arquivo "CustomersController.js"
- Vamos criar uma Classe chamada CustomersController e adicionar os metódos:index, show, create, update, destroy.

```javascript
class CustomersController {
  // Listagem dos Customers
  index(req, res) {
  
  }

  // Recupera um Customer
  show(req, res) {
  
  }

  // Cria um novo Customer
  create(req, res) {
  
  }

  // Atualiza um Customer
  update(req, res) {
   
  }

  // Exclui um Customer
  destroy(req, res) {
   
  }
}

module.exports = new CustomersController();
```

## O que é um ORM?

Mapeamento objeto-relacional é uma técnica de desenvolvimento utilizada para reduzir a impedância da programação orientada aos objetos utilizando bancos de dados relacionais.
- Simplificando é uma abstração do Banco de Dados e Tabelas tornam-se Classes.


### Instalando e utilizando o Sequelize

Vamos criar os seguintes diretórios, para organizar a estrutura da API.
- "src/config"
- "src/database/migrations"

Próxima Etapa vamos instalar o Sequelize:
```cmd
npm i sequelize
npm install --save-dev sequelize-cli
```
Logo após a instalação vamos adicionar um novo arquivo chamando na raiz do projeto ".sequelizerc".
- Nesse arquivo vamos configurar cada pasta onde o Sequelize vai precisar:
```javascript
const { resolve } = require("path");

module.exports = {
  config: resolve(__dirname, "src", "config", "database.js"),
  "models-path": resolve(__dirname, "src", "app", "models"),
  "migrations-path": resolve(__dirname, "src", "database", "migrations"),
  "seeders-path": resolve(__dirname, "src", "database", "seeds"),
};

```
Para a conexão com Banco de Dados postgres, precisamos instalar algumas dependências:

```cmd
npm i pg
npm i pg-hstore
```

Depois do processo de instalação, vamos criar um novo arquivo "database.js" dentro do diretório "src/config":
- Nesse arquivo vamos configurar os principais parâmetros de acesso ao nosso Banco de Dados;

```javascript
module.exports = {
    dialect: "postgres",
    host: "localhost",
     port: 5432,
    username: "dev",
    password: "1",
    database: "api_node",
    define: {
      timestamp: true, // cria duas colunas: createdAt e updatedAt
    },
  };
```
## Criando o model Customer

Para a criação da tabela Customer vamos abrir o terminal:

```cmd
npx sequelize-cli model:generate --name Customers --attributes nome:string,sobrenome:string,email:string
```
Se observamos no diretorio "app/models", foi criado um arquivo chamado "customers.js" e no caminho "src/database/migrations" também foi criando um novo arquivo que é nossa migrate.

Vamos subir nossa migrate para o banco de dados, com o seguinte comando:
```cmd
npx sequelize-cli db:migrate
```
## Carregando os models na Aplicação

Nesse passo vamos fazer as seguintes modificações:
- No nosso model customers 

```javascript
'use strict';
const { Sequelize, Model } = require('sequelize');

class Customers extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        sobrenome: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "Customers"
      }
    );
  }
}

module.exports = Customers;
```

- Agora vamos no caminho "src/database" e criar um arquivo chamando "index.js" 
```javascript
const { Sequelize } = require('sequelize');
const config = require("../config/database");
const Customers = require("../app/models/Customers");

const models = [Customers];

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
    }

    init() {
        models.forEach(model => model.init(this.connection));
    }
}

module.exports = new Database();
```
- E por último vamos importar nosso arquivo "index.js" no "src/app.js" 

```javascript
const database = require("./database");
```

## Última etapa da Aplicação


Antes de começar a última etapa, vamos adicioanar nossas routes para que possam ser acessadas pela url, no arquivo "src/routes.js":

```javascript
const { Router } = require("express");
const routes = new Router();
const CustomersController =  require( "./app/controllers/CustomersController");

routes.get("/customers", CustomersController.index);
routes.get("/customers/:id", CustomersController.show);
routes.post("/customers", CustomersController.create);
routes.put("/customers/:id", CustomersController.update);
routes.delete("/customers/:id", CustomersController.destroy);

module.exports = routes;
```


Vamos implementar o nosso controller de customers:
- Primeiro precisamos retornar uma lista de customers no metódo "index" no arquivo "src/app/controllers/CustomersController.js":

```javascript
  async index(req, res) {
        const data = await Customers.findAll();
        return res.status(200).json(data);
    }
```
- Agora vamos retornar apenas um Customer, para isso vamos no metódo "show":

```javascript
     async show(req, res) {
        const id = parseInt(req.params.id);
        const customer = await Customers.findByPk(id);
        const status = customer ? 200 : 404;
        return res.status(status).json(customer);
    }

```
- Criando um novo Customer, para isso vamos no metódo "create":

```javascript
     async create(req, res) {
        const { nome, sobrenome, email } = req.body;
        const customer = await Customers.create({
            nome: nome,
            sobrenome: sobrenome,
            email: email,

        });
        return res.status(201).json(customer);
    }
```
- Alterando um Customer, para isso vamos no metódo "update":

```javascript
    async update(req, res) {
        const { nome, sobrenome, email } = req.body;
        const id = parseInt(req.params.id);
        const customer = await Customers.findByPk(id);
        const status = customer ? 200 : 404;

        const customer_update = await customer.update({
            nome: nome,
            sobrenome: sobrenome,
            email: email,

        });

        return res.status(status).json(customer_update);
    }
```

- Deletando um Customer, para isso vamos no metódo "update":

```javascript
   async destroy(req, res) {
        const id = parseInt(req.params.id);
        const customer = await Customers.findByPk(id);
        const status = customer ? 200 : 404;
        await customer.destroy();
        return res.status(status).json();
    }
```
- Pronto, finalizamos nossa API ...

Documentação do sequelize query disponível :https://sequelize.org/v3/docs/querying/
Documentação do postgres :https://www.postgresql.org/download/