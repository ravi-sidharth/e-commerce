import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth-slice/index.js'

import AdminProductsSlice from './product-slice/index.js'
import AdminCategorySlice from './category-slice/index.js'
import AdminBrandSlice from './brand-slice/index.js'
import AdminSubCategorySlice from './subcategory-slice/index.js'

import ShopProductsSlice from './shopping-product-slice/index.js'
import ShopCartSlice from './cart-slice/index.js'
import ShopAddressSlice from './address-slice/index.js'
import ShopOrderSlice from './shop-order-slice/index.js'
import AdminOrderSlice from './admin-order-slice/index.js'
import ShopSearchSlice from './search-slice/index.js'
import shopReviewSlice from './review-slice/index.js'
import shopWishlistSlice from './wishlist-slice/index.js'
import slideImageFeatureSlice from './slider-feature-slice/index.js'

const store = configureStore({
    reducer: {
        auth: authSlice,

        adminProduct: AdminProductsSlice,
        adminOrder: AdminOrderSlice,
        adminCategory: AdminCategorySlice,
        adminBrand: AdminBrandSlice,
        adminSubCategory: AdminSubCategorySlice,
        
        shoppingProduct: ShopProductsSlice,
        shoppingCart: ShopCartSlice,
        shopAddress: ShopAddressSlice,
        shopOrder: ShopOrderSlice,
        shopSearch: ShopSearchSlice,
        shopReview: shopReviewSlice,
        shopWishlist: shopWishlistSlice,
        slideImageFeature: slideImageFeatureSlice
    }
})

export default store