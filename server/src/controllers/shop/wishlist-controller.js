const Wishlist =require("../../models/Wishlist");

const createWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(403).json({
                success: false,
                message: "User Id and Product Id is required."
            })
        }
        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        const currentProductIndex = wishlist.products.findIndex(item => {
            return item.toString() === productId.toString()
        })

        if (currentProductIndex === -1) {
            wishlist.products.push(productId);
            await wishlist.save();
            return res.status(201).json({
                success: true,
                message: "Item added to Wishlist."
            })
        } else {
            wishlist.products.splice(currentProductIndex, 1);
            await wishlist.save();
            return res.status(201).json({
                success: true,
                message: "Item removed from Wishlist."
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

const fetchAllWishlist = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(403).json({
                success: false,
                message: "User Id is required."
            })
        }
        
        let wishlist = await Wishlist.findOne({ user: userId }).populate([
            { path: 'products', populate: { path: 'brand', select: 'name' } },
            { path: 'products', populate: { path: 'subcategory', select: 'name' } }
        ]);

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist is empty."
            });
        }

        const wishlistItems = wishlist.products.filter(item => {
            return item._id;
        })

        if (wishlist.products.length > wishlistItems.length) {
            wishlist.products = wishlistItems;
            await wishlist.save();
        }

        return res.status(201).json({
            success: true,
            wishlistList: wishlistItems
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

module.exports = {
    createWishlist,
    fetchAllWishlist
}