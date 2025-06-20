import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "@/utils/axiosInstance"

const initialState = {
    isLoading:false,
    featureImageList : []
}

export const addFeatureImages = createAsyncThunk('uploadFeature-images',async(image) => {
    const response = await axiosInstance.post('/common/feature/add',{image})
    return response.data
})

export const getFeatureImage = createAsyncThunk('getFeature-images',async() => {
    const response =await axiosInstance.get('/common/feature/get')
    return response.data
})

const CommonImageFeatureSlice = createSlice({
    name:'commonImageFeatureSlice',
    initialState,
    reducers :{} ,
    extraReducers : (builder) => {
        builder.addCase(addFeatureImages.pending,(state)=> {
           state.isLoading = true  
        }).addCase(addFeatureImages.fulfilled,(state, action)=> {
            state.isLoading = false
            state.featureImageList = action.payload.data
        }).addCase(addFeatureImages.rejected,(state,action)=> {
            state.isLoading = false
            state.featureImageList = []
        }).addCase(getFeatureImage.pending,(state)=> {
            state.isLoading = true
        }).addCase(getFeatureImage.fulfilled,(state,action)=> {
            state.isLoading = false
            state.featureImageList = action.payload.data
        }).addCase(getFeatureImage.rejected,(state,action)=> {
            state.isLoading = false
            state.featureImageList = []
        })

    }
})

export const {} = CommonImageFeatureSlice.actions

export default CommonImageFeatureSlice.reducer