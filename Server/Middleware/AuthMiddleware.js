const jwt = require("jsonwebtoken");
const User = require("../Model/Model");




const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "token not provided" })
    }

    // console.log("token from auth middleware", token)


    // bearer remove karne 

    const jwtToken = token.replace("Bearer", "").trim();
    console.log("token from auth middleware", jwtToken)


    // token varify 

    try {
        const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY)
        // console.log(isVerified)

        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        })
        console.log(userData)


        // is data ko koi bhi middleware use kar skta hai 

        req.user = userData;
        req.token = token;
        req.userId = userData._id;

    }
    catch (err) {
        return res.status(401).json({ msg: "Unauthrized token" })
    }

    next();

}

module.exports = authMiddleware;