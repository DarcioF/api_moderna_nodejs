const { Router } = require("express");
const routes = new Router();
const CustomersController =  require( "./app/controllers/CustomersController");

routes.get("/customers", CustomersController.index);
routes.get("/customers/:id", CustomersController.show);
routes.post("/customers", CustomersController.create);
routes.put("/customers/:id", CustomersController.update);
routes.delete("/customers/:id", CustomersController.destroy);

module.exports = routes;
