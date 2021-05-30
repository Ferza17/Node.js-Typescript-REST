import ProductController from "../../Controllers/ProductController/ProductController"
import express from "express"
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";
import Routes from "../Routes";


class ProductRoutes extends Routes.Route {
    constructor(app: express.Application, private jwt: JwtMiddleware.Jwt, private productCtrl: ProductController) {
        super(app, Routes.RoutesList.Product);
    }

    initRoutes(): express.Application {
        this.app.routes = [
            this.app.route(Routes.RoutesList.Product)
                .get(this.jwt.JwtRequired, this.productCtrl.GetProducts)
                .post(this.jwt.JwtRequired, this.productCtrl.CreateProduct),
            this.app.route(Routes.RoutesList.Product + "/:id")
                .get(this.jwt.JwtRequired, this.productCtrl.GetProductsById)
                .put(this.jwt.JwtRequired, this.productCtrl.UpdateProduct)
                .delete(this.jwt.JwtRequired, this.productCtrl.DeleteProducts)
        ]
        return this.app;
    }
}

export default ProductRoutes