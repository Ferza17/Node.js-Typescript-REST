"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var express_1 = __importDefault(require("express"));
var ResponseUtils_1 = require("../../Utils/Response/ResponseUtils");
var env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
var Bootstrap_1 = __importDefault(require("./Bootstrap"));
var app = express_1.default();
var server = http.createServer(app);
/**.
 * ======== Initialize Routes ===========
 */
var ListRoutes = Bootstrap_1.default(app);
ListRoutes.forEach(function (route) {
    console.log(route.GetRoute());
    route.initRoutes();
});
app.use("/ping", function (req, res) {
    var data = {
        Code: 200,
        Message: "Pong",
        Data: null
    };
    ResponseUtils_1.ResponseJSON(req, res, data);
    return;
});
/**.
 * ======== End Initialize Routes ===========
 */
server.listen(env_config_1.default.APP_PORT, function () {
    console.log("Server running on PORT : ", env_config_1.default.APP_PORT);
});
