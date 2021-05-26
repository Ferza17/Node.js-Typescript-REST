import {Request, Response} from "express"
import {HttpStatusCode, ResponseJSON} from "../../Utils/Response/ResponseUtils"
import {Controller} from "../Controller";
import {ProductsService} from "../../Services/Products/ProductsServices";
import {IProduct, Validate} from "../../Models/Product"

class ProductController extends Controller {
    constructor(private productService: ProductsService) {
        super(productService);
    }
    CreateProduct = async (req: Request, res: Response): Promise<void> => {
        // Product Image Base64
        let response: ResponseJSON
        let product: IProduct = req.body
        const isValidate = Validate(product)
        if (!isValidate.isOk) {
            response = {
                Code: HttpStatusCode.BadRequest,
                Message: isValidate.reason,
                Data: null
            }
            ResponseJSON(req, res, response)
            return
        }

        const ProductCreated = await this.productService.CreateProduct(product)
        if (ProductCreated == null) {
            response = {
                Code: HttpStatusCode.InternalServerError,
                Message: "Error While Creating Product!",
                Data: null
            }
            ResponseJSON(req, res, response)
            return
        }

        response = {
            Code: HttpStatusCode.Created,
            Message: "Created!",
            Data: ProductCreated
        }
        ResponseJSON(req, res, response)
        return
    }

    GetProducts = async (req: Request, res: Response): Promise<void> => {
        let response: ResponseJSON
        const products = await this.productService.GetProducts()
        if (products == null) {
            response = {
                Code: 404,
                Message: "Empty",
                Data: products
            }
            ResponseJSON(req, res, response)
            return
        }
        response = {
            Data: products,
            Message: "Success",
            Code: 200
        }
        ResponseJSON(req, res, response)
        return
    }

    GetProductsById = async (req: Request, res: Response): Promise<void> => {
        let response: ResponseJSON
        const productId: String = req.params.id

        const result = await this.productService.GetProductsById(productId)
        if (result == null) {
            response = {
                Code: HttpStatusCode.NotFound,
                Message: "Not Found",
                Data: result,
            }
            ResponseJSON(req, res, response)
            return
        }

        response = {
            Code: HttpStatusCode.Ok,
            Message: "Success",
            Data: result,
        }
        ResponseJSON(req, res, response)
        return
    }


    UpdateProduct = async (req: Request, res: Response): Promise<void> => {
        let response: ResponseJSON
        const productId: String = req.params.id
        let product: IProduct = req.body

        const isValidate = Validate(product)
        if (!isValidate.isOk) {
            response = {
                Code: HttpStatusCode.BadRequest,
                Message: isValidate.reason,
                Data: null
            }
            ResponseJSON(req, res, response)
            return
        }

        product._id = productId
        const data = await this.productService.UpdateProduct(product)
        if (data == null) {
            response = {
                Code: HttpStatusCode.InternalServerError,
                Message: "Error While Update!",
                Data: null
            }
            ResponseJSON(req, res, response)
            return
        }

        response = {
            Code: HttpStatusCode.Ok,
            Message: "Updated!",
            Data: null
        }
        ResponseJSON(req, res, response)
        return
    }

    DeleteProducts = async (req: Request, res: Response): Promise<void> => {
        let response: ResponseJSON
        const productId: String = req.params.id
        const deletedProduct = this.productService.DeleteProduct(productId)
        if (deletedProduct == null) {
            response = {
                Code: HttpStatusCode.BadRequest,
                Message: "Error While Deleting Products!",
                Data: null
            }

            ResponseJSON(req, res, response)
            return
        }
        response = {
            Code: HttpStatusCode.Ok,
            Message: "Deleted!",
            Data: null
        }
        ResponseJSON(req, res, response)
        return
    }

}


export default ProductController