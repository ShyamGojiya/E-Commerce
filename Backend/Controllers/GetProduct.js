const productModel = require("../Models/ProductModel");

async function GetProduct(req,res) {
    try{

        const allProduct = await productModel.find().sort({ createdAt : -1})
       
        res.status(201).json({
            data: allProduct,
            error: false,
            success: true,
            message: "All Product"
          });
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true,
          });
    }
}
module.exports = GetProduct;