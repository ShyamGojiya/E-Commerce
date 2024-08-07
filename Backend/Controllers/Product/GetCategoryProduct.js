const productModel = require("../../Models/ProductModel")

const getCategory = async (req,res) => {
    try{
        const productCategory = await productModel.distinct("category")

        //console.log("category",productCategory)

        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({category})

            if(product){
                productByCategory.push(product)
            }
        }

        res.status(201).json({
            data: productByCategory,
            error: false,
            success: true,
            message: "Category Product"
          });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            success : false,
            error : true
        })
    }
}

module.exports = getCategory;