import {Repository} from "../Repository";
import env from "../../Utils/Env/env.config"
import mongoose from "mongoose"

export class MongoDB extends Repository {
    constructor(private conn: mongoose.Mongoose) {
        super();
    }

    OpenConnection = async () => {
        try {
            // @ts-ignore
            await this.conn.connect(env.MONGODB_URL, {
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    CloseConnection = async () => {
        try {
            await this.conn.disconnect()
        } catch (err) {
            throw new Error(err)
        }
    }


}