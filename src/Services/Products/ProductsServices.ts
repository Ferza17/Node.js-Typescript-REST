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
            products = await Product.find({}).exec()
        } catch (err) {
            throw new Error(err)
        }
        return products
    }

    GetProductsById = async (productId: String): Promise<IProduct | null> => {
        let product: IProduct | null
        try {
            product = await Product.findById({_id: productId})
        } catch (err) {
            throw new Error(err)
        }
        return product
    }

    CreateProduct = async (p: IProduct): Promise<IProduct | null> => {
        let product: IProduct | null
        try {
            product = await Product.create(p)
        } catch (err) {
            throw new Error(err)
        }

        return product
    }

     UpdateProduct = async (p: IProduct): Promise<IProduct | null> => {
        let product: IProduct | null
        try {
            product = await Product.findOneAndUpdate({_id: p._id}, p).exec()
        } catch (err) {
            throw new Error(err)
        }
        return product
    }

    DeleteProduct = async (productId: String): Promise<any> => {
        return null
    }
}