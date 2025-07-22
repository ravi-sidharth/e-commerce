const logger = require('../../utils/logger')
const Product = require('../../models/Product')

const getFilteredProducts = async (req, res) => {
    try {

        const { category = [], brand = [], sortBy = "price-hightolow" } = req.query;
        const filters = {};

        if (category.length) {
            filters.category = { $in: category.split(',') }
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(',') }
        }

        let sort = {}

        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1
                break;
            case "price-hightolow":
                sort.price = -1
                break;
            case "title-atoz":
                sort.title = 1
                break;
            case "title-ztoa":
                sort.title = -1
                break;
            default:
                sort.price = 1
                break;
        }

        const products = await Product.find(filters).sort(sort)
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (err) {
        logger.error(err.message)
        res.status(500).json({
            success: false,
            message: 'Some error occured', err
        })
    }
}

const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id)
            .populate("brand", "name")
            .populate("category", "name")
            .populate("subcategory", "name")
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found!'
            })
        }

        res.status(200).json({
            success: true,
            data: product
        })
    } catch (err) {
        logger.error(err.message)
        res.status(500).json({
            success: false,
            message: 'Some error occured', err
        })
    }
}

module.exports = {
    getFilteredProducts,
    getProductDetails
}