import mongoose, {Document} from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    type: {
        type: String
    }
}, {
    versionKey: false
})

type validateReason = {
    isOk: Boolean,
    reason: String
}

interface IProduct extends Document {
    _id: String,
    name: String,
    image: String,
    price: Number,
    description: String,
    type: String
}

const Product = mongoose.model<IProduct>("products", productSchema)

// Custom Validation
const Validate = (p: IProduct): validateReason => {
    let val: validateReason = {
        isOk: true,
        reason: ""
    }
    if (p.name == "") {
        val.isOk = false
        val.reason = "Should Provide name"
        return val
    }

    if (p.price == 0) {
        val.isOk = false
        val.reason = "Should Provide price"
        return val
    }

    if (p.description == "") {
        val.isOk = false
        val.reason = "Should Provide description"
    }

    if (p.type == "") {
        val.isOk = false
        val.reason = "Should Provide Type"
        return val
    }

    return val
}

export {
    Product,
    IProduct,
    Validate,
}


