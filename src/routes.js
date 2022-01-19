const { Router } = require("express");
const routes = new Router();
const CustomersController = require("./app/controllers/CustomersController");
const upload = require("./app/Util/UtilFile");

routes.get("/customers", CustomersController.index);
routes.get("/customers/:id", CustomersController.show);
routes.post("/customers", upload.single('dataFile'), CustomersController.create);
routes.put("/customers/:id", upload.single('dataFile'), CustomersController.update);
routes.delete("/customers/:id", CustomersController.destroy);
routes.post("/customers/filter/", CustomersController.filter);

module.exports = routes;
