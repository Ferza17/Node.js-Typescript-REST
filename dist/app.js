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
const body_parser_1 = require("body-parser");
const http = __importStar(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const ResponseUtils_1 = require("./Utils/Response/ResponseUtils");
const env_config_1 = __importDefault(require("./Utils/Env/env.config"));
const JwtMiddleware_1 = __importDefault(require("./Middleware/JWT/JwtMiddleware"));
const MongoDB_1 = require("./Repository/MongoDB/MongoDB");
const ProductRoutes_1 = __importDefault(require("./Routes/Product/ProductRoutes"));
const ProductsServices_1 = require("./Services/Products/ProductsServices");
const ProductController_1 = __importDefault(require("./Controllers/ProductController/ProductController"));
const app = express_1.default();
const server = http.createServer(app);
app.use(body_parser_1.json());
//Bootstrapping
const jwtMiddleware = new JwtMiddleware_1.default();
const mongoDBRepository = new MongoDB_1.MongoDB(mongoose_1.default);
//Products
const productService = new ProductsServices_1.ProductsService(mongoDBRepository);
const productController = new ProductController_1.default(productService);
const productRoutes = new ProductRoutes_1.default(app, jwtMiddleware, productController);
// Users
// const userService = new UserService(mongoDBRepository)
productRoutes.initRoutes();
app.use("/ping", (req, res, next) => {
    let data = {
        Code: 200,
        Message: "Pong",
        Data: null
    };
    return ResponseUtils_1.ResponseJSON(req, res, data);
});
server.listen(env_config_1.default.APP_PORT, () => {
    mongoDBRepository.GetConnection();
    console.log("Server running on PORT : ", env_config_1.default.APP_PORT);
});
