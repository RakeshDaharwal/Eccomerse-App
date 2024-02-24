const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const Router = require("./Router/Router")
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 4000

// CORS 
// const corsOptions = {
//     origin:"http://localhost:5173",
//     methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
//     credential:true
// }

// MIIDLEWARES 

app.use(cors());
app.use(express.json());
app.use("/auth",Router)

// MONGODB CONNECTION 

mongoose.connect("mongodb://127.0.0.1:27017/Mafia").then(()=>{
    console.log("Database Connected")
    app.listen(port,()=>{
        console.log(`Server is Running On ${port}`)
    })
}).catch(()=>{
    console.log("Connection Failed")
})



