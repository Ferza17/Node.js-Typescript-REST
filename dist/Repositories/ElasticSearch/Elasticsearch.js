"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("../Repository"));
class Elasticsearch extends Repository_1.default.Repository {
    constructor(conn) {
        super(Repository_1.default.RepoList.ElasticSearch);
        this.conn = conn;
        this.GetConnection = () => {
            return this.conn;
        };
        this.TestConnection = async () => {
            let connection;
            try {
                connection = await this.conn.cat.indices();
            }
            catch (err) {
                throw new Error(err);
            }
            return connection;
        };
    }
}
exports.default = Elasticsearch;
