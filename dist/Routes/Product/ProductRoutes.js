"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Routes_1 = require("../Routes");
var ProductRoutes = /** @class */ (function (_super) {
    __extends(ProductRoutes, _super);
    function ProductRoutes(app, jwt, productCtrl) {
        var _this = _super.call(this, app, Routes_1.RoutesList.Product) || this;
        _this.jwt = jwt;
        _this.productCtrl = productCtrl;
        return _this;
    }
    ProductRoutes.prototype.initRoutes = function () {
        this.app.routes = [
            this.app.route(Routes_1.RoutesList.Product)
                .post(this.jwt.JwtRequired, this.productCtrl.CreateProduct)
                .get(this.jwt.JwtRequired, this.productCtrl.GetProducts),
            this.app.route(Routes_1.RoutesList.Product + "/:id")
                .get(this.jwt.JwtRequired, this.productCtrl.GetProductsById)
                .put(this.jwt.JwtRequired, this.productCtrl.UpdateProduct)
                .delete(this.jwt.JwtRequired, this.productCtrl.DeleteProducts)
        ];
        return this.app;
    };
    return ProductRoutes;
}(Routes_1.Routes));
exports.default = ProductRoutes;
