"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("../Utils/Env/env.config"));
var Routes;
(function (Routes) {
    class Route {
        constructor(_app, _name, _jwt, _controller) {
            this._name = _name;
            this.GetRoute = () => {
                return this._name;
            };
        }
    }
    Routes.Route = Route;
    Routes.RoutesList = {
        Product: `/api/${env_config_1.default.VERSION_API}/products`,
        User: `/api/${env_config_1.default.VERSION_API}/users`
    };
})(Routes || (Routes = {}));
exports.default = Routes;
