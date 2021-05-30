"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = __importDefault(require("../Routes"));
class UserRoutes extends Routes_1.default.Route {
    constructor(_app, _jwt, _ctrl) {
        super(_app, Routes_1.default.RoutesList.User, _jwt, _ctrl);
        this._app = _app;
        this._jwt = _jwt;
        this._ctrl = _ctrl;
    }
    initRoutes() {
        let app = this._app;
        app.routes = [
            app.route(`${Routes_1.default.RoutesList.User}/login`)
                .post(this._ctrl.UserLogin),
            app.route(`${Routes_1.default.RoutesList.User}/profile`)
                .get(this._jwt.JwtRequired, this._ctrl.UserProfile),
        ];
        return app;
    }
}
exports.default = UserRoutes;
