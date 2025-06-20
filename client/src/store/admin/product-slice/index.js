import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    products: []
}

export const addNewProduct = createAsyncThunk(
    '/products/addnewproduct',
    async (formData) => {
        const response = await axiosInstance.post(
            '/api/admin/products/add',
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
        const response = await axiosInstance.get('/api/admin/products/get',)
        return response?.data
    }
)

export const editProduct = createAsyncThunk(
    '/products/editproduct',
    async ({ id, formData }) => {
        const response = await axiosInstance.put(
            `/api/admin/products/edit/${id}`,
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
    async (id) => {
        const response = await axiosInstance.delete(
            `/api/admin/products/delete/${id}`,
            {
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
            state.isLoading = false
            state.products = action.payload.data
        }).addCase(fetchAllProducts.rejected, (state) => {
            state.isLoading = false
            state.products = []

        })
    }
})

export const {} = AdminProductsSlice.actions

export default AdminProductsSlice.reducer