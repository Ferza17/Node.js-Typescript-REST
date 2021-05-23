"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = require("../Routes");
const ProductsRoute = "/Products";
class ProductRoutes extends Routes_1.Routes {
    constructor(app, jwt, productCtrl) {
        super(app, jwt, ProductsRoute);
        this.jwt = jwt;
        this.productCtrl = productCtrl;
    }
    initRoutes() {
        this.app.route(ProductsRoute)
            .get(this.jwt.JwtRequired, this.productCtrl.GetProducts);
        return this.app;
    }
}
exports.default = ProductRoutes;
