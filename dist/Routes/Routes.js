"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Routes;
(function (Routes) {
    class Route {
        constructor(app, name) {
            this.app = app;
            this.name = name;
            this.GetRoute = () => {
                return this.name;
            };
        }
    }
    Routes.Route = Route;
    let RoutesList;
    (function (RoutesList) {
        RoutesList["Product"] = "/products";
        RoutesList["User"] = "/users";
    })(RoutesList = Routes.RoutesList || (Routes.RoutesList = {}));
})(Routes || (Routes = {}));
exports.default = Routes;
