"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const Repository_1 = require("../Repository");
const env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
class MongoDB extends Repository_1.Repository {
    constructor(conn) {
        super();
        this.conn = conn;
    }
    GetConnection() {
        // @ts-ignore
        return this.conn.connect(env_config_1.default.MONGODB_URL, {
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(res => {
            console.log("Success Connected to MongoDB...");
        }).catch(err => {
            throw (err);
        });
    }
}
exports.MongoDB = MongoDB;
