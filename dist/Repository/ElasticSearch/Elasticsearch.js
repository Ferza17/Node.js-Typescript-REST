"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = require("../Repository");
class Elasticsearch extends Repository_1.Repository {
    constructor(conn) {
        super(Repository_1.RepoList.ElasticSearch);
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
