import Repositories from "../Repository";
import {Client} from "@elastic/elasticsearch"

export default class Elasticsearch extends Repositories.Repository {
    constructor(private _conn: Client) {
        super(Repositories.RepoList.ElasticSearch);
    }

    GetConnection = (): Client => {
        return this._conn
    }


    TestConnection = async (): Promise<any> => {
        let connection: any
        try {
            connection = await this._conn.cat.indices()
        } catch (err) {
            throw new Error(err)
        }
        return connection
    }
}