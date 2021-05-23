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
const Controller_1 = require("../Controller");
class ProductController extends Controller_1.Controller {
    constructor(utils, productService) {
        super(utils);
        this.productService = productService;
        this.GetProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let response;
            const products = yield this.productService.GetProducts();
            if (products == null) {
                response = {
                    Code: 404,
                    Message: "Empty",
                    Data: products
                };
                this.utils.Response.ResponseJSON(req, res, response);
            }
            response = {
                Data: products,
                Message: "Success",
                Code: 200
            };
            this.utils.Response.ResponseJSON(req, res, response);
        });
        this.GetProductsWithCreatedUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let response;
            //TODO: Get User Id with JWT
        });
    }
}
exports.default = ProductController;
