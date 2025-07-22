const Cart = require("../../models/Cart.js");
const Product = require("../../models/Product.js");

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity, size } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data. Please provide valid user ID, product ID, and quantity."
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        const findCurrentProductIndex = cart.products.findIndex(
            item => item.product.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            cart.products.push({ product: productId, quantity, size });
        } else {
            cart.products[findCurrentProductIndex].quantity += quantity;
            cart.products[findCurrentProductIndex].size = size;
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            data: cart,
            message: "Product added to cart successfully."
        });

    } catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the product to the cart."
        });
    }
};

const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required."
            });
        }

        let cart = await Cart.findOne({ user: userId }).populate({
            path: 'products.product',
            select: 'title brand images price salePrice size',
            populate: {
                path: 'brand',
                select: 'name'
            }
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        const validItems = cart.products.filter(item => item.product);

        if (validItems.length < cart.products.length) {
            cart.products = validItems;
            await cart.save();
        }

        const populatedCartItems = validItems.map(item => ({
            _id: item.product._id,
            images: item.product.images,
            title: item.product.title,
            brand: item.product.brand,
            price: item.product.price,
            salePrice: item.product.salePrice,
            quantity: item.quantity,
            size: item.product.size,
            selectedSize: item.size,
        }));

        return res.status(200).json({
            success: true,
            message: "Cart items retrieved successfully.",
            data: { ...cart._doc, items: populatedCartItems }
        });

    } catch (error) {
        console.error("Error fetching cart items:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the cart items."
        });
    }
};

const updateCartItemQty = async (req, res) => {
    try {
        const { userId, productId, quantity, size } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data. Please provide valid user ID, product ID, and quantity."
            });
        }

        let cart = await Cart.findOne({ user: userId }).populate("products.product");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        const findCurrentProductIndex = cart.products.findIndex(
            item => item.product._id.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart."
            });
        }

        cart.products[findCurrentProductIndex].quantity = quantity;
        cart.products[findCurrentProductIndex].size = size;
        await cart.save();

        await cart.populate({
            path: 'products.product',
            select: 'title brand images price salePrice size',
            populate: {
                path: 'brand',
                select: 'name'
            }
        });

        const populatedCartItems = cart.products.map(item => ({
            _id: item.product._id,
            images: item.product.images,
            title: item.product.title,
            brand: item.product.brand,
            price: item.product.price,
            salePrice: item.product.salePrice,
            size: item.product.size,
            quantity: item.quantity,
            selectedSize: item.size,
        }));

        return res.status(200).json({
            success: true,
            message: "Cart item updated successfully.",
            data: { ...cart._doc, items: populatedCartItems }
        });

    } catch (error) {
        console.error("Error updating cart item:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the cart item."
        });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data. Please provide valid user ID and product ID."
            });
        }

        let cart = await Cart.findOne({ user: userId }).populate({
            path: 'products.product',
            select: 'title price images salePrice size'
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        cart.products = cart.products.filter(
            item => item.product._id.toString() !== productId
        );

        await cart.save();

        const populatedCartItems = cart.products.map(item => ({
            _id: item.product._id,
            images: item.product.images,
            title: item.product.title,
            brand: item.product.brand,
            price: item.product.price,
            salePrice: item.product.salePrice,
            size: item.product.size,
            quantity: item.quantity,
            selectedSize: item.size,
        }));

        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully.",
            data: { ...cart._doc, items: populatedCartItems }
        });

    } catch (error) {
        console.error("Error deleting cart item:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while removing the product from the cart."
        });
    }
};

module.exports = {
    addToCart,
    fetchCartItems,
    updateCartItemQty,
    deleteCartItem
}