const Review = require('../../models/Review')
const Order = require('../../models/Order')

const addProductReview = async (req, res) => {
    try {
        const { user, product, comment, rating } = req.body;

        if (!user || !product || !comment || rating === undefined) {
            return res.status(400).json({
                success: false,
                message: "User, product, comment, and rating are required."
            });
        }

        const isProductUserBuy = await Order.findOne({id:product , user})
        if (!isProductUserBuy) {
            return res.status(400).json({
                success:false,
                message: "You have to first purchase this product then you can able to submit review."
            })
        }
        const review = await Review.create({
            user,
            product,
            comment,
            rating
        });

        return res.status(201).json({
            success: true,
            message: "Review posted successfully.",
            review
        });

    } catch (error) {
        console.error("Review creation error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Please try again later."
        });
    }
}


const getProductReview = async (req, res) => {
    try {
        const {productId,limitValue} = req.params;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "product is required."
            });
        }

        const totalReviews = await Review.find({product:productId}).countDocuments();
        const reviews = await Review.find({product:productId});
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;


        const reviewList = await Review.find({product:productId}).populate('user','userName').limit(limitValue).sort({_id:-1});

        const reviewDetails={
            reviewList,
            totalReviews,
            avgRating
        }
        return res.status(200).json({
            success: true,
            message: "Review posted successfully.",
            reviewDetails
        });

    } catch (error) {
        console.error("Review fetching error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Please try again later."
        });
    }
}

module.exports = {
    addProductReview,
    getProductReview
}   