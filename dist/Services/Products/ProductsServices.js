"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const Product_1 = require("../../Models/Product");
const Services_1 = require("../Services");
class ProductsService extends Services_1.Services {
    constructor(mongoDB, es, jwt) {
        super(mongoDB);
        this.mongoDB = mongoDB;
        this.es = es;
        this.jwt = jwt;
        this.GetProducts = async () => {
            let products;
            try {
                await this.mongoDB.OpenConnection();
                products = await Product_1.Product.find({}).exec();
                await this.mongoDB.CloseConnection();
            }
            catch (err) {
                throw new Error(err);
            }
            return products;
        };
        this.GetProductsById = async (productId) => {
            let product;
            try {
                await this.mongoDB.OpenConnection();
                product = await Product_1.Product.findById({ _id: productId });
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
                product = await Product_1.Product.create(p);
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
                throw new Error(err);
            }
            return product;
        };
        this.UpdateProduct = async (p) => {
            let product;
            try {
                await this.mongoDB.OpenConnection();
                product = await Product_1.Product.findOneAndUpdate({ _id: p._id }, p).exec();
                await this.mongoDB.CloseConnection();
            }
            catch (err) {
                throw new Error(err);
            }
            return product;
        };
        this.DeleteProduct = async (productId, token) => {
            let product;
            const identity = this.jwt.GetIdentity(token);
            if (identity.role != "Admin") {
                return false;
            }
            try {
                await this.mongoDB.OpenConnection();
                product = await Product_1.Product.findOneAndDelete({ _id: productId });
                await this.mongoDB.CloseConnection();
            }
            catch (err) {
                throw new Error(err);
            }
            return product;
        };
        this.InsertToElasticSearch = async () => {
            try {
                const products = await this.GetProducts();
                const conn = this.es.GetConnection();
                // Mappings
                await conn.indices.create({
                    index: "products",
                    body: {
                        mappings: {
                            properties: Product_1.ProductMappings
                        }
                    }
                }, {
                    ignore: [400]
                });
                products.map(async (p) => {
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
                    }).then(res => {
                        console.log("Success inserted data with id : ", p._id);
                    }).catch(err => {
                        console.log(err);
                        process.kill(process.pid, err);
                    });
                });
                await conn.close();
            }
            catch (err) {
                throw new Error(err);
            }
            return true;
        };
    }
}
exports.ProductsService = ProductsService;
