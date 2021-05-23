import {Repository} from "../Repository";
import Utils from "../../Utils/Utils";
import env from "../../Utils/Env/env.config"
import mongoose from "mongoose"

export class MongoDB extends Repository {
    constructor(util: Utils, private conn: mongoose.Mongoose) {
        super(util);
    }

    GetConnection(): mongoose.Mongoose {
        // @ts-ignore
        return this.conn.connect(env.MONGODB_URL, {
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        }).then(res => {
            console.log("Success Connected to MongoDB...")
        }).catch(err => {
            throw (err)
        })
    }


}