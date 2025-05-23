import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState =  {
    isLoading : true, 
    products:[]
}

export const fetchAllFilteredProducts = createAsyncThunk(
    '/products/fetchallproducts',
    async () => {
        const response = await axios.get('http://localhost:3000/api/shop/products/get',)
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
        }).addCase(fetchAllFilteredProducts.rejected, (state) => {
            state.isLoading = false
            state.products = []

        })
    }
})

export const {} = UserProductsSlice.actions

export default UserProductsSlice.reducer