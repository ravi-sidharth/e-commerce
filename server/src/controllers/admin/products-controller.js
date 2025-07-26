const { uploadResult } = require('../../helpers/cloudinary')
const Product = require('../../models/Product')
const logger = require('../../utils/logger')

const handleImageUpload = async (req, res) => {
  try {
      const b64 = Buffer.from(req.file.buffer).toString('base64')
      const url = "data:" + req.file.mimetype + ";base64," + b64
      const result = await uploadResult(url)
      res.status(200).json({
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

const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      salePrice,
      brand,
      category,
      subcategory,
      size,
      stock,
    } = req.body;

    const files = req.files;
    let imagePaths = [];

    if (files && files.length > 0) {
      for (let file of files) {
        const uploaded = await uploadResult(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
        imagePaths.push(uploaded.url); 
      }
    }


    if (
      !title ||
      !description ||
      !price ||
      !salePrice ||
      !brand ||
      !category ||
      !subcategory ||
      !stock ||
      !imagePaths.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      salePrice,
      brand,
      category,
      subcategory,
      size,
      stock,
      images: imagePaths,
    });
    await newProduct.save();

    return res.status(201).json({
      success: true,
      product: newProduct,
      message: "Product added successfully!",
    });
  } catch (error) {
    console.error("Error adding Product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const productList = await Product.find()
      .populate("brand", "name")
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ _id: -1 });

      res.status(200).json({
      success: true,
      productList,
    });
  } catch (error) {
    console.error("Error fetching Product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      price,
      salePrice,
      brand,
      category,
      subcategory,
      size,
      stock,
    } = req.body;
    const files = req.files;
    let imagePaths = [];

    if (files && files.length > 0) {
      for (let file of files) {
        const uploaded = await uploadResult(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
        imagePaths.push(uploaded.secure_url); 
      }
    }

    if (
      !title ||
      !description ||
      !price ||
      !salePrice ||
      !brand ||
      !category ||
      !subcategory ||
      !stock
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.salePrice = salePrice || product.salePrice;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.size = size || product.size;
    product.stock = stock || product.stock;
    product.images = imagePaths.length > 0 ? imagePaths : product.images;

    await product.save();

  res.status(200).json({
      success: true,
      updatedProduct: product,
      message: "Product updated successfully!",
    });
  } catch (error) {
    console.error("Error updating Product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting Product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
}
