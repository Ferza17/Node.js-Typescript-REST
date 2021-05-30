"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = __importDefault(require("../Routes"));
class ProductRoutes extends Routes_1.default.Route {
    constructor(_app, _jwt, _productCtrl) {
        super(_app, Routes_1.default.RoutesList.Product, _jwt, _productCtrl);
        this._app = _app;
        this._jwt = _jwt;
        this._productCtrl = _productCtrl;
    }
    initRoutes() {
        let app = this._app;
        this._app.routes = [
            app.route(Routes_1.default.RoutesList.Product)
                .get(this._jwt.JwtRequired, this._productCtrl.GetProducts)
                .post(this._jwt.JwtRequired, this._productCtrl.CreateProduct),
            app.route(`${Routes_1.default.RoutesList.Product}/:id`)
                .get(this._jwt.JwtRequired, this._productCtrl.GetProductsById)
                .put(this._jwt.JwtRequired, this._productCtrl.UpdateProduct)
                .delete(this._jwt.JwtRequired, this._productCtrl.DeleteProducts)
        ];
        return app;
    }
}
exports.default = ProductRoutes;
