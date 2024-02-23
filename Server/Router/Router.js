const express = require("express");
const {registerUser,getUser,loginUser,userData, cartItem} = require("../Controller/Controller")
const authMiddleware = require("../Middleware/AuthMiddleware");

const Router = express.Router();

Router.post("/register",registerUser);
Router.post("/login",loginUser);
Router.get("/read",getUser);
Router.get("/user",authMiddleware, userData);
Router.post("/cart",cartItem)

module.exports = Router;

