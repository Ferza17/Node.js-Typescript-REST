"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const JwtMiddleware_1 = __importDefault(require("../../Middleware/JWT/JwtMiddleware"));
const MongoDB_1 = __importDefault(require("../../Repository/MongoDB/MongoDB"));
const mongoose_1 = __importDefault(require("mongoose"));
const ProductsServices_1 = __importDefault(require("../../Services/Products/ProductsServices"));
const ProductController_1 = __importDefault(require("../../Controllers/ProductController/ProductController"));
const ProductRoutes_1 = __importDefault(require("../../Routes/Product/ProductRoutes"));
const UsersServices_1 = __importDefault(require("../../Services/Users/UsersServices"));
const UserController_1 = __importDefault(require("../../Controllers/UserController/UserController"));
const UserRoutes_1 = __importDefault(require("../../Routes/User/UserRoutes"));
const elasticsearch_1 = require("@elastic/elasticsearch");
const env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
const Elasticsearch_1 = __importDefault(require("../../Repository/ElasticSearch/Elasticsearch"));
const Bootstrap = (app) => {
    app.use(body_parser_1.json());
    let Routes = [];
    const client = new elasticsearch_1.Client({
        node: env_config_1.default.ELASTIC_URL
    });
    /**.
     * ======== Bootstrapping ===========
     */
    const jwtMiddleware = new JwtMiddleware_1.default.Jwt();
    //Repository
    const mongoDBRepository = new MongoDB_1.default(mongoose_1.default);
    const elasticSearchRepository = new Elasticsearch_1.default(client);
    // mongoDBRepository.TestConnection().then(res => {
    //     console.log("MongoDB >> ", res)
    // }).catch(err => {
    //     console.log(err)
    // })
    // elasticSearchRepository.TestConnection().then(res => {
    //     console.log("Elasticsearch >> ", res)
    // }).catch(err => {
    //     console.log(err)
    // })
    //Products Initialize
    const productService = new ProductsServices_1.default(mongoDBRepository, elasticSearchRepository, jwtMiddleware);
    const productController = new ProductController_1.default(productService);
    const productRoutes = new ProductRoutes_1.default(app, jwtMiddleware, productController);
    Routes.push(productRoutes);
    //Users Initialize
    const userService = new UsersServices_1.default(mongoDBRepository, jwtMiddleware);
    const userController = new UserController_1.default(userService, jwtMiddleware);
    const userRoutes = new UserRoutes_1.default(app, jwtMiddleware, userController);
    Routes.push(userRoutes);
    /**.
     * ======== End Bootstrapping ===========
     */
    return Routes;
};
exports.default = Bootstrap;
