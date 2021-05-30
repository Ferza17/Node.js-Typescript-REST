"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtMiddleware_1 = __importDefault(require("../../Middleware/JWT/JwtMiddleware"));
const MongoDB_1 = __importDefault(require("../../Repositories/MongoDB/MongoDB"));
const mongoose_1 = __importDefault(require("mongoose"));
const ProductsServices_1 = __importDefault(require("../../Services/Products/ProductsServices"));
const elasticsearch_1 = require("@elastic/elasticsearch");
const Elasticsearch_1 = __importDefault(require("../../Repositories/ElasticSearch/Elasticsearch"));
const env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
const Bootstrap = () => {
    const client = new elasticsearch_1.Client({
        node: env_config_1.default.ELASTIC_URL
    });
    /**.
     * ======== Bootstrapping ===========
     */
    const jwtMiddleware = new JwtMiddleware_1.default.Jwt();
    const mongoDBRepository = new MongoDB_1.default(mongoose_1.default);
    const elasticSearchRepository = new Elasticsearch_1.default(client);
    //Products
    /**.
     * ======== End Bootstrapping ===========
     */
    return new ProductsServices_1.default(mongoDBRepository, elasticSearchRepository, jwtMiddleware);
};
exports.default = Bootstrap;
