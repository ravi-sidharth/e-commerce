import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "@/utils/axiosInstance"

const initialState = {
    isLoading: false,
    featureImageList: []
}

export const addFeatureImages = createAsyncThunk('uploadFeature-images', async (image) => {
    try {
        const response = await axiosInstance.post('/api/common/feature/add', { image })
        return response.data
    } catch (error) {
        console.error("Add Feature Image Error", error?.response?.data);
        return error?.response?.data;
      }   
    })

export const getFeatureImage = createAsyncThunk('getFeature-images', async () => {
    try {
        const response = await axiosInstance.get('/api/common/feature/get')
        return response.data
    } catch (error) {
        console.error("Slider Image Error", error?.response?.data);
        return error?.response?.data;
      }
    
})

export const deleteFeatureImage = createAsyncThunk('deleteFeature-image', async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/common/feature/${id}`)
        return response.data
    } catch (error) {
        console.error("Delete Slider Image Error", error?.response?.data);
        return error?.response?.data;
      }
})

const CommonImageFeatureSlice = createSlice({
    name: 'commonImageFeatureSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addFeatureImages.pending, (state) => {
            state.isLoading = true
        }).addCase(addFeatureImages.fulfilled, (state, action) => {
            state.isLoading = false
            state.featureImageList = action.payload.data
        }).addCase(addFeatureImages.rejected, (state, action) => {
            state.isLoading = false
            state.featureImageList = []
        }).addCase(getFeatureImage.pending, (state) => {
            state.isLoading = true
        }).addCase(getFeatureImage.fulfilled, (state, action) => {
            state.isLoading = false
            state.featureImageList = action.payload.data
        }).addCase(getFeatureImage.rejected, (state) => {
            state.isLoading = false
            state.featureImageList = []
        })

    }
})

export const { } = CommonImageFeatureSlice.actions

export default CommonImageFeatureSlice.reducer