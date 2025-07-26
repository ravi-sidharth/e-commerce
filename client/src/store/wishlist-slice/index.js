import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  wishlistList: [],
};

export const createWishlist = createAsyncThunk(
  "/wishlist/createWishlist",
  async (wishlistData) => {
    try {
      const response = await axiosInstance.post(
        `/api/shopping/wishlist/create`,
        wishlistData
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const fetchAllWishlist = createAsyncThunk(
  "/wishlist/fetchAllWishlist",
  async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/api/shopping/wishlist/list/${userId}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistList = action?.payload?.success
          ? action?.payload?.wishlistList
          : [];
      })
      .addCase(fetchAllWishlist.rejected, (state) => {
        state.isLoading = false;
        state.wishlistList = [];
      });
  },
});

export default wishlistSlice.reducer;
