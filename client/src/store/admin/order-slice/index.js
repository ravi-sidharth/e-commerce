import axiosInstance from "@/utils/axiosInstance"
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    isLoading :false,
    orderList:[],
    orderDetails :null
}

export const getAllOrdersForAdmin = createAsyncThunk('/order/getAllOrdersForAdmin',async()=> {
    const response = await axiosInstance.get('/api/admin/orders/get')
    return response.data

})

export const getOrderDetailsForAdmin = createAsyncThunk('/order/getOrderDetailsForAdmin',async(id)=> {
    const response = await axiosInstance.get(`/api/admin/orders/details/${id}`)
    return response.data
})


export const updateOrderStatus = createAsyncThunk('/order/updateOrderStaus',async({id,orderStatus})=> {
    const response = await axiosInstance.put(`/api/admin/orders/update/${id}`,{orderStatus})
    return response.data
})

const AdminOrderSlice = createSlice({
    name :'adminOrderSlice',
    initialState,
    reducers :{
        resetOrderDetails: (state) => {
            state.orderDetails = null
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getAllOrdersForAdmin.pending,(state)=> {
            state.isLoading = true
        }).addCase(getAllOrdersForAdmin.fulfilled,(state,action)=> {
            state.isLoading = false 
            state.orderList = action?.payload?.data
        }).addCase(getAllOrdersForAdmin.rejected,(state)=> {
            state.isLoading = false 
            state.orderList = []
        }).addCase(getOrderDetailsForAdmin.pending,(state)=> {
            state.isLoading = true
        }).addCase(getOrderDetailsForAdmin.fulfilled,(state,action)=> {
            state.isLoading = false 
            state.orderDetails = action?.payload?.data
        }).addCase(getOrderDetailsForAdmin.rejected,(state)=> {
            state.isLoading = false 
            state.orderDetails = null
        })
    }
})

export const {resetOrderDetails} = AdminOrderSlice.actions

export default AdminOrderSlice.reducer