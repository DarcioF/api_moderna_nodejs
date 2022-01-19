const express = require("express");
const routes = require("./routes");
const database = require("./database");
const cors = require('cors');
const bodyParser = require('body-parser');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({extended: true}));
    this.server.use('/uploads', express.static('uploads'));
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
