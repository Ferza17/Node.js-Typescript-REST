import {Request, Response, NextFunction} from "express"
import {ResponseJSON} from "../../Utils/Response/ResponseUtils"
import Utils from "../../Utils/Utils";
import {Controller} from "../Controller";
import {ProductsService} from "../../Services/Products/Products";
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";

class ProductController extends Controller {
    constructor(utils: Utils, private productService: ProductsService) {
        super(utils);
    }

    GetProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let response: ResponseJSON
        const products = await this.productService.GetProducts()
        if (products == null) {
            response = {
                Code: 404,
                Message: "Empty",
                Data: products
            }
            this.utils.Response.ResponseJSON(req, res, response)
        }
        response = {
            Data: products,
            Message: "Success",
            Code: 200
        }
        this.utils.Response.ResponseJSON(req, res, response)
    }

    GetProductsWithCreatedUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let response: ResponseJSON
        //TODO: Get User Id with JWT
    }
}


export default ProductController