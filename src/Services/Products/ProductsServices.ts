import ProductModel from "../../Models/Product";
import {Services} from "../Services";
import {MongoDB} from "../../Repository/MongoDB/MongoDB";
import {JwtMiddleware} from "../../Middleware/JWT/JwtMiddleware";
import Elasticsearch from "../../Repository/ElasticSearch/Elasticsearch";
import SearchRequestModel from "../../Models/Request/SearchRequest";

export default class ProductsService extends Services {
    constructor(private mongoDB: MongoDB, private es: Elasticsearch, private jwt: JwtMiddleware) {
        super(mongoDB);
    }

    GetProducts = async (): Promise<Array<ProductModel.IProduct> | null> => {
        let products: Array<ProductModel.IProduct> | null
        try {
            await this.mongoDB.OpenConnection()
            products = await ProductModel.Product.find({}).exec()
            await this.mongoDB.CloseConnection()
        } catch (err) {
            products = null
            console.log(err)
        }
        return products
    }

    GetProductsById = async (productId: String): Promise<ProductModel.IProduct | null> => {
        let product: ProductModel.IProduct | null
        try {
            await this.mongoDB.OpenConnection()
            product = await ProductModel.Product.findById({_id: productId})
            await this.mongoDB.CloseConnection()
        } catch (err) {
            product = null
            console.log(err)
        }
        return product
    }

    CreateProduct = async (p: ProductModel.IProduct): Promise<ProductModel.IProduct | null> => {
        let product: ProductModel.IProduct | null
        const conn = this.es.GetConnection()
        try {
            // Insert to MongoDB
            await this.mongoDB.OpenConnection()
            product = await ProductModel.Product.create(p)
            await this.mongoDB.CloseConnection()

            // Insert to Elasticsearch
            await conn.index({
                index: "products",
                // @ts-ignore
                id: p._id,
                body: {
                    name: p.name,
                    image: p.image,
                    price: p.price,
                    description: p.description,
                    type: p.type
                }
            }, {
                ignore: [400]
            })
            await conn.close()
        } catch (err) {
            product = null
            console.log(err)
        }

        return product
    }

    UpdateProduct = async (p: ProductModel.IProduct): Promise<ProductModel.IProduct | null> => {
        let product: ProductModel.IProduct | null
        try {
            await this.mongoDB.OpenConnection()
            product = await ProductModel.Product.findOneAndUpdate({_id: p._id}, p).exec()
            await this.mongoDB.CloseConnection()

        } catch (err) {
            console.log(err)
            product = null
        }
        return product
    }

    DeleteProduct = async (productId: String, token: String | undefined): Promise<any> => {
        let product: ProductModel.IProduct | null
        const identity = this.jwt.GetIdentity(token)

        if (identity.role != "Admin") {
            return false
        }

        try {
            await this.mongoDB.OpenConnection()
            product = await ProductModel.Product.findOneAndDelete({_id: productId})
            await this.mongoDB.CloseConnection()
        } catch (err) {
            console.log(err)
            product = null
        }
        return product
    }

    InsertToElasticSearch = async (): Promise<Boolean> => {
        const products: Array<ProductModel.IProduct> | null = await this.GetProducts()
        const conn = this.es.GetConnection()
        try {
            // Mappings
            await conn.indices.create({
                index: "products",
                body: {
                    mappings: {
                        properties: ProductModel.ProductMappings
                    }
                }
            }, {
                ignore: [400]
            })
            //TODO: id in es is not equal with data in MongoDB
            if (products == null) {
                return false
            }
            products.map(async (p) => {
                await conn.index({
                    // @ts-ignore
                    id: p._id,
                    index: "products",
                    body: {
                        name: p.name,
                        image: p.image,
                        price: p.price,
                        description: p.description,
                        type: p.type
                    }
                }, {
                    ignore: [400]
                })
                console.log("Success inserted data with id : ", p._id)

            })

        } catch (err) {
            console.log(err)
            return false
        }
        await conn.close()
        return true
    }

    SearchProducts = async (searchRequest: SearchRequestModel.ISearchRequest): Promise<Array<ProductModel.IProduct> | null> => {

        return null
    }
}
