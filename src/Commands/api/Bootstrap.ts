import Express from "express";
import mongoose from "mongoose";
import {json} from "body-parser";
import {Client} from "@elastic/elasticsearch";
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware"
import Routes from "../../Routes/Routes";
import ProductRoutes from "../../Routes/Product/ProductRoutes";
import UserRoutes from "../../Routes/User/UserRoutes";
import ProductController from "../../Controllers/ProductController/ProductController";
import UserController from "../../Controllers/UserController/UserController";
import ProductsService from "../../Services/Products/ProductsServices";
import UsersServices from "../../Services/Users/UsersServices";
import Repositories from "../../Repositories/Repository";
import MongoDB from "../../Repositories/MongoDB/MongoDB";
import Elasticsearch from "../../Repositories/ElasticSearch/Elasticsearch";
import ResponseUtil from "../../Utils/Response/ResponseUtils";
import Env from "../../Utils/Env/env.config";


const Bootstrap = (app: Express.Application): void => {
    app.use(json())
    let Routes: Array<Routes.Route> = []
    let Repos: Array<Repositories.Repository> = []
    const client = new Client({
        node: Env.ELASTIC_URL
    })
    /**.
     * ======== Bootstrapping ===========
     */
    const jwtMiddleware = new JwtMiddleware.Jwt()

    //Repositories
    const mongoDBRepository = new MongoDB(mongoose)
    Repos.push(mongoDBRepository)
    const elasticSearchRepository = new Elasticsearch(client)
    Repos.push(elasticSearchRepository)

    //Products Initialize
    const productService = new ProductsService(mongoDBRepository, elasticSearchRepository, jwtMiddleware)
    const productController = new ProductController(productService)
    const productRoutes = new ProductRoutes(app, jwtMiddleware, productController)
    Routes.push(productRoutes)

    //Users Initialize
    const userService = new UsersServices(mongoDBRepository, jwtMiddleware)
    const userController = new UserController(userService, jwtMiddleware)
    const userRoutes = new UserRoutes(app, jwtMiddleware, userController)
    Routes.push(userRoutes)
    /**.
     * ======== End Bootstrapping ===========
     */

    // List Repository
    console.log("=============== Repository ===============")
    Repos.forEach(repo => {
        console.debug("Repository : ", repo.GetRepoName())
    })

    // Initialize All Routes
    console.log("=============== Routes ===================")
    Routes.forEach(route => {
        console.debug("Route : ", route.GetRoute())
        route.initRoutes()
    })
    app.use("/ping", (req: Express.Request, res: Express.Response) => {
        ResponseUtil.ResponseJSON(req, res, {
            Code: 200,
            Message: "Pong",
            Data: null
        })
        return
    })
}


export default Bootstrap