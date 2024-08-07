const addToCartModel = require("../../Models/addToCartModel");

const DeleteAddToCartProduct = async(req,res) => {
    try{
        const currentUserId = req?.userId;
        const addToCartProductId = req.body._id;
        const qty = req?.body?.quantity;

        const deleteProduct = await addToCartModel.deleteOne({_id : addToCartProductId})
        //console.log("Count ::",count)

        res.json({
            data : deleteProduct,
            error: false,
            success: true,
            message: "Product Deleted!"
          });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}

module.exports = DeleteAddToCartProduct;