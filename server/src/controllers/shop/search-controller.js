const logger = require('../../utils/logger')
const Product = require('../../models/Product')

const searchProduct = async (req, res) => {
    try {
        const { keyword } = req.params
        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Keyword is required and must be in string format'
            })
        }

        const regEx = new RegExp(keyword, 'i')

        const createSearchQuery = {
            $or: [
                { title: regEx },
                { description: regEx }
            ]
        }

        const searchResults = await Product.find(createSearchQuery)
            .populate("brand", "name")
            .populate("category", "name")
            .populate("subcategory", "name");

        res.status(200).json({
            success: true,
            data: searchResults
        })

    } catch (err) {
        logger.error(err)
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}


module.exports = {
    searchProduct
}