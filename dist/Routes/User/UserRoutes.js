"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = require("../Routes");
class UserRoutes extends Routes_1.Routes {
    constructor(app, jwt, ctrl) {
        super(app, Routes_1.RoutesList.User);
        this.jwt = jwt;
        this.ctrl = ctrl;
    }
    initRoutes() {
        let app = this.app;
        app.routes = [
            app.route(`${Routes_1.RoutesList.User}/login`)
                .post(this.ctrl.UserLogin),
            app.route(`${Routes_1.RoutesList.User}/profile`)
                .get(this.jwt.JwtRequired)
        ];
        return app;
    }
}
exports.default = UserRoutes;
