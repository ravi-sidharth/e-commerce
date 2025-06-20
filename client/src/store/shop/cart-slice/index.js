import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState = {
    isLoading : false,
    cartItems : [],
}

export const addToCart = createAsyncThunk('cart/addToCart', async({userId, productId, quantity}) => {
    const response = await axiosInstance.post('/shop/cart/add',{userId,productId,quantity})
    return response.data
})

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async(userId)=> {
    const response = await axiosInstance.get(`/shop/cart/get/${userId}`)
    return response.data
})  

export const updateCartItemQty = createAsyncThunk('cart/updateCartItem', async({userId,productId,quantity})=> {
    const response = await axiosInstance.put(`/shop/cart/update-cart`,{userId,productId,quantity})
    return response.data
})

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async({userId,productId})=> {
    const response = await axiosInstance.delete(`/shop/cart/${userId}/${productId}`)
    return response.data
})

const shoppingCartSlice = createSlice({
    name:'shoppingCart',
    initialState ,
    reducers: {},
    extraReducers :(builder)=> {
        builder.addCase(addToCart.pending ,(state)=> {
            state.isLoading = true
        }).addCase(addToCart.fulfilled ,(state,action)=> {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(addToCart.rejected ,(state)=> {
            state.isLoading = false
            state.cartItems =[]
        }).addCase(fetchCartItems.pending ,(state)=> {
            state.isLoading = true
        }).addCase(fetchCartItems.fulfilled ,(state,action)=> {
            state.isLoading = false

            state.cartItems = action.payload.data
        }).addCase(fetchCartItems.rejected ,(state)=> {
            state.isLoading = false
            state.cartItems =[]
        }).addCase(updateCartItemQty.pending ,(state)=> {
            state.isLoading = true
        }).addCase(updateCartItemQty.fulfilled ,(state,action)=> {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(updateCartItemQty.rejected ,(state)=> {
            state.isLoading = false
            state.cartItems =[]
        }).addCase(deleteCartItem.pending ,(state)=> {
            state.isLoading = true
        }).addCase(deleteCartItem.fulfilled ,(state,action)=> {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(deleteCartItem.rejected ,(state)=> {
            state.isLoading = false
            state.cartItems =[]
        })
    }
})

export const {}  = shoppingCartSlice.actions

export default shoppingCartSlice.reducer
