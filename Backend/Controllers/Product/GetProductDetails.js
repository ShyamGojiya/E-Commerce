const productModel = require("../../Models/ProductModel");

const GetProductDetails = async(req,res) => {

    try{
        const {productId} = req?.body;
        const product = await productModel.findById(productId)

        //console.log("IdProduct :::::",product)

        res.status(201).json({
            data: product,
            error: false,
            success: true,
            message: "Product"
          });
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}
module.exports = GetProductDetails;