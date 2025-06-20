const { uploadResult } = require('../../helpers/cloudinary')
const Product = require('../../models/Product')
const logger = require('../../utils/logger')


const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64
        const result = await uploadResult(url)
        res.json({
            success: true,
            result
        })
    } catch (err) {
        logger.error(err)
        res.status(500).json({
            success: false,
            message: 'Error occured', err
        })
    }
}

// add a new product 
const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        if (!image || !title || !description || !category || !brand || !price | !totalStock) return res.json({
            success: false,
            message: 'All fields are required!'
        });

        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        });

        await newlyCreatedProduct.save();

        logger.info('Successfully added new product!')
        res.status(201).json({
            success: true,
            message: 'Successfully added new product!'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error occured', err
        })
    }
}


// fetch all products
const fetchAllProducts = async (req,res) => {
    try {
    const listOfProducts = await Product.find({})
    
    logger.info('Successfully fetch all product.')
    res.status(200).json({
        success:true,
        data:listOfProducts
    })

    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'Error occured', err
        })
    } 
}


// update a product 
const updateProductById = async (req,res) => {
    try {
        const {id} = req.params;
        const {image, title, description, category, brand, price, salePrice, totalStock } = req.body;
        const product = await Product.findById(id)
        if(!product) {
            logger.warn('Product not found!')
            return res.json({
                success:false,
                message:'Product not found!'
            })
        }
        product.title = title || product.title 
        product.image = image || product.image
        product.description = description || product.description 
        product.category = category || product.category
        product.brand = brand || product.brand
        product.price = price === '' ? 0 : price || product.price
        product.salePrice = salePrice === '' ? 0 : salePrice  || product.salePrice
        product.totalStock = totalStock || product.totalStock

        await product.save()

        logger.info('Successfully updated the product')
        res.json({
            success:true,
            message:'Successfully updated the product',
            data: product
        })

    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'Error occured', err
        })
    } 
}


// delete a product 
const deleteProductById = async (req,res) => {
    try {
        const {id} = req.params

        const product = await Product.findByIdAndDelete(id)
        if(!product) {
            logger.warn('Product not found!')
            return res.status(404).json({
                success:false,
                message:'Product not found!'
            })
        }

        logger.info('Successfully deleted the product')
        res.status(200).json({
            success:true,
            message:'Successfully deleted the product'
        })

    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'Error occured', err
        })
    } 
}

module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    updateProductById,
    deleteProductById
}
