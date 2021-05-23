import {Repository} from "../Repository";
import env from "../../Utils/Env/env.config"
import mongoose from "mongoose"

export class MongoDB extends Repository {
    constructor( private conn: mongoose.Mongoose) {
        super();
    }

    GetConnection(): mongoose.Mongoose {
        // @ts-ignore
        return this.conn.connect(env.MONGODB_URL, {
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(res => {
            console.log("Success Connected to MongoDB...")
        }).catch(err => {
            throw (err)
        })
    }


}