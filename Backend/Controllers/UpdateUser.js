const userModel = require("../Models/UserModel");

async function UpdateUser(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, name, email, role } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };
    const user = await userModel.findById(sessionUser);
    //console.log("user.role", user.role);
    const Update = await userModel.findByIdAndUpdate(userId, payload);
    //console.log("update -------++++++", userId);
    
    res.status(201).json({
      data: Update,
      error: false,
      success: true,
      message: "User Updated"
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = UpdateUser;
