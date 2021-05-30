"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../Models/Product"));
const Services_1 = __importDefault(require("../Services"));
class ProductsService extends Services_1.default {
    constructor(mongoDB, es, jwt) {
        super(mongoDB);
        this.mongoDB = mongoDB;
        this.es = es;
        this.jwt = jwt;
        this.GetProducts = async () => {
            let products;
            try {
                await this.mongoDB.OpenConnection();
                products = await Product_1.default.Product.find({}).exec();
                await this.mongoDB.CloseConnection();
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
                await this.mongoDB.OpenConnection();
                product = await Product_1.default.Product.findById({ _id: productId });
                await this.mongoDB.CloseConnection();
            }
            catch (err) {
                product = null;
                console.log(err);
            }
            return product;
        };
        this.CreateProduct = async (p) => {
            let product;
            const conn = this.es.GetConnection();
            try {
                // Insert to MongoDB
                await this.mongoDB.OpenConnection();
                product = await Product_1.default.Product.create(p);
                await this.mongoDB.CloseConnection();
                // Insert to Elasticsearch
                await conn.index({
                    index: "products",
                    // @ts-ignore
                    id: p._id,
                    body: {
                        name: p.name,
                        image: p.image,
                        price: p.price,
                        description: p.description,
                        type: p.type
                    }
                }, {
                    ignore: [400]
                });
                await conn.close();
            }
            catch (err) {
                product = null;
                console.log(err);
            }
            return product;
        };
        this.UpdateProduct = async (p) => {
            let product;
            try {
                await this.mongoDB.OpenConnection();
                product = await Product_1.default.Product.findOneAndUpdate({ _id: p._id }, p).exec();
                await this.mongoDB.CloseConnection();
            }
            catch (err) {
                console.log(err);
                product = null;
            }
            return product;
        };
        this.DeleteProduct = async (productId, token) => {
            let product;
            const identity = this.jwt.GetIdentity(token);
            if (identity == null) {
                return false;
            }
            // @ts-ignore
            if (identity.role != "Admin") {
                return false;
            }
            try {
                await this.mongoDB.OpenConnection();
                product = await Product_1.default.Product.findOneAndDelete({ _id: productId });
                await this.mongoDB.CloseConnection();
            }
            catch (err) {
                console.log(err);
                product = null;
            }
            return product;
        };
        this.InsertToElasticSearch = async () => {
            const products = await this.GetProducts();
            const conn = this.es.GetConnection();
            try {
                // Mappings
                await conn.indices.create({
                    index: "products",
                    body: {
                        mappings: {
                            properties: Product_1.default.ProductMappings
                        }
                    }
                }, {
                    ignore: [400]
                });
                //TODO: id in es is not equal with data in MongoDB
                if (products == null) {
                    return false;
                }
                products.map(async (p) => {
                    await conn.index({
                        // @ts-ignore
                        id: p._id,
                        index: "products",
                        body: {
                            name: p.name,
                            image: p.image,
                            price: p.price,
                            description: p.description,
                            type: p.type
                        }
                    }, {
                        ignore: [400]
                    });
                    console.log("Success inserted data with id : ", p._id);
                });
            }
            catch (err) {
                console.log(err);
                return false;
            }
            await conn.close();
            return true;
        };
        this.SearchProducts = async (searchRequest) => {
            return null;
        };
    }
}
exports.default = ProductsService;
