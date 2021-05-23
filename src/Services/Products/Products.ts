import {Product} from "../../Models/Product";
import {Services} from "../Services";
import {MongoDB} from "../../Repository/MongoDB/MongoDB";

export class ProductsService extends Services {
    constructor(private mongoDB: MongoDB) {
        super(mongoDB);
    }

    GetProducts = async (): Promise<any> => {
        try {
            return await Product.find({}).exec()
        } catch (err) {
            return null
        }
    }

}