"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../Models/Product"));
const Services_1 = __importDefault(require("../Services"));
class ProductsService extends Services_1.default {
    constructor(_mongoDB) {
        super(_mongoDB);
        this._mongoDB = _mongoDB;
        this.GetProducts = async () => {
            let products;
            try {
                await this._mongoDB.OpenConnection();
                products = await Product_1.default.Product.find({}).exec();
                await this._mongoDB.CloseConnection();
            }
            catch (err) {
                products = null;
                console.log(err);
            }
            return products;
        };
        this.GetProductsById = async (productId) => {
            let product;
            try {
                await this._mongoDB.OpenConnection();
                product = await Product_1.default.Product.findById({ _id: productId });
                await this._mongoDB.CloseConnection();
            }
            catch (err) {
                product = null;
                console.log(err);
            }
            return product;
        };
        // @ts-ignore
        this.CreateProduct = async (p) => {
            // let product: ProductModel.IProduct | null
            // const conn = this._es.GetConnection()
            // try {
            //     // Insert to MongoDB
            //     await this._mongoDB.OpenConnection()
            //     product = await ProductModel.Product.create(p)
            //     await this._mongoDB.CloseConnection()
            //
            //     // Insert to Elasticsearch
            //     await conn.index({
            //         index: "products",
            //         // @ts-ignore
            //         id: p._id,
            //         body: {
            //             name: p.name,
            //             image: p.image,
            //             price: p.price,
            //             description: p.description,
            //             type: p.type
            //         }
            //     }, {
            //         ignore: [400]
            //     })
            //     await conn.close()
            // } catch (err) {
            //     product = null
            //     console.log(err)
            // }
            //
            // return product
        };
        this.UpdateProduct = async (p) => {
            let product;
            try {
                await this._mongoDB.OpenConnection();
                product = await Product_1.default.Product.findOneAndUpdate({ _id: p._id }, p).exec();
                await this._mongoDB.CloseConnection();
            }
            catch (err) {
                console.log(err);
                product = null;
            }
            return product;
        };
        this.DeleteProduct = async (productId, identity) => {
            let product;
            if (identity.role != "Admin") {
                return false;
            }
            try {
                await this._mongoDB.OpenConnection();
                product = await Product_1.default.Product.findOneAndDelete({ _id: productId });
                await this._mongoDB.CloseConnection();
            }
            catch (err) {
                console.log(err);
                product = null;
            }
            return product;
        };
        // @ts-ignore
        this.InsertToElasticSearch = async () => {
            // const products: Array<ProductModel.IProduct> | null = await this.GetProducts()
            // const conn = this._es.GetConnection()
            // try {
            //     // Mappings
            //     await conn.indices.create({
            //         index: "products",
            //         body: {
            //             mappings: {
            //                 properties: ProductModel.ProductMappings
            //             }
            //         }
            //     }, {
            //         ignore: [400]
            //     })
            //     if (products == null) {
            //         return false
            //     }
            //     products.map(async (p) => {
            //         await conn.index({
            //             // @ts-ignore
            //             id: p._id,
            //             index: "products",
            //             body: {
            //                 name: p.name,
            //                 image: p.image,
            //                 price: p.price,
            //                 description: p.description,
            //                 type: p.type
            //             }
            //         }, {
            //             ignore: [400]
            //         })
            //         console.log("Success inserted data with id : ", p._id)
            //
            //     })
            //
            // } catch (err) {
            //     console.log(err)
            //     return false
            // }
            // await conn.close()
            // return true
        };
        this.SearchProducts = async (searchRequest) => {
            return null;
        };
    }
}
exports.default = ProductsService;
