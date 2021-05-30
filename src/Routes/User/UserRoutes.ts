import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";
import Routes from "../Routes";
import UserController from "../../Controllers/UserController/UserController";
import express from "express";

class UserRoutes extends Routes.Route {
    constructor(private _app: express.Application, private _jwt: JwtMiddleware.Jwt, private _ctrl: UserController) {
        super(_app, Routes.RoutesList.User, _jwt, _ctrl);
    }

    initRoutes(): express.Application {
        let app: express.Application = this._app
        app.routes = [
            app.route(`${Routes.RoutesList.User}/login`)
                .post(this._ctrl.UserLogin),
            app.route(`${Routes.RoutesList.User}/profile`)
                .get(this._jwt.JwtRequired, this._ctrl.UserProfile),
        ]
        return app
    }
}

export default UserRoutes