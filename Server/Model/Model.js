const mongoose = require("mongoose")
// const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const secretKey = "loginpagebyrakeshdaharwalorrobindaharwal";

// const dotenv = require('dotenv');
// dotenv.config();


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})




// jwt 

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        },
            process.env.SECRET_KEY, {
            expiresIn: "30d"
        }
        )
    } catch (err) {
        console.log(err)
    }
}

const collection = mongoose.model("userDetails", userSchema);

module.exports = collection;