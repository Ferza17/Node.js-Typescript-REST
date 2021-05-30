"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.default = {
    APP_PORT: process.env.PORT,
    VERSION_API: process.env.VERSION,
    USER_ROLE: process.env.USER_ROLE,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    ELASTIC_URL: process.env.ELASTIC_URL_NODE1,
    MONGODB_URL: process.env.MONGODB_URL,
    // @ts-ignore
    SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    JWT_ALGORITHM: process.env.ALGORITHM_JWT,
    // @ts-ignore
    JWT_EXPIRATION_TIMES: parseInt(process.env.EXPIRATION_TIMES_JWT)
};
