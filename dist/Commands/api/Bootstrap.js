"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
const elasticsearch_1 = require("@elastic/elasticsearch");
const JwtMiddleware_1 = __importDefault(require("../../Middleware/JWT/JwtMiddleware"));
const ProductRoutes_1 = __importDefault(require("../../Routes/Product/ProductRoutes"));
const UserRoutes_1 = __importDefault(require("../../Routes/User/UserRoutes"));
const ProductController_1 = __importDefault(require("../../Controllers/ProductController/ProductController"));
const UserController_1 = __importDefault(require("../../Controllers/UserController/UserController"));
const ProductsServices_1 = __importDefault(require("../../Services/Products/ProductsServices"));
const UsersServices_1 = __importDefault(require("../../Services/Users/UsersServices"));
const MongoDB_1 = __importDefault(require("../../Repositories/MongoDB/MongoDB"));
const Elasticsearch_1 = __importDefault(require("../../Repositories/ElasticSearch/Elasticsearch"));
const ResponseUtils_1 = __importDefault(require("../../Utils/Response/ResponseUtils"));
const env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
const Bootstrap = (app) => {
    app.use(body_parser_1.json());
    let Routes = [];
    let Repos = [];
    const client = new elasticsearch_1.Client({
        node: env_config_1.default.ELASTIC_URL
    });
    /**.
     * ======== Bootstrapping ===========
     */
    const jwtMiddleware = new JwtMiddleware_1.default.Jwt();
    //Repositories
    const mongoDBRepository = new MongoDB_1.default(mongoose_1.default);
    Repos.push(mongoDBRepository);
    const elasticSearchRepository = new Elasticsearch_1.default(client);
    Repos.push(elasticSearchRepository);
    //Products Initialize
    const productService = new ProductsServices_1.default(mongoDBRepository, elasticSearchRepository);
    const productController = new ProductController_1.default(productService, jwtMiddleware);
    const productRoutes = new ProductRoutes_1.default(app, jwtMiddleware, productController);
    Routes.push(productRoutes);
    //Users Initialize
    const userService = new UsersServices_1.default(mongoDBRepository);
    const userController = new UserController_1.default(userService, jwtMiddleware);
    const userRoutes = new UserRoutes_1.default(app, jwtMiddleware, userController);
    Routes.push(userRoutes);
    /**.
     * ======== End Bootstrapping ===========
     */
    // List Repository
    console.log("=============== Repository ===============");
    Repos.forEach(repo => {
        console.debug("Repository : ", repo.GetRepoName());
    });
    // Initialize All Routes
    console.log("=============== Routes ===================");
    Routes.forEach(route => {
        console.debug("Route : ", route.GetRoute());
        route.initRoutes();
    });
    // Ping Route
    app.use("/ping", (req, res) => {
        ResponseUtils_1.default.ResponseJSON(req, res, {
            Code: 200,
            Message: "Pong",
            Data: null
        });
        return;
    });
    // Url Not Found Route
    app.use((req, res) => {
        ResponseUtils_1.default.ResponseJSON(req, res, {
            Code: ResponseUtils_1.default.HttpStatusCode.NotFound,
            Message: "Not Found!",
            Data: null
        });
        return;
    });
};
exports.default = Bootstrap;
