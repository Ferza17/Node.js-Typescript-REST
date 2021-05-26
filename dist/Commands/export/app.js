"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bootstrap_1 = __importDefault(require("./Bootstrap"));
/*
* Notes !!!
* This split Command is use for importing data
* to elasticsearch
* */
const main = async () => {
    console.log("Inserting data To Elasticsearch");
    const product = Bootstrap_1.default();
    // const isInserted: Boolean = await product.InsertToElasticSearch()
    await product.InsertToElasticSearch();
    // if (!isInserted) {
    //
    // }
};
main().then(res => {
    console.log("Success");
    process.exit(0);
}).catch(err => {
    throw new Error(err);
});
