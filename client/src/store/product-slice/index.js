import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addProduct = createAsyncThunk("/product/add", async (formData) => {
  try {
    const response = await axiosInstance.post(
      `/api/admin/product/add`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Adding Product:", error.response);
    return error.response?.data;
  }
});

export const fetchAllProducts = createAsyncThunk(
  "/product/getAll",
  async () => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/product/list`,
        { withCredentials: true }
      );
      return response?.data;
    } catch (error) {
      console.error("Error Fetching Products:", error.response);
      return error.response?.data;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "/product/update",
  async ({ newFormData, id }) => {
    try {
      const response = await axiosInstance.put(
        `/api/admin/product/update/${id}`,
        newFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Error Updating Product:", error.response);
      return error.response?.data;
    }
  }
);

export const deleteProduct = createAsyncThunk("/product/delete", async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/admin/product/delete/${id}`,
      { withCredentials: true }
    );
    return response?.data;
  } catch (error) {
    console.error("Error Deleting Product:", error.response);
    return error.response?.data;
  }
});

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload,"action payload")
        state.productList = action.payload.productList;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;
