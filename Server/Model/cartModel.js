const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
})


const collection = mongoose.model("cartData",cartSchema)

module.exports = collection;