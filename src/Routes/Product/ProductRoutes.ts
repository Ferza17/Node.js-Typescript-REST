import ProductController from "../../Controllers/ProductController/ProductController"
import express from "express"
import {Routes} from "../Routes";
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";

const ProductsRoute: string = "/Products"

class ProductRoutes extends Routes {
    constructor(app: express.Application, private jwt: JwtMiddleware, private productCtrl: ProductController) {
        super(app, jwt, ProductsRoute);
    }

    initRoutes(): express.Application {
        this.app.route(ProductsRoute)
            .get(this.jwt.JwtRequired, this.productCtrl.GetProducts)
        return this.app;
    }
}

export default ProductRoutes