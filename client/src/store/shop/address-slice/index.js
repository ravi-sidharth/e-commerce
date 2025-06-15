import axios from "axios";
import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    addresses :[]
}


export const addNewAddress = createAsyncThunk('addresses/addNewAddress',async(formData) => {
    const response = await axios.post('http://localhost:3000/api/shop/address/add',formData)
    return response.data
})

export const fetchAllAddresses = createAsyncThunk('addresses/fetchAllAddresses',async(userId) => {
    const response = await axios.get(`http://localhost:3000/api/shop/address/get/${userId}`)
    return response.data
})


export const editaAddress = createAsyncThunk('addresses/editaAddress',async({userId, addressId,formData}) => {
    const response = await axios.put(`http://localhost:3000/api/shop/address/update/${userId}/${addressId}`,formData)
    return response.data
})

export const deleteAddress = createAsyncThunk('addresses/deleteAddress',async({userId, addressId}) => {
    const response = await axios.delete(`http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`)
    return response.data
})  

const shoppingAddressSlice = createSlice({
    name :'address',
    initialState,
    reducers :{},
    extraReducers :(builder)=> {
        builder.addCase(addNewAddress.pending ,(state)=> {
            state.isLoading = true
        }).addCase(addNewAddress.fulfilled ,(state,action)=> {
            state.isLoading = false
        }).addCase(addNewAddress.rejected ,(state)=> {
            state.isLoading = false
        }).addCase(fetchAllAddresses.pending ,(state)=> {
            state.isLoading = true
        }).addCase(fetchAllAddresses.fulfilled ,(state,action)=> {
            state.isLoading = false
            state.addresses = action.payload.data
        }).addCase(fetchAllAddresses.rejected ,(state)=> {
            state.isLoading = false
            state.addresses =[]
        }).addCase(editaAddress.pending ,(state)=> {
            state.isLoading = true
        }).addCase(editaAddress.fulfilled ,(state,action)=> {
            state.isLoading = false
            state.addresses = action.payload.data
        }).addCase(editaAddress.rejected ,(state)=> {
            state.isLoading = false
            state.addresses =[]
        }).addCase(deleteAddress.pending ,(state)=> {
            state.isLoading = true
        }).addCase(deleteAddress.fulfilled ,(state,action)=> {
            state.isLoading = false
            state.addresses = action.payload.data
        }).addCase(deleteAddress.rejected ,(state)=> {
            state.isLoading = false
            state.addresses =[]
        })
    }
})

const {} = shoppingAddressSlice.actions
export default shoppingAddressSlice.reducer