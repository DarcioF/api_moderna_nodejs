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