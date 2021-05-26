"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = require("../Routes");
class ProductRoutes extends Routes_1.Routes {
    constructor(app, jwt, productCtrl) {
        super(app, Routes_1.RoutesList.Product);
        this.jwt = jwt;
        this.productCtrl = productCtrl;
    }
    initRoutes() {
        this.app.routes = [
            this.app.route(Routes_1.RoutesList.Product)
                .get(this.jwt.JwtRequired, this.productCtrl.GetProducts)
                .post(this.jwt.JwtRequired, this.productCtrl.CreateProduct),
            this.app.route(Routes_1.RoutesList.Product + "/:id")
                .get(this.jwt.JwtRequired, this.productCtrl.GetProductsById)
                .put(this.jwt.JwtRequired, this.productCtrl.UpdateProduct)
                .delete(this.jwt.JwtRequired, this.productCtrl.DeleteProducts)
        ];
        return this.app;
    }
}
exports.default = ProductRoutes;
