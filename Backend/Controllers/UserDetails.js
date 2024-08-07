const userModel = require("../Models/UserModel");


async function UserDetails(req,res){
    try{ 
        // console.log(req.userId);
        const user = await userModel.findById(req.userId)
       // console.log("user come from userdetails :::: ",user)
        
        res.status(200).json({
            data : user,
            error : false,
            success : true,
            mssage : "Login User Details"
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}


module.exports = UserDetails;