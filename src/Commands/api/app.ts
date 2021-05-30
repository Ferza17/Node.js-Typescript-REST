import * as http from "http";
import express from 'express';
import env from "../../Utils/Env/env.config"
import Bootstrap from "./Bootstrap";


const app: express.Application = express()
const server: http.Server = http.createServer(app)

// Bootstrapping Apps
Bootstrap(app)

server.listen(env.APP_PORT, () => {
    console.log("Server running on PORT : ", env.APP_PORT)
})