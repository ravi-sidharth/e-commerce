import axiosInstance from "@/utils/axiosInstance"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading:false ,
    searchResults :[]
}


export const getSearchResults = createAsyncThunk('/shop/search',async(keyword)=> {
    const response = await axiosInstance.get(`/shop/search/${keyword}`)
    return response.data
})
const shopSearchSlice = createSlice({
    name :'shopSearchSlice',
    initialState,
    reducers :{
        resetSearchResults :(state) => {
            state.searchResults = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSearchResults.pending,(state)=> {
            state.isLoading = true
        }).addCase(getSearchResults.fulfilled,(state,action)=> {
            state.isLoading = false
            state.searchResults = action.payload.data
        }).addCase(getSearchResults.rejected,(state)=> {
            state.isLoading = false
            state.searchResults = []
        })
    }
})


export const {resetSearchResults} = shopSearchSlice.actions

export default shopSearchSlice.reducer 