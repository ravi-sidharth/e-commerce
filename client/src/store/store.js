import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice/index'
import adminProductsSlice from './admin/product-slice/index'
import userProductsSlice from './shop/product-slice/index'
import shopCartSlice from './shop/cart-slice/index'

const store = configureStore({
  reducer: {
    auth: authReducer,
    AdminProducts : adminProductsSlice,
    userProducts : userProductsSlice,
    shopCart : shopCartSlice
  },
})

export default store