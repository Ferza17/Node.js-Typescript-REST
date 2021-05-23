"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Middleware_1 = require("../Middleware");
class JwtMiddleware extends Middleware_1.Middleware {
    constructor() {
        super();
    }
    JwtRequired(req, res, next) {
        console.log("JWT Required");
        next();
    }
}
exports.default = JwtMiddleware;
