import {json} from 'body-parser'
import * as http from "http";
import mongoose from "mongoose"
import express, {Request, Response} from 'express';
import {ResponseJSON} from "./Utils/Response/ResponseUtils";
import env from "./Utils/Env/env.config"
import {JwtMiddleware} from "./Middleware/JWT/JwtMiddleware";
import {MongoDB} from "./Repository/MongoDB/MongoDB";
import ProductRoutes from "./Routes/Product/ProductRoutes"
import {ProductsService} from "./Services/Products/ProductsServices";
import ProductController from "./Controllers/ProductController/ProductController";
import {UsersServices} from "./Services/Users/UsersServices";
import UserController from "./Controllers/UserController/UserController";
import UserRoutes from "./Routes/User/UserRoutes";


const app: express.Application = express()
const server: http.Server = http.createServer(app)
app.use(json())

/**.
 * ======== Bootstrapping ===========
 */
const jwtMiddleware = new JwtMiddleware()
const mongoDBRepository = new MongoDB(mongoose)

//Products
const productService = new ProductsService(mongoDBRepository)
const productController = new ProductController(productService)
const productRoutes = new ProductRoutes(app, jwtMiddleware, productController)

const userService = new UsersServices(mongoDBRepository, jwtMiddleware)
const userController = new UserController(userService)
const userRoutes = new UserRoutes(app, jwtMiddleware, userController)

// Users
// const userService = new UserService(mongoDBRepository)

/**.
 * ======== End Bootstrapping ===========
 */

/**.
 * ======== Initialize Routes ===========
 */
productRoutes.initRoutes()
userRoutes.initRoutes()
app.use("/ping", (req: Request, res: Response) => {
    let data: ResponseJSON = {
        Code: 200,
        Message: "Pong",
        Data: null
    }
    return ResponseJSON(req, res, data)
})

/**.
 * ======== End Initialize Routes ===========
 */

server.listen(env.APP_PORT, () => {
    console.log("Server running on PORT : ", env.APP_PORT)
})