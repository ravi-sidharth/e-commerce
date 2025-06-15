import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    approvalURL:null ,
    isLoading: false,
    orderId:null,
    orderList : [],
    orderDetails : null
}

export const createNewOrder = createAsyncThunk('/order/createNewOrder',async(orderData)=> {
    const response = await axios.post('http://localhost:3000/api/shop/order/create',orderData)
    return response.data

})

export const capturePayment = createAsyncThunk('/order/captureOrder',async({paymentId,payerId,orderId})=> {
    const response = await axios.post('http://localhost:3000/api/shop/order/capture',{paymentId,payerId,orderId})
    return response.data

})

export const getAllOrdersByUser = createAsyncThunk('/order/getAllOrderByUserId',async(userId)=> {
    const response = await axios.get(`http://localhost:3000/api/shop/order/list/${userId}`)
    return response.data
})

export const getOrdersDetail = createAsyncThunk('/order/getOrderDetails',async(id)=> {
    const response = await axios.get(`http://localhost:3000/api/shop/order/details/${id}`)
    return response.data
})


const shoppingOrderSlice = createSlice({
    name:'shoppingOrderSlice',
    initialState,
    reducers:{
        resetOrderDetails: (state) => {
            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending,(state)=> {
            state.isLoading = true
        }).addCase(createNewOrder.fulfilled,(state,action)=> {
            state.isLoading = false
            state.approvalURL = action.payload.approvalURL
            state.orderId = action.payload.orderId
            sessionStorage.setItem('currentCartId',JSON.stringify(action.payload.orderId))
            
        }).addCase(createNewOrder.rejected,(state)=> {
            state.isLoading = false
            state.approvalURL = null
            state.orderId = null
        }).addCase(capturePayment.pending,(state)=> {
            state.isLoading = true
        }).addCase(capturePayment.fulfilled,(state,action)=> {
            state.isLoading = false
            state.orderId = action.payload.orderId
        }).addCase(capturePayment.rejected,(state)=> {
            state.isLoading = false
        }).addCase(getAllOrdersByUser.pending,(state)=> {
            state.isLoading = true
        }).addCase(getAllOrdersByUser.fulfilled,(state,action)=> {
            state.isLoading = false
            state.orderList = action.payload.data
        }).addCase(getAllOrdersByUser.rejected,(state)=> {
            state.isLoading = false
        }).addCase(getOrdersDetail.pending,(state)=> {
            state.isLoading = true
        }).addCase(getOrdersDetail.fulfilled,(state,action)=> {
            state.isLoading = false
            state.orderDetails = action.payload.data
        }).addCase(getOrdersDetail.rejected,(state)=> {
            state.isLoading = false
            state.orderDetails = null
        })
    }
})

export const {resetOrderDetails} = shoppingOrderSlice.actions

export default shoppingOrderSlice.reducer