import express from "express";
import JwtMiddleware from "../Middleware/JWT/JwtMiddleware";
import Controller from "../Controllers/Controller";
import env from "../Utils/Env/env.config"

namespace Routes {
    export abstract class Route {

        protected constructor(_app: express.Application, private _name: string, _jwt: JwtMiddleware.Jwt, _controller: Controller) {
        }

        GetRoute = (): string => {
            return this._name
        }

        abstract initRoutes(): express.Application
    }

    export const RoutesList =  {
        Product : `/api/${env.VERSION_API}/products`,
        User : `/api/${env.VERSION_API}/users`
    }
}


export default Routes