import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice/index'
import adminProductsSlice from './admin/product-slice/index'
import shopProductsSlice from './shop/product-slice/index'
import shopCartSlice from './shop/cart-slice/index'
import shopAddressSlice from './shop/address-slice/index'
import shopOrderSlice from './shop/order-slice/index'

const store = configureStore({
  reducer: {
    auth: authReducer,
    AdminProducts : adminProductsSlice,
    shopProducts : shopProductsSlice,
    shopCart : shopCartSlice,
    shopAddress : shopAddressSlice,
    shopOrder : shopOrderSlice
  },
})

export default store