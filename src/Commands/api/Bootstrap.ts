import express from "express";
import {json} from "body-parser";
import {JwtMiddleware} from "../../Middleware/JWT/JwtMiddleware";
import {MongoDB} from "../../Repository/MongoDB/MongoDB";
import mongoose from "mongoose";
import ProductsService from "../../Services/Products/ProductsServices";
import ProductController from "../../Controllers/ProductController/ProductController";
import ProductRoutes from "../../Routes/Product/ProductRoutes";
import {UsersServices} from "../../Services/Users/UsersServices";
import UserController from "../../Controllers/UserController/UserController";
import UserRoutes from "../../Routes/User/UserRoutes";
import {Routes} from "../../Routes/Routes";
import {Client} from "@elastic/elasticsearch";
import Env from "../../Utils/Env/env.config";
import Elasticsearch from "../../Repository/ElasticSearch/Elasticsearch";


const Bootstrap = (app: express.Application): Array<Routes> => {
    app.use(json())
    let Routes: Array<Routes> = []
    const client = new Client({
        node: Env.ELASTIC_URL
    })
    /**.
     * ======== Bootstrapping ===========
     */
    const jwtMiddleware = new JwtMiddleware()

    //Repository
    const mongoDBRepository = new MongoDB(mongoose)
    const elasticSearchRepository = new Elasticsearch(client)

    // mongoDBRepository.TestConnection().then(res => {
    //     console.log("MongoDB >> ", res)
    // }).catch(err => {
    //     console.log(err)
    // })
    // elasticSearchRepository.TestConnection().then(res => {
    //     console.log("Elasticsearch >> ", res)
    // }).catch(err => {
    //     console.log(err)
    // })

    //Products Initialize
    const productService = new ProductsService(mongoDBRepository, elasticSearchRepository, jwtMiddleware)
    const productController = new ProductController(productService)
    const productRoutes = new ProductRoutes(app, jwtMiddleware, productController)
    Routes.push(productRoutes)

    //Users Initialize
    const userService = new UsersServices(mongoDBRepository, jwtMiddleware)
    const userController = new UserController(userService)
    const userRoutes = new UserRoutes(app, jwtMiddleware, userController)
    Routes.push(userRoutes)
    /**.
     * ======== End Bootstrapping ===========
     */

    return Routes
}


export default Bootstrap