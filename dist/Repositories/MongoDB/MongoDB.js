"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("../Repository"));
const env_config_1 = __importDefault(require("../../Utils/Env/env.config"));
class MongoDB extends Repository_1.default.Repository {
    constructor(_conn) {
        super(Repository_1.default.RepoList.MongoDB);
        this._conn = _conn;
        this.OpenConnection = async () => {
            try {
                // @ts-ignore
                await this._conn.connect(env_config_1.default.MONGODB_URL, {
                    useCreateIndex: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true,
                    useNewUrlParser: true
                });
            }
            catch (err) {
                throw new Error(err);
            }
        };
        this.CloseConnection = async () => {
            try {
                await this._conn.disconnect();
            }
            catch (err) {
                throw new Error(err);
            }
        };
        this.TestConnection = async () => {
            let connection;
            try {
                connection = this._conn.version;
            }
            catch (err) {
                throw new Error(err);
            }
            return connection;
        };
    }
}
exports.default = MongoDB;
