import {JwtMiddleware} from "../../Middleware/JWT/JwtMiddleware";
import {MongoDB} from "../../Repository/MongoDB/MongoDB";
import mongoose from "mongoose";
import {ProductsService} from "../../Services/Products/ProductsServices";
import {Client} from "@elastic/elasticsearch";
import Elasticsearch from "../../Repository/ElasticSearch/Elasticsearch";
import Env from "../../Utils/Env/env.config"


const Bootstrap = (): ProductsService => {
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
    /**.
     * ======== End Bootstrapping ===========
     */

    return new ProductsService(mongoDBRepository, elasticSearchRepository, jwtMiddleware)
}


export default Bootstrap