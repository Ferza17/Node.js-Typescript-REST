"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseUtils_1 = require("../../Utils/Response/ResponseUtils");
const Controller_1 = require("../Controller");
const Product_1 = require("../../Models/Product");
class ProductController extends Controller_1.Controller {
    constructor(productService) {
        super(productService);
        this.productService = productService;
        this.CreateProduct = async (req, res) => {
            // Product Image Base64
            let product = req.body;
            const isValidate = Product_1.Validate(product);
            if (!isValidate.isOk) {
                ResponseUtils_1.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.HttpStatusCode.BadRequest,
                    Message: isValidate.reason,
                    Data: null
                });
                return;
            }
            const ProductCreated = await this.productService.CreateProduct(product);
            if (ProductCreated == null) {
                ResponseUtils_1.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.HttpStatusCode.NotFound,
                    Message: "Not Found!",
                    Data: null
                });
                return;
            }
            ResponseUtils_1.ResponseJSON(req, res, {
                Code: ResponseUtils_1.HttpStatusCode.Created,
                Message: "Created!",
                Data: ProductCreated
            });
            return;
        };
        this.GetProducts = async (req, res) => {
            const products = await this.productService.GetProducts();
            if (products == null) {
                ResponseUtils_1.ResponseJSON(req, res, {
                    Code: 404,
                    Message: "Empty",
                    Data: products
                });
                return;
            }
            ResponseUtils_1.ResponseJSON(req, res, {
                Data: products,
                Message: "Success",
                Code: 200
            });
            return;
        };
        this.GetProductsById = async (req, res) => {
            const productId = req.params.id;
            const result = await this.productService.GetProductsById(productId);
            if (result == null) {
                ResponseUtils_1.ResponseJSON(req, res, {
                    Code: ResponseUtils_1.HttpStatusCode.NotFound,
                    Message: "Not Found",
                    Data: result,
                });
                return;
            }
            ResponseUtils_1.ResponseJSON(req, res, {
                Code: ResponseUtils_1.HttpStatusCode.Ok,
                Message: "Success",
                Data: result,
            });
            return;
        };
        this.UpdateProduct = async (req, res) => {
            let response;
            const productId = req.params.id;
            let product = req.body;
            const isValidate = Product_1.Validate(product);
            if (!isValidate.isOk) {
                response = {
                    Code: ResponseUtils_1.HttpStatusCode.BadRequest,
                    Message: isValidate.reason,
                    Data: null
                };
                ResponseUtils_1.ResponseJSON(req, res, response);
                return;
            }
            product._id = productId;
            const data = await this.productService.UpdateProduct(product);
            if (data == null) {
                response = {
                    Code: ResponseUtils_1.HttpStatusCode.InternalServerError,
                    Message: "Error While Update!",
                    Data: null
                };
                ResponseUtils_1.ResponseJSON(req, res, response);
                return;
            }
            response = {
                Code: ResponseUtils_1.HttpStatusCode.Ok,
                Message: "Updated!",
                Data: null
            };
            ResponseUtils_1.ResponseJSON(req, res, response);
            return;
        };
        this.DeleteProducts = async (req, res) => {
            let response;
            const token = req.header("Authorization");
            const productId = req.params.id;
            const deletedProduct = this.productService.DeleteProduct(productId, token);
            if (deletedProduct == null) {
                response = {
                    Code: ResponseUtils_1.HttpStatusCode.BadRequest,
                    Message: "Error While Deleting Products!",
                    Data: null
                };
                ResponseUtils_1.ResponseJSON(req, res, response);
                return;
            }
            if (await deletedProduct == false) {
                response = {
                    Code: ResponseUtils_1.HttpStatusCode.Unauthorized,
                    Message: "You're not Allowed!",
                    Data: null
                };
                ResponseUtils_1.ResponseJSON(req, res, response);
                return;
            }
            response = {
                Code: ResponseUtils_1.HttpStatusCode.Ok,
                Message: "Deleted!",
                Data: null
            };
            ResponseUtils_1.ResponseJSON(req, res, response);
            return;
        };
    }
}
exports.default = ProductController;
