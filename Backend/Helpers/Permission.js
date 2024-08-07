const userModel = require("../Models/UserModel")

const uploadProductPermission = async (req,res) => {
    const user = await userModel.findById(req.userId);

    if(user?.role !== 'ADMIN'){
        return false;
    }
    return true;
}
module.exports = uploadProductPermission;