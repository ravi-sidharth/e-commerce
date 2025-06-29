import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState =  {
    isLoading : true, 
    products:[],
    productDetails:null
}

export const fetchAllFilteredProducts = createAsyncThunk(
    '/products/fetchallproducts',
    async ({filterParams,sortParams}) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy:sortParams
        })
        const response = await axiosInstance.get(`/api/shop/products/get?${query}`,)
        return response?.data
    }
)


export const fetchProductDetails = createAsyncThunk(
    '/products/fetchproductdetails',
    async (id) => {
        const response = await axiosInstance.get(`/api/shop/products/get/${id}`,)
        return response?.data
    }
)

const shopProductsSlice = createSlice({
    name:'shopProducts',
    initialState,
    reducers : {
        setProductsDetail: (state) => {
            state.productDetails = null
        }
    },
    extraReducers:( builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload.data
        }).addCase(fetchAllFilteredProducts.rejected, (state,action) => {
            state.isLoading = false
            state.products = []

        }).addCase(fetchProductDetails.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.productDetails = action.payload.data
        }).addCase(fetchProductDetails.rejected, (state) => {
            state.isLoading = false
            state.productDetails = null

        })
    }
})

export const {setProductsDetail} = shopProductsSlice.actions

export default shopProductsSlice.reducer