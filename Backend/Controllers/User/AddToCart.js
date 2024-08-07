const addToCartModel = require("../../Models/addToCartModel");

const AddToCart = async (req,res) => {
    try{

        const { productId } = req?.body
        const  currentUser  = req.userId
        //console.log("user",currentUser)
        const isProductAvilable = await addToCartModel.findOne({productId});
        //console.log("isProductAvilable",isProductAvilable)

        if(isProductAvilable){
            return res.json({
                error: true,
                success: false,
                message: "Already Exist in Add to Cart"
              });
        }

        
        const payload = {
            productId : productId,
            quantity : 1,
            userId : currentUser
            }
            
        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data : saveProduct,
            error: false,
            success: true,
            message: "Product Added in Cart"
          });

        
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}
    module.exports = AddToCart;