"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});
var Gender;
(function (Gender) {
    Gender["Women"] = "Women";
    Gender["Male"] = "Male";
})(Gender || (Gender = {}));
const User = mongoose_1.default.model("users", usersSchema);
exports.User = User;
const Validate = (u) => {
    return {
        isOk: true,
        reason: ""
    };
};
exports.Validate = Validate;
