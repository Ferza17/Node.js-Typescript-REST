"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = require("body-parser");
var JwtMiddleware_1 = require("../../Middleware/JWT/JwtMiddleware");
var MongoDB_1 = require("../../Repository/MongoDB/MongoDB");
var mongoose_1 = __importDefault(require("mongoose"));
var ProductsServices_1 = require("../../Services/Products/ProductsServices");
var ProductController_1 = __importDefault(require("../../Controllers/ProductController/ProductController"));
var ProductRoutes_1 = __importDefault(require("../../Routes/Product/ProductRoutes"));
var UsersServices_1 = require("../../Services/Users/UsersServices");
var UserController_1 = __importDefault(require("../../Controllers/UserController/UserController"));
var UserRoutes_1 = __importDefault(require("../../Routes/User/UserRoutes"));
var elasticsearch_1 = require("@elastic/elasticsearch");
var env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
var Elasticsearch_1 = __importDefault(require("../../Repository/ElasticSearch/Elasticsearch"));
var Bootstrap = function (app) {
    app.use(body_parser_1.json());
    var Routes = [];
    var client = new elasticsearch_1.Client({
        node: env_config_1.default.ELASTIC_URL
    });
    /**.
     * ======== Bootstrapping ===========
     */
    var jwtMiddleware = new JwtMiddleware_1.JwtMiddleware();
    //Repository
    var mongoDBRepository = new MongoDB_1.MongoDB(mongoose_1.default);
    var elasticSearchRepository = new Elasticsearch_1.default(client);
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
    var productService = new ProductsServices_1.ProductsService(mongoDBRepository, elasticSearchRepository, jwtMiddleware);
    var productController = new ProductController_1.default(productService);
    var productRoutes = new ProductRoutes_1.default(app, jwtMiddleware, productController);
    Routes.push(productRoutes);
    //Users Initialize
    var userService = new UsersServices_1.UsersServices(mongoDBRepository, jwtMiddleware);
    var userController = new UserController_1.default(userService);
    var userRoutes = new UserRoutes_1.default(app, jwtMiddleware, userController);
    Routes.push(userRoutes);
    /**.
     * ======== End Bootstrapping ===========
     */
    return Routes;
};
exports.default = Bootstrap;
