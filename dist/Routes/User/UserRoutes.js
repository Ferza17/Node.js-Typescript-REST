"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = __importDefault(require("../Routes"));
class UserRoutes extends Routes_1.default.Route {
    constructor(app, jwt, ctrl) {
        super(app, Routes_1.default.RoutesList.User);
        this.jwt = jwt;
        this.ctrl = ctrl;
    }
    initRoutes() {
        let app = this.app;
        app.routes = [
            app.route(`${Routes_1.default.RoutesList.User}/login`)
                .post(this.ctrl.UserLogin),
            app.route(`${Routes_1.default.RoutesList.User}/profile`)
                .get(this.jwt.JwtRequired, this.ctrl.UserProfile),
        ];
        return app;
    }
}
exports.default = UserRoutes;
