"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Routes_1 = require("../Routes");
var UserRoutes = /** @class */ (function (_super) {
    __extends(UserRoutes, _super);
    function UserRoutes(app, jwt, ctrl) {
        var _this = _super.call(this, app, Routes_1.RoutesList.User) || this;
        _this.jwt = jwt;
        _this.ctrl = ctrl;
        return _this;
    }
    UserRoutes.prototype.initRoutes = function () {
        var app = this.app;
        app.routes = [
            app.route(Routes_1.RoutesList.User + "/login")
                .post(this.ctrl.UserLogin),
            app.route(Routes_1.RoutesList.User + "/profile")
                .get(this.jwt.JwtRequired)
        ];
        return app;
    };
    return UserRoutes;
}(Routes_1.Routes));
exports.default = UserRoutes;
