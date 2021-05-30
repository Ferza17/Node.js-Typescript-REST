import * as http from "http";
import express, {Request, Response} from 'express';
import ResponseUtil from "../../Utils/Response/ResponseUtils";
import env from "../../Utils/Env/env.config"
import Routes from "../../Routes/Routes";
import Bootstrap from "./Bootstrap";


const app: express.Application = express()
const server: http.Server = http.createServer(app)

/**.
 * ======== Initialize Routes ===========
 */
const ListRoutes: Array<Routes.Route> = Bootstrap(app)
ListRoutes.forEach(route => {
    console.log(route.GetRoute())
    route.initRoutes()
})
app.use("/ping", (req: Request, res: Response) => {
    ResponseUtil.ResponseJSON(req, res, {
        Code: 200,
        Message: "Pong",
        Data: null
    })
    return
})

/**.
 * ======== End Initialize Routes ===========
 */

server.listen(env.APP_PORT, () => {
    console.log("Server running on PORT : ", env.APP_PORT)
})