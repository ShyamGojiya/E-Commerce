const bcrypt = require("bcryptjs");
const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
let tok;
   
async function SignInController(req, res) {
  try {
    // const {email , password } = req.body;
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      throw new Error("Please Provide Email");
    }
    if (!password) {
      throw new Error("Please Provide password");
    }

    const user = await userModel.findOne({ email });
    //console.log(user)
    if (!user) {
      throw new Error("User not Found");
    }

    const checkpass = await bcrypt.compare(password, user.password);
    console.log(checkpass);

    req.userId = user._id;
    if (checkpass) {
      const tokendata = {
        _id: user._id,
        email: user.email,
      };
      //console.log( process.env.TOKEN_SECRET_KEY)
      const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 5 * 24 * 60 * 60 * 1000,
      });

      // console.log(token);
      const tokenOption = {
        httpOnly : true,
        //secure : true,
        maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      };
      res.status(200).cookie("token", token, tokenOption).json({
        data: token,
        user,
        success: true,
        error: false,
        message: "Login Successfully",
      });
       tok = token;
      console.log("token ---", token);
    } else {
      throw new Error("Please Check Password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = {SignInController,tok};