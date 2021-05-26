import {Product, IProduct} from "../../Models/Product";
import {Services} from "../Services";
import {MongoDB} from "../../Repository/MongoDB/MongoDB";

export class ProductsService extends Services {
    constructor(private mongoDB: MongoDB) {
        super(mongoDB);
    }

    GetProducts = async (): Promise<Array<IProduct>> => {
        let products: IProduct[]
        try {
            await this.mongoDB.OpenConnection()
            products = await Product.find({}).exec()
            await this.mongoDB.CloseConnection()
        } catch (err) {
            throw new Error(err)
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
            throw new Error(err)
        }
        return product
    }
    CreateProduct = async (p: IProduct): Promise<IProduct | null> => {
        let product: IProduct | null
        try {
            await this.mongoDB.OpenConnection()
            product = await Product.create(p)
            await this.mongoDB.CloseConnection()
        } catch (err) {
            throw new Error(err)
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
            throw new Error(err)
        }
        return product
    }
    DeleteProduct = async (productId: String): Promise<any> => {
        let product: IProduct | null
        try {
            await this.mongoDB.OpenConnection()
            product = await Product.findOneAndDelete({_id: productId})
            await this.mongoDB.CloseConnection()
        } catch (err) {
            throw new Error(err)
        }
        return product
    }
}