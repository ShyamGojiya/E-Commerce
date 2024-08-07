const addToCartModel = require("../../Models/addToCartModel");

const CountAddToCartProduct = async (req,res) => {
        try{
            const userId = req?.userId;

            const count = await addToCartModel.countDocuments({
                userId : userId
            })
            //console.log("Count ::",count)

            res.json({
                data : { count : count },
                error: false,
                success: true,
                message: "ok"
              });

        }catch(err){
            res.status(400).json({
                message : err.message || err,
                success : false,
                error : true
            })
        }
}

module.exports = CountAddToCartProduct;