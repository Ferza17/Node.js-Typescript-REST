"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseUtils_1 = require("../../Utils/Response/ResponseUtils");
const Controller_1 = require("../Controller");
const Product_1 = require("../../Models/Product");
class ProductController extends Controller_1.Controller {
    constructor(productService) {
        super();
        this.productService = productService;
        this.CreateProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // Product Image Base64
            let response;
            let product = req.body;
            const isValidate = Product_1.Validate(product);
            if (!isValidate.isOk) {
                response = {
                    Code: ResponseUtils_1.HttpStatusCode.BadRequest,
                    Message: isValidate.reason,
                    Data: null
                };
                yield ResponseUtils_1.ResponseJSON(req, res, response);
                return;
            }
            const ProductCreated = yield this.productService.CreateProduct(product);
            if (ProductCreated == null) {
                response = {
                    Code: ResponseUtils_1.HttpStatusCode.InternalServerError,
                    Message: "Error While Creating Product!",
                    Data: null
                };
                yield ResponseUtils_1.ResponseJSON(req, res, response);
                return;
            }
            response = {
                Code: ResponseUtils_1.HttpStatusCode.Created,
                Message: "Created!",
                Data: ProductCreated
            };
            yield ResponseUtils_1.ResponseJSON(req, res, response);
            return;
        });
        this.GetProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let response;
            const products = yield this.productService.GetProducts();
            if (products == null) {
                response = {
                    Code: 404,
                    Message: "Empty",
                    Data: products
                };
                yield ResponseUtils_1.ResponseJSON(req, res, response);
                return;
            }
            response = {
                Data: products,
                Message: "Success",
                Code: 200
            };
            yield ResponseUtils_1.ResponseJSON(req, res, response);
            return;
        });
        this.GetProductsById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let response;
            const productId = req.params.id;
            const result = yield this.productService.GetProductsById(productId);
            if (result == null) {
                response = {
                    Code: ResponseUtils_1.HttpStatusCode.NotFound,
                    Message: "Not Found",
                    Data: result,
                };
                yield ResponseUtils_1.ResponseJSON(req, res, response);
                return;
            }
            response = {
                Code: ResponseUtils_1.HttpStatusCode.Ok,
                Message: "Success",
                Data: result,
            };
            yield ResponseUtils_1.ResponseJSON(req, res, response);
            return;
        });
        this.GetProductsWithCreatedUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let response;
            //TODO: Get User Id with JWT
        });
        this.UpdateProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                yield ResponseUtils_1.ResponseJSON(req, res, response);
                return;
            }
            product._id = productId;
            const data = yield this.productService.UpdateProduct(product);
            if (data == null) {
                response = {
                    Code: ResponseUtils_1.HttpStatusCode.InternalServerError,
                    Message: "Error While Update!",
                    Data: null
                };
                yield ResponseUtils_1.ResponseJSON(req, res, response);
                return;
            }
            response = {
                Code: ResponseUtils_1.HttpStatusCode.Ok,
                Message: "Updated!",
                Data: null
            };
            yield ResponseUtils_1.ResponseJSON(req, res, response);
            return;
        });
        this.DeleteProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //TODO: Delete Products
            return;
        });
    }
}
exports.default = ProductController;
