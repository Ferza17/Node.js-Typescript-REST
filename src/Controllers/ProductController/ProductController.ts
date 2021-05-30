import {Request, Response} from "express"
import {HttpStatusCode, ResponseJSON} from "../../Utils/Response/ResponseUtils"
import {Controller} from "../Controller";
import ProductServices from "../../Services/Products/ProductsServices";
import ProductModel from "../../Models/Product"

export default class ProductController extends Controller {
    constructor(private productService: ProductServices) {
        super(productService);
    }

    CreateProduct = async (req: Request, res: Response): Promise<void> => {
        // Product Image Base64
        let product: ProductModel.IProduct = req.body
        const isValidate = ProductModel.Validate(product)
        if (!isValidate.isOk) {
            ResponseJSON(req, res, {
                Code: HttpStatusCode.BadRequest,
                Message: isValidate.reason,
                Data: null
            })
            return
        }

        const ProductCreated = await this.productService.CreateProduct(product)
        if (ProductCreated == null) {
            ResponseJSON(req, res, {
                Code: HttpStatusCode.NotFound,
                Message: "Not Found!",
                Data: null
            })
            return
        }
        ResponseJSON(req, res, {
            Code: HttpStatusCode.Created,
            Message: "Created!",
            Data: ProductCreated
        })
        return
    }

    GetProducts = async (req: Request, res: Response): Promise<void> => {
        const products = await this.productService.GetProducts()
        if (products == null) {
            ResponseJSON(req, res, {
                Code: 404,
                Message: "Empty",
                Data: products
            })
            return
        }
        ResponseJSON(req, res, {
            Data: products,
            Message: "Success",
            Code: 200
        })
        return
    }

    GetProductsById = async (req: Request, res: Response): Promise<void> => {
        const productId: String = req.params.id

        const result = await this.productService.GetProductsById(productId)
        if (result == null) {
            ResponseJSON(req, res, {
                Code: HttpStatusCode.NotFound,
                Message: "Not Found",
                Data: result,
            })
            return
        }

        ResponseJSON(req, res, {
            Code: HttpStatusCode.Ok,
            Message: "Success",
            Data: result,
        })
        return
    }


    UpdateProduct = async (req: Request, res: Response): Promise<void> => {
        let response: ResponseJSON
        const productId: String = req.params.id
        let product: ProductModel.IProduct = req.body

        const isValidate = ProductModel.Validate(product)
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
        const token: string | undefined = req.header("Authorization")
        const productId: String = req.params.id
        const deletedProduct = this.productService.DeleteProduct(productId, token)
        if (deletedProduct == null) {
            response = {
                Code: HttpStatusCode.BadRequest,
                Message: "Error While Deleting Products!",
                Data: null
            }

            ResponseJSON(req, res, response)
            return
        }

        if (await deletedProduct == false) {
            response = {
                Code: HttpStatusCode.Unauthorized,
                Message: "You're not Allowed!",
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