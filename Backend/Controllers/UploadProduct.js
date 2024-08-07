const uploadProductPermission = require("../Helpers/Permission");
const productModel = require("../Models/ProductModel");

async function UploadProduct(req,res) {
    try{

        const sessionuserId = req.userId;
        //console.log("IDDDDDDDDDDDDDDD :::::::::",sessionuserId)
        if(!uploadProductPermission(sessionuserId)){
            throw new Error("Permission Denied");
        }
        const { productName, brandName, category, productImage, description, price, sellingPrice } = req.body;

        const uploadProductvar = new productModel({
            productName,
            brandName,
            category,
            productImage,
            description,
            price,
            sellingPrice
        })
        const saveProduct = await uploadProductvar.save()

        res.status(201).json({
            data: saveProduct,
            error: false,
            success: true,
            message: "Product Upload Successfully"
          });
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true,
          });
    }
}
module.exports = UploadProduct;