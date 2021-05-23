"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.Product = Product;
// Custom Validation
const Validate = (Product) => {
};
exports.Validate = Validate;
