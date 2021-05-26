import {RepoList, Repository} from "../Repository";
import {Client} from "@elastic/elasticsearch"

export default class Elasticsearch extends Repository {
    constructor(private conn: Client) {
        super(RepoList.ElasticSearch);
    }

    OpenConnection = (): Client => {
        return this.conn
    }

    CloseConnection = async (): Promise<void> => {
        await this.conn.close()
        return
    }

    TestConnection = async (): Promise<any> => {
        let connection: any
        try {
            connection = await this.conn.cat.indices()
        } catch (err) {
            throw new Error(err)
        }
        return connection
    }
}