import mongoose, {Document} from "mongoose"

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

type validateReason = {
    isOk: Boolean,
    reason: String
}


enum Gender {
    Women = "Women",
    Male = "Male"
}

interface IUser extends Document {
    _id: String,
    first_name: String,
    last_name: String,
    email: String,
    gender: Gender,
    password: String,
    role: String
}

const User = mongoose.model<IUser>("users", usersSchema)

const Validate = (u: IUser): validateReason => {
    return {
        isOk: true,
        reason: ""
    }
}

export {
    User,
    IUser,
    Validate
}
