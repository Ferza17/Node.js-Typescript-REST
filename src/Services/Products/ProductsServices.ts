import {Product, IProduct, ProductMappings} from "../../Models/Product";
import {Services} from "../Services";
import {MongoDB} from "../../Repository/MongoDB/MongoDB";
import {JwtMiddleware} from "../../Middleware/JWT/JwtMiddleware";
import Elasticsearch from "../../Repository/ElasticSearch/Elasticsearch";

export class ProductsService extends Services {
    constructor(private mongoDB: MongoDB, private es: Elasticsearch, private jwt: JwtMiddleware) {
        super(mongoDB);
    }

    GetProducts = async (): Promise<Array<IProduct> | null> => {
        let products: Array<IProduct> | null
        try {
            await this.mongoDB.OpenConnection()
            products = await Product.find({}).exec()
            await this.mongoDB.CloseConnection()
        } catch (err) {
            products = null
            console.log(err)
        }
        return products
    }

    GetProductsById = async (productId: String): Promise<IProduct | null> => {
        let product: IProduct | null
        try {
            await this.mongoDB.OpenConnection()
            product = await Product.findById({_id: productId})
            await this.mongoDB.CloseConnection()
        } catch (err) {
            product = null
            console.log(err)
        }
        return product
    }

    CreateProduct = async (p: IProduct): Promise<IProduct | null> => {
        let product: IProduct | null
        const conn = this.es.GetConnection()
        try {
            // Insert to MongoDB
            await this.mongoDB.OpenConnection()
            product = await Product.create(p)
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

    UpdateProduct = async (p: IProduct): Promise<IProduct | null> => {
        let product: IProduct | null
        try {
            await this.mongoDB.OpenConnection()
            product = await Product.findOneAndUpdate({_id: p._id}, p).exec()
            await this.mongoDB.CloseConnection()

        } catch (err) {
            console.log(err)
            product = null
        }
        return product
    }

    DeleteProduct = async (productId: String, token: String | undefined): Promise<any> => {
        let product: IProduct | null
        const identity = this.jwt.GetIdentity(token)

        if (identity.role != "Admin") {
            return false
        }

        try {
            await this.mongoDB.OpenConnection()
            product = await Product.findOneAndDelete({_id: productId})
            await this.mongoDB.CloseConnection()
        } catch (err) {
            console.log(err)
            product = null
        }
        return product
    }

    InsertToElasticSearch = async (): Promise<Boolean> => {
        try {
            const products: Array<IProduct> | null = await this.GetProducts()
            const conn = this.es.GetConnection()
            // Mappings
            await conn.indices.create({
                index: "products",
                body: {
                    mappings: {
                        properties: ProductMappings
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
                }).then(res => {
                    console.log("Success inserted data with id : ", p._id)
                }).catch(err => {
                    console.log(err)
                    process.kill(process.pid, err)
                })
            })

            await conn.close()
        } catch (err) {
            console.log(err)
            return false
        }

        return true
    }
}