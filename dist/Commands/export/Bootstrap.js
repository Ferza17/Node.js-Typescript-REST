"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var JwtMiddleware_1 = require("../../Middleware/JWT/JwtMiddleware");
var MongoDB_1 = require("../../Repository/MongoDB/MongoDB");
var mongoose_1 = __importDefault(require("mongoose"));
var ProductsServices_1 = require("../../Services/Products/ProductsServices");
var ProductController_1 = __importDefault(require("../../Controllers/ProductController/ProductController"));
var elasticsearch_1 = require("@elastic/elasticsearch");
var Elasticsearch_1 = __importDefault(require("../../Repository/ElasticSearch/Elasticsearch"));
var env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
var Bootstrap = function () {
    var client = new elasticsearch_1.Client({
        node: env_config_1.default.ELASTIC_URL
    });
    /**.
     * ======== Bootstrapping ===========
     */
    var jwtMiddleware = new JwtMiddleware_1.JwtMiddleware();
    var mongoDBRepository = new MongoDB_1.MongoDB(mongoose_1.default);
    var elasticSearchRepository = new Elasticsearch_1.default(client);
    //Products
    var productService = new ProductsServices_1.ProductsService(mongoDBRepository, elasticSearchRepository, jwtMiddleware);
    var productController = new ProductController_1.default(productService);
    /**.
     * ======== End Bootstrapping ===========
     */
};
exports.default = Bootstrap;
