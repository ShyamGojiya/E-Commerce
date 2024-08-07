const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModel");
const {tok} = require("../Controllers/SignIn")
//const {tok} = require("../Controllers/SignIn")

async function AuthToken(req, res, next) {
  try {
    const token = req.cookies["token"];
    //console.log("token come from authtoken :::: -----------", token);

    if (!token) {
      return res.status(200).json({
        message: "Plese Login First ..!",
        success: false,
        error: true,
      });
    //console.log("hello");
    }
    // req.userId = 
    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    //console.log(decode)
    req.user = await userModel.findById(decode._id);
    // console.log("req user",req.user)

    req.userId = decode._id;
    // console.log("req user", req.userId);
     next();

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      success: false,
      error: true,
    });
  }
}

module.exports = AuthToken;
