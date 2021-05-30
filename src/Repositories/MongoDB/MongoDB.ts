import Repositories from "../Repository";
import env from "../../Utils/Env/env.config"
import mongoose from "mongoose"

export default class MongoDB extends Repositories.Repository {
    constructor(private _conn: mongoose.Mongoose) {
        super(Repositories.RepoList.MongoDB);
    }

    OpenConnection = async () => {
        try {
            // @ts-ignore
            await this._conn.connect(env.MONGODB_URL, {
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                useNewUrlParser: true
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    CloseConnection = async () => {
        try {
            await this._conn.disconnect()
        } catch (err) {
            throw new Error(err)
        }
    }

    TestConnection = async (): Promise<any> => {
        let connection: any
        try {
            connection = this._conn.version
        } catch (err) {
            throw new Error(err)
        }

        return connection
    }


}