import mongoose, {Document} from "mongoose"

namespace UserModel {
    const usersSchema = new mongoose.Schema({
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String
        },
        email: {
            type: String,
            required: true

        },
        gender: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    })

    export type validateReason = {
        isOk: Boolean,
        reason: String
    }

    export enum Gender {
        Women = "Women",
        Male = "Male"
    }

    export interface IUser extends Document {
        _id: String,
        first_name: String,
        last_name: String,
        email: String,
        gender: Gender,
        password: String,
        role: String
    }

    export const User = mongoose.model<IUser>("users", usersSchema)

    export const Validate = (u: IUser): validateReason => {
        return {
            isOk: true,
            reason: ""
        }
    }
}

export default UserModel
