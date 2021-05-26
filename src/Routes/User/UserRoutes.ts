import {JwtMiddleware} from "../../Middleware/JWT/JwtMiddleware";
import {Routes, RoutesList} from "../Routes";
import UserController from "../../Controllers/UserController/UserController";
import express from "express";

class UserRoutes extends Routes {
    constructor(app: express.Application, private jwt: JwtMiddleware, private ctrl: UserController) {
        super(app, RoutesList.User);
    }

    initRoutes(): express.Application {
        let app: express.Application = this.app
        app.routes = [
            app.route(`${RoutesList.User}/login`)
                .post(this.ctrl.UserLogin),
            app.route(`${RoutesList.User}/profile`)
                .get(this.jwt.JwtRequired)
        ]
        return app
    }
}

export default UserRoutes