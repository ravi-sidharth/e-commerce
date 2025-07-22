const express =require('express')
const { createWishlist, fetchAllWishlist } =require('../../controllers/shop/wishlist-controller');

const router=express.Router();

router.post('/create',createWishlist);
router.get('/list/:userId',fetchAllWishlist);

module.exports = router