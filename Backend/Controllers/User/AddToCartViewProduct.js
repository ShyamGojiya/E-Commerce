const addToCartModel = require("../../Models/addToCartModel");

const AddToCartViewProduct = async(req,res) => {
    try{

        const currentUser = req?.userId;

        const allProduct = await addToCartModel.find({userId : currentUser}).populate("productId")
        //console.log("user...",allProduct)
        return res.json({
            data : allProduct,
            error: false,
            success: true,
          });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}

module.exports = AddToCartViewProduct;
