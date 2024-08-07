const uploadProductPermission = require("../Helpers/Permission");
const productModel = require("../Models/ProductModel");


async function UpdateProduct(req,res){

    try{
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission Denied");
        }
        const { _id , ...resBody} = req.body
        const updateProductAd = await productModel.findByIdAndUpdate(_id,resBody, { new: true }).lean()

        res.json({
            data: updateProductAd,
            error: false,
            success: true,
            message: "Product Updated"
          });
    }
    catch(err){
        console.error("Error updating product:", err);
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true,
          });
    }
}
module.exports = UpdateProduct;