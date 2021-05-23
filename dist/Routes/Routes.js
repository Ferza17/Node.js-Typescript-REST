"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
class Routes {
    constructor(app, jwt, name) {
        this.app = app;
        this.name = name;
        this.getName = () => {
            return this.name;
        };
    }
}
exports.Routes = Routes;
