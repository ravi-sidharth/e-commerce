import axiosInstance from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false, 
  shoppingProductList: [], 
  productDetails: [], 
};

export const getShoppingProduct = createAsyncThunk(
  "/shoppingProduct/get",
  async ({ filterParams, sortParams }) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const response = await axiosInstance.get(
        `/api/shopping/product/list?${query}`,
        { withCredentials: true }
      );
      console.log(response.data ,"shopping product")
      return response?.data;
    } catch (error) {
      console.error("Error Fetching Products:", error.response);
      return error.response?.data;
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/shoppingProduct/fetchProductDetails",
  async (id) => {
    try {
      const response = await axiosInstance.get(
        `/api/shopping/product/list/${id}`,
        { withCredentials: true }
      );
      return response?.data;
    } catch (error) {
      console.error("Error Fetching Product Details:", error.response);
      return error.response?.data;
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(getShoppingProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShoppingProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shoppingProductList = action.payload.data;
      })
      .addCase(getShoppingProduct.rejected, (state) => {
        state.isLoading = false;
        state.shoppingProductList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shoppingProductSlice.reducer;
