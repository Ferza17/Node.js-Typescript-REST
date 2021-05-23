import ProductController from "../../Controllers/ProductController/ProductController"
import express from "express"
import {Routes, RoutesList} from "../Routes";
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";


class ProductRoutes extends Routes {
    constructor(app: express.Application, private jwt: JwtMiddleware, private productCtrl: ProductController) {
        super(app, jwt, RoutesList.Product);
    }

    initRoutes(): express.Application {
        this.app.routes = [
            this.app.route(RoutesList.Product)
                .post(this.jwt.JwtRequired, this.productCtrl.CreateProduct)
                .get(this.jwt.JwtRequired, this.productCtrl.GetProducts),
            this.app.route(RoutesList.Product + "/:id")
                .get(this.jwt.JwtRequired, this.productCtrl.GetProductsById)
                .put(this.jwt.JwtRequired, this.productCtrl.UpdateProduct)
                .delete(this.jwt.JwtRequired, this.productCtrl.DeleteProducts)
        ]
        return this.app;
    }
}

export default ProductRoutes