const User = require("../Model/Model");
const cartUser = require("../Model/cartModel");
const bcrypt = require("bcryptjs")


const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const emailExist = await User.findOne({ email });
        console.log(emailExist)

        if (emailExist) {
            return res.status(400).json({ msg: "email already exist" })
        }

        // hash password 
        // const salt = await bcrypt.genSalt(12);
        const hashPass = await bcrypt.hash(password.toString(), 10)

        const userData = await User.create({ name, email, password: hashPass })
        console.log(userData)

        // token generate 

        const token = await userData.generateToken();
        // console.log(token)
        res.status(201).json({ token, userID: userData._id.toString() })
    }
    catch (err) {
        console.log(err)
        res.status(404).send(err)
    }

};




const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        // console.log(userExist)

        if (!userExist) {
            console.log("user not exist")
            return res.status(400).json({ msg: "Invalid credential" })
        }

        // compare password 

        const passCheck = await bcrypt.compare(password.toString(), userExist.password)

        if (passCheck) {
            const token = await userExist.generateToken();
            console.log("Login Successful")
            res.status(201).json({ userExist, token, userID: userExist._id.toString() })
        } else {
            res.status(401).json({ msg: "Invalid email or password" })
            console.log("Login Failed")
        }


    } catch (err) {
        console.log(err)
        res.status(404).send(err)
    }

}


const getUser = async (req, res) => {
    try {
        const userData = await User.find(req.body)
        console.log(User)
        console.log(userData)
        res.status(201).send(userData)
    }
    catch (err) {
        console.log(err)
        res.status(404).send(err)
    }

}

const userData = async (req, res) => {
    try {
        const userData = req.user;

        // console.log(userData)
        // res.status(201).send(userData)

        console.log(userData)
        res.status(201).send({ userData })
    }
    catch (err) {
        console.log(err)
        res.status(404).send(err)
    }

}

const cartItem = async (req, res) => {
    try {
        const user = await cartUser.create(req.body)
        res.status(201).send(user)
    } catch (err) {
        console.log(err)
    }
}



module.exports = { registerUser, loginUser, getUser, userData, cartItem }