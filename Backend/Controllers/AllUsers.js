const userModel = require("../Models/UserModel");

async function AllUsers (req,res){
    try{
        const user = await userModel.find()
        //console.log("USer ID ----Alluser ---************",user)
        
        //const allUsers = await userModel.find()
        res.status(200).json({
            message : "All userDetails",
            data : user,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}
module.exports = AllUsers;