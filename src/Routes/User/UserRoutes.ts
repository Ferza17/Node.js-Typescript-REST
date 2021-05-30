import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";
import Routes from "../Routes";
import UserController from "../../Controllers/UserController/UserController";
import express from "express";

class UserRoutes extends Routes.Route {
    constructor(app: express.Application, private jwt: JwtMiddleware.Jwt, private ctrl: UserController) {
        super(app, Routes.RoutesList.User);
    }

    initRoutes(): express.Application {
        let app: express.Application = this.app
        app.routes = [
            app.route(`${Routes.RoutesList.User}/login`)
                .post(this.ctrl.UserLogin),
            app.route(`${Routes.RoutesList.User}/profile`)
                .get(this.jwt.JwtRequired, this.ctrl.UserProfile),
        ]
        return app
    }
}

export default UserRoutes