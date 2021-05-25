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
exports.ProductsService = void 0;
const Product_1 = require("../../Models/Product");
const Services_1 = require("../Services");
class ProductsService extends Services_1.Services {
    constructor(mongoDB) {
        super(mongoDB);
        this.mongoDB = mongoDB;
        this.GetProducts = () => __awaiter(this, void 0, void 0, function* () {
            let products;
            try {
                products = yield Product_1.Product.find({}).exec();
            }
            catch (err) {
                throw new Error(err);
            }
            return products;
        });
        this.GetProductsById = (productId) => __awaiter(this, void 0, void 0, function* () {
            let product;
            try {
                product = yield Product_1.Product.findById({ _id: productId });
            }
            catch (err) {
                throw new Error(err);
            }
            return product;
        });
        this.CreateProduct = (p) => __awaiter(this, void 0, void 0, function* () {
            let product;
            try {
                product = yield Product_1.Product.create(p);
            }
            catch (err) {
                throw new Error(err);
            }
            return product;
        });
        this.UpdateProduct = (p) => __awaiter(this, void 0, void 0, function* () {
            let product;
            try {
                product = yield Product_1.Product.findOneAndUpdate({ _id: p._id }, p).exec();
            }
            catch (err) {
                throw new Error(err);
            }
            return product;
        });
        this.DeleteProduct = (productId) => __awaiter(this, void 0, void 0, function* () {
            let product;
            try {
                product = yield Product_1.Product.findOneAndDelete({ _id: productId });
            }
            catch (err) {
                throw new Error(err);
            }
            return product;
        });
    }
}
exports.ProductsService = ProductsService;
