const userModel = require("../Models/UserModel");
const bcrypt = require('bcryptjs');

async function SignUpController(req,res){

    try{
       const {email , password , name } = req.body;      
        
        const user1 = await userModel.findOne({email});
        console.log(user1)

       if(user1){
        throw new Error("Already user Exist")
        //console.log("error AAVI")
       }
       if(!email){
        throw new Error("Please Provide Email")
       }
       if(!password){
        throw new Error("Please Provide password")
       }
       if(!name){
        throw new Error("Please Provide name")
       }

       const salt = bcrypt.genSaltSync(10);
       const hashPassword = bcrypt.hashSync(password, salt);

       if(!hashPassword){
        throw new Error("Something is Wrong")
       }
       const payload = {
        ...req.body,
        role : "GENERAL",
        password : hashPassword
       }

       const userData = new userModel(payload)
       const saveUser = await userData.save()

       res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User Created Successfully"

       })
    }
    catch(err){
        console.log("err",err)
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
module.exports = SignUpController;