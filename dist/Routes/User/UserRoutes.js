"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRoutes {
    constructor(jwt, router) {
        this.jwt = jwt;
        this.router = router;
    }
    GetProductRoutes() {
        console.log("User Routes");
        // this.middleware.jwt.JwtRequired()
    }
}
exports.default = UserRoutes;
