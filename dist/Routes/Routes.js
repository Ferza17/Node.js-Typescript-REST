"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesList = exports.Routes = void 0;
var RoutesList;
(function (RoutesList) {
    RoutesList["Product"] = "/products";
    RoutesList["User"] = "/users";
})(RoutesList || (RoutesList = {}));
exports.RoutesList = RoutesList;
class Routes {
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.GetRoute = () => {
            return this.name;
        };
    }
}
exports.Routes = Routes;
