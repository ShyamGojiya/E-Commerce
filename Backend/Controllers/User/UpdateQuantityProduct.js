const addToCartModel = require("../../Models/addToCartModel");

const UpdateQuantityProduct = async(req,res) => {
    try{
        const currentUserId = req?.userId;
        const addToCartProductId = req?.body?._id;
        const qty = req?.body?.quantity;

        const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
           ...(qty && { quantity : qty})
        })
        //console.log("Count ::",count)

        res.json({
            data : updateProduct,
            error: false,
            success: true,
            message: "Product Updated!"
          });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}

module.exports = UpdateQuantityProduct;