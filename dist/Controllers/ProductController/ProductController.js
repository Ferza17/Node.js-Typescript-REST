"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseUtils_1 = __importDefault(require("../../Utils/Response/ResponseUtils"));
const Controller_1 = __importDefault(require("../Controller"));
const Product_1 = __importDefault(require("../../Models/Product"));
class ProductController extends Controller_1.default {
    constructor(_productService, _jwt) {
        super(_productService, _jwt);
        this._productService = _productService;
        this._jwt = _jwt;
        this.CreateProduct = async (req, res) => {
            // Product Image Base64
            let product = req.body;
            const isValidate = Product_1.default.Validate(product);
            if (!isValidate.isOk) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.BadRequest,
                    Message: isValidate.reason,
                    Data: null
                });
                return;
            }
            const ProductCreated = await this._productService.CreateProduct(product);
            if (ProductCreated == null) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.NotFound,
                    Message: "Not Found!",
                    Data: null
                });
                return;
            }
            ResponseUtils_1.default.ResponseJSON(req, res, {
                Code: ResponseUtils_1.default.HttpStatusCode.Created,
                Message: "Created!",
                Data: ProductCreated
            });
            return;
        };
        this.GetProducts = async (req, res) => {
            const products = await this._productService.GetProducts();
            if (products == null) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: 404,
                    Message: "Empty",
                    Data: products
                });
                return;
            }
            ResponseUtils_1.default.ResponseJSON(req, res, {
                Data: products,
                Message: "Success",
                Code: 200
            });
            return;
        };
        this.GetProductsById = async (req, res) => {
            const productId = req.params.id;
            const result = await this._productService.GetProductsById(productId);
            if (result == null) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.NotFound,
                    Message: "Not Found",
                    Data: result,
                });
                return;
            }
            ResponseUtils_1.default.ResponseJSON(req, res, {
                Code: ResponseUtils_1.default.HttpStatusCode.Ok,
                Message: "Success",
                Data: result,
            });
            return;
        };
        this.UpdateProduct = async (req, res) => {
            const productId = req.params.id;
            let product = req.body;
            const isValidate = Product_1.default.Validate(product);
            if (!isValidate.isOk) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.BadRequest,
                    Message: isValidate.reason,
                    Data: null
                });
                return;
            }
            product._id = productId;
            const data = await this._productService.UpdateProduct(product);
            if (data == null) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.InternalServerError,
                    Message: "Error While Update!",
                    Data: null
                });
                return;
            }
            ResponseUtils_1.default.ResponseJSON(req, res, {
                Code: ResponseUtils_1.default.HttpStatusCode.Ok,
                Message: "Updated!",
                Data: null
            });
            return;
        };
        this.DeleteProducts = async (req, res) => {
            const token = req.header("Authorization");
            const productId = req.params.id;
            const identity = this._jwt.GetIdentity(token);
            if (identity == null) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.Unauthorized,
                    Message: "Unauthorized user!",
                    Data: null
                });
                return;
            }
            const deletedProduct = this._productService.DeleteProduct(productId, identity);
            if (deletedProduct == null) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.BadRequest,
                    Message: "Error While Deleting Products!",
                    Data: null
                });
                return;
            }
            if (await deletedProduct == false) {
                ResponseUtils_1.default.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.default.HttpStatusCode.Unauthorized,
                    Message: "You're not Allowed!",
                    Data: null
                });
                return;
            }
            ResponseUtils_1.default.ResponseJSON(req, res, {
                Code: ResponseUtils_1.default.HttpStatusCode.Ok,
                Message: "Deleted!",
                Data: null
            });
            return;
        };
    }
}
exports.default = ProductController;
