const logger = require('../../utils/logger')
const Product = require('../../models/Product')

const getFilteredProducts = async(req,res) => {
    try {
        const products = await Product.find({})

        res.status(200).json({
            success:true,
            data:products
        })
    } catch(err) {
        logger.error(err.message)
        res.status(500).json({
            success:false,
            message:'Some error occured',err
        })
    }
}




module.exports = {
    getFilteredProducts,
}