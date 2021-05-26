import {JwtMiddleware} from "../../Middleware/JWT/JwtMiddleware";
import {MongoDB} from "../../Repository/MongoDB/MongoDB";
import mongoose from "mongoose";
import {ProductsService} from "../../Services/Products/ProductsServices";
import ProductController from "../../Controllers/ProductController/ProductController";
import {Client} from "@elastic/elasticsearch";
import Elasticsearch from "../../Repository/ElasticSearch/Elasticsearch";
import Env from "../../Utils/Env/env.config"


const Bootstrap = () => {
    const client = new Client({
        node: Env.ELASTIC_URL
    })
    /**.
     * ======== Bootstrapping ===========
     */
    const jwtMiddleware = new JwtMiddleware()
    const mongoDBRepository = new MongoDB(mongoose)
    const elasticSearchRepository = new Elasticsearch(client)


//Products
    const productService = new ProductsService(mongoDBRepository, elasticSearchRepository, jwtMiddleware)
    const productController = new ProductController(productService)
    /**.
     * ======== End Bootstrapping ===========
     */
}


export default Bootstrap