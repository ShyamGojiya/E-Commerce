
const productModel = require("../../Models/ProductModel");

const GetCategoryWiseProduct = async(req,res) => {

    try{
        const {category} = req?.body || req?.query
        const product = await productModel.find({category})


        //console.log("product",category)

        res.status(201).json({
            data: product,
            error: false,
            success: true,
            message: "Product"
          });
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}

module.exports = GetCategoryWiseProduct;