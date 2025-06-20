import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice/index'
import adminProductsSlice from './admin/product-slice/index'
import adminOrderSlice from './admin/order-slice/index'

import shopProductsSlice from './shop/product-slice/index'
import shopCartSlice from './shop/cart-slice/index'
import shopAddressSlice from './shop/address-slice/index'
import shopOrderSlice from './shop/order-slice/index'
import shopSearchSlice from './shop/search-slice/index'
import shopReviewSlice from './shop/review-slice/index'

import CommonImageFeatureSlice from './common-slice/index'


const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts : adminProductsSlice,
    adminOrder : adminOrderSlice,
    
    shopProducts : shopProductsSlice,
    shopCart : shopCartSlice,
    shopAddress : shopAddressSlice,
    shopOrder : shopOrderSlice,
    shopSearch : shopSearchSlice,
    shopReview : shopReviewSlice,

    commonFeature :CommonImageFeatureSlice
  },
})

export default store