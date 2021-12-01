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

