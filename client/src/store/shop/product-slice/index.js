import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        const response = await axios.get(`http://localhost:3000/api/shop/products/get?${query}`,)
        return response?.data
    }
)


export const fetchProductDetails = createAsyncThunk(
    '/products/fetchproductdetails',
    async (id) => {
        const response = await axios.get(`http://localhost:3000/api/shop/products/get/${id}`,)
        return response?.data
    }
)

const UserProductsSlice = createSlice({
    name:'userProducts',
    initialState,
    reducers : {},
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

export const {} = UserProductsSlice.actions

export default UserProductsSlice.reducer