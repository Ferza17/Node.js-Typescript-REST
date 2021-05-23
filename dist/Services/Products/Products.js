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
            try {
                return yield Product_1.Product.find({}).exec();
            }
            catch (err) {
                return null;
            }
        });
    }
}
exports.ProductsService = ProductsService;
