import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "@/utils/axiosInstance"

const initialState = {
    isLoading:false,
    reviews : []
}

export const addProductReview = createAsyncThunk('addProductReview',async({productId, userId, userName, reviewMessage, reviewValue })=> {
    const response = await axiosInstance.post('/shop/review/add',{productId, userId, userName, reviewMessage, reviewValue })
    return response.data
})

export const getProductReview = createAsyncThunk('getProductReview',async(productId)=> {
    const response = await axiosInstance.get(`/shop/review/${productId}`)
    return response.data
})

const shopReviewSlice = createSlice({
    name:'shopReviewSlice',
    initialState,
    reducers :{},
    extraReducers :(builder) => {
        builder.addCase(addProductReview.pending ,(state)=> {
            state.isLoading = true
        }).addCase(addProductReview.fulfilled ,(state,action)=> {
            state.isLoading = false
            state.reviews = action.payload.data
        }).addCase(addProductReview.rejected ,(state)=> {
            state.isLoading = false
            state.reviews = []
        }).addCase(getProductReview.pending ,(state)=> {
            state.isLoading = true
        }).addCase(getProductReview.fulfilled ,(state,action)=> {
            state.isLoading = false
            state.reviews = action.payload.data
        }).addCase(getProductReview.rejected ,(state)=> {
            state.isLoading = false
            state.reviews = []
        })
    }

})

export const {} = shopReviewSlice.actions 

export default shopReviewSlice.reducer