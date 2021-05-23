import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

const Product = mongoose.model("Product", productSchema)

// Custom Validation
const Validate = (Product: mongoose.Model<any>) => {

}

export {
    Product,
    Validate
}


