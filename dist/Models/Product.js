"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    type: {
        type: String
    }
}, {
    versionKey: false
});
const Product = mongoose_1.default.model("products", productSchema);
exports.Product = Product;
// Custom Validation
const Validate = (p) => {
    let val = {
        isOk: true,
        reason: ""
    };
    if (p.name == "") {
        val.isOk = false;
        val.reason = "Should Provide name";
        return val;
    }
    if (p.price == 0) {
        val.isOk = false;
        val.reason = "Should Provide price";
        return val;
    }
    if (p.description == "") {
        val.isOk = false;
        val.reason = "Should Provide description";
    }
    if (p.type == "") {
        val.isOk = false;
        val.reason = "Should Provide Type";
        return val;
    }
    return val;
};
exports.Validate = Validate;
