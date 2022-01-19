const Customers = require("../models/Customers");
const { Op } = require("sequelize");
const multer = require('multer');

class CustomersController {
    // Listagem dos Customers
    async index(req, res) {
        const data = await Customers.findAll();
        return res.status(200).json(data);
    }

    // Recupera um Customer
    async show(req, res) {
        const id = parseInt(req.params.id);
        const customer = await Customers.findByPk(id);
        const status = customer ? 200 : 404;
        return res.status(status).json(customer);
    }

    // Cria um novo Customer
    async create(req, res) {
        const file = req.file;
        const { nome, sobrenome, email } = req.body;
        const customer = await Customers.create({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            url_file: file? file.path: "",

        });
        return res.status(201).json(customer);
    }

    // Atualiza um Customer
    async update(req, res) {
        const file = req.file;
        const { nome, sobrenome, email } = req.body;
        const id = parseInt(req.params.id);
        const customer = await Customers.findByPk(id);
        const status = customer ? 200 : 404;

        const customer_update = await customer.update({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            url_file: file? file.path: "",
        });

        return res.status(status).json(customer_update);
    }

    // Exclui um Customer
    async destroy(req, res) {
        const id = parseInt(req.params.id);
        const customer = await Customers.findByPk(id);
        const status = customer ? 200 : 404;
        await customer.destroy();
        return res.status(status).json();
    }

    async filter(req, res) {
        try {
            const data = await Customers.findAll({
                where: {
                    [Op.or]: [
                        { nome: { [Op.iLike]: '%'+req.body.filter+'%'}},
                        { sobrenome: { [Op.iLike]: '%'+req.body.filter+'%'}},
                        { email: { [Op.iLike]: '%'+req.body.filter+'%'}}
                    ]
                }
            });
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(404).json(error);
        }

    }
}

module.exports = new CustomersController();