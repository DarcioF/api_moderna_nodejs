const Customers = require("../models/Customers");


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
        const { nome, sobrenome, email } = req.body;
        const customer = await Customers.create({
            nome: nome,
            sobrenome: sobrenome,
            email: email,

        });
        return res.status(201).json(customer);
    }

    // Atualiza um Customer
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

    // Exclui um Customer
    async destroy(req, res) {
        const id = parseInt(req.params.id);
        const customer = await Customers.findByPk(id);
        const status = customer ? 200 : 404;
        await customer.destroy();
        return res.status(status).json();
    }
}

module.exports = new CustomersController();