import ProductController from "../../Controllers/ProductController/ProductController"
import express from "express"
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";
import Routes from "../Routes";

class ProductRoutes extends Routes.Route {
    constructor(private _app: express.Application, private _jwt: JwtMiddleware.Jwt, private _productCtrl: ProductController) {
        super(_app, Routes.RoutesList.Product, _jwt, _productCtrl);
    }

    initRoutes(): express.Application {
        let app: express.Application = this._app

        this._app.routes = [
            app.route(Routes.RoutesList.Product)
                .get(this._jwt.JwtRequired, this._productCtrl.GetProducts)
                .post(this._jwt.JwtRequired, this._productCtrl.CreateProduct),
            app.route(`${Routes.RoutesList.Product}/:id`)
                .get(this._jwt.JwtRequired, this._productCtrl.GetProductsById)
                .put(this._jwt.JwtRequired, this._productCtrl.UpdateProduct)
                .delete(this._jwt.JwtRequired, this._productCtrl.DeleteProducts)
        ]
        return app;
    }
}


export default ProductRoutes