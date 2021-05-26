"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesList = exports.Routes = void 0;
var RoutesList;
(function (RoutesList) {
    RoutesList["Product"] = "/products";
    RoutesList["User"] = "/users";
})(RoutesList || (RoutesList = {}));
exports.RoutesList = RoutesList;
var Routes = /** @class */ (function () {
    function Routes(app, name) {
        var _this = this;
        this.app = app;
        this.name = name;
        this.GetRoute = function () {
            return _this.name;
        };
    }
    return Routes;
}());
exports.Routes = Routes;
