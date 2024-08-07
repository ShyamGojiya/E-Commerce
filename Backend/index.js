const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser')
//const connectDB = require('./Config/db');
const dotenv = require("dotenv");
dotenv.config();
const router = require('./Routes');
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true ,// Corrected attribute name
    withCredentials:true
};

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api",router)

const PORT = 8080 || process.env.PORT;

mongoose.connect("mongodb://localhost:27017/Ecommerce")
.then(() => {
    console.log("Success")
    app.listen(PORT , (req,res) =>{
        console.log(`Server is Running in port ${PORT}`)
    })
})
.catch((err) => {
    console.log(err)
})
