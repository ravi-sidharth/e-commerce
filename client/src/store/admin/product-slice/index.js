import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    products: []
}

export const addNewProduct = createAsyncThunk(
    '/products/addnewproduct',
    async (formData) => {
        const response = await axios.post(
            'http://localhost:3000/api/admin/products/add',
            formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        return response?.data
    }
)

export const fetchAllProducts = createAsyncThunk(
    '/products/fetchallproducts',
    async () => {
        const response = await axios.get('http://localhost:3000/api/admin/products/get',)
        return response?.data
    }
)

export const editProduct = createAsyncThunk(
    '/products/editproduct',
    async (id, formData) => {
        const response = await axios.put(
            `http://localhost:3000/api/admin/products/edit/${id}`,
            formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        return response?.data
    }
)

export const deleteProduct = createAsyncThunk(
    '/products/deleteproduct',
    async (id, formData) => {
        const response = await axios.delete(
            `http://localhost:3000/api/admin/products/delete/${id}`,
            formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        return response?.data
    }
)


const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            console.log(action.payload, "appnewproduct payload")
            state.isLoading = false
            state.products = action.payload
        }).addCase(fetchAllProducts.rejected, (state) => {
            state.isLoading = false
            state.products = []

        })
    }
})

export const {} = AdminProductsSlice.actions

export default AdminProductsSlice.reducer