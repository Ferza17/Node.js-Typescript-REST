import Express from "express"
import ResponseUtil from "../../Utils/Response/ResponseUtils"
import Controller from "../Controller";
import ProductServices from "../../Services/Products/ProductsServices";
import ProductModel from "../../Models/Product"
import JwtMiddleware from "../../Middleware/JWT/JwtMiddleware";

export default class ProductController extends Controller {
    constructor(private _productService: ProductServices, private _jwt: JwtMiddleware.Jwt) {
        super( _productService, _jwt);
    }

    CreateProduct = async (req: Express.Request, res: Express.Response): Promise<void> => {
        // Product Image Base64
        let product: ProductModel.IProduct = req.body
        const isValidate = ProductModel.Validate(product)
        if (!isValidate.isOk) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.BadRequest,
                Message: isValidate.reason,
                Data: null
            })
            return
        }

        const ProductCreated = await this._productService.CreateProduct(product)
        if (ProductCreated == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.NotFound,
                Message: "Not Found!",
                Data: null
            })
            return
        }
        ResponseUtil.ResponseJSON(req, res, {
            Code: ResponseUtil.HttpStatusCode.Created,
            Message: "Created!",
            Data: ProductCreated
        })
        return
    }

    GetProducts = async (req: Express.Request, res: Express.Response): Promise<void> => {
        const products = await this._productService.GetProducts()
        if (products == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: 404,
                Message: "Empty",
                Data: products
            })
            return
        }
        ResponseUtil.ResponseJSON(req, res, {
            Data: products,
            Message: "Success",
            Code: 200
        })
        return
    }

    GetProductsById = async (req: Express.Request, res: Express.Response): Promise<void> => {
        const productId: String = req.params.id

        const result = await this._productService.GetProductsById(productId)
        if (result == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.NotFound,
                Message: "Not Found",
                Data: result,
            })
            return
        }

        ResponseUtil.ResponseJSON(req, res, {
            Code: ResponseUtil.HttpStatusCode.Ok,
            Message: "Success",
            Data: result,
        })
        return
    }

    UpdateProduct = async (req: Express.Request, res: Express.Response): Promise<void> => {
        const productId: String = req.params.id
        let product: ProductModel.IProduct = req.body

        const isValidate = ProductModel.Validate(product)
        if (!isValidate.isOk) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.BadRequest,
                Message: isValidate.reason,
                Data: null
            })
            return
        }

        product._id = productId
        const data = await this._productService.UpdateProduct(product)
        if (data == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.InternalServerError,
                Message: "Error While Update!",
                Data: null
            })
            return
        }
        ResponseUtil.ResponseJSON(req, res, {
            Code: ResponseUtil.HttpStatusCode.Ok,
            Message: "Updated!",
            Data: null
        })
        return
    }

    DeleteProducts = async (req: Express.Request, res: Express.Response): Promise<void> => {
        const token: string | undefined = req.header("Authorization")
        const productId: String = req.params.id

        const identity = this._jwt.GetIdentity(token)

        if (identity == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.Unauthorized,
                Message: "Unauthorized user!",
                Data: null
            })
            return
        }

        const deletedProduct = this._productService.DeleteProduct(productId, identity)
        if (deletedProduct == null) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.BadRequest,
                Message: "Error While Deleting Products!",
                Data: null
            })
            return
        }

        if (await deletedProduct == false) {
            ResponseUtil.ResponseJSON(req, res, {
                Code: ResponseUtil.HttpStatusCode.Unauthorized,
                Message: "You're not Allowed!",
                Data: null
            })
            return
        }
        ResponseUtil.ResponseJSON(req, res, {
            Code: ResponseUtil.HttpStatusCode.Ok,
            Message: "Deleted!",
            Data: null
        })
        return
    }

}