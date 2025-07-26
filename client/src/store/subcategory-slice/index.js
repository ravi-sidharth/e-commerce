import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  subCategoryList: [],
};

export const addSubCategory = createAsyncThunk(
  "/subcategory/add",
  async (formData) => {
    try {
      const response = await axiosInstance.post(
        `/api/admin/subcategory/add`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  "/subcategory/update",
  async ({ formData, id }) => {
    try {
      const response = await axiosInstance.put(
        `/api/admin/subcategory/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "/subcategory/delete",
  async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/api/admin/subcategory/delete/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchAllSubCategory = createAsyncThunk(
  "/subcategory/list",
  async () => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/subcategory/list`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const subCategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategoryList = action.payload.success
          ? action.payload.subCategoryList
          : [];
      })
      .addCase(fetchAllSubCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default subCategorySlice.reducer;
