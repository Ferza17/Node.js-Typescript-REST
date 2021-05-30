"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = __importDefault(require("../Routes"));
class ProductRoutes extends Routes_1.default.Route {
    constructor(app, jwt, productCtrl) {
        super(app, Routes_1.default.RoutesList.Product);
        this.jwt = jwt;
        this.productCtrl = productCtrl;
    }
    initRoutes() {
        this.app.routes = [
            this.app.route(Routes_1.default.RoutesList.Product)
                .get(this.jwt.JwtRequired, this.productCtrl.GetProducts)
                .post(this.jwt.JwtRequired, this.productCtrl.CreateProduct),
            this.app.route(Routes_1.default.RoutesList.Product + "/:id")
                .get(this.jwt.JwtRequired, this.productCtrl.GetProductsById)
                .put(this.jwt.JwtRequired, this.productCtrl.UpdateProduct)
                .delete(this.jwt.JwtRequired, this.productCtrl.DeleteProducts)
        ];
        return this.app;
    }
}
exports.default = ProductRoutes;
