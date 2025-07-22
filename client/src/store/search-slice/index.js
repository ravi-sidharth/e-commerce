import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResult: [],
};

export const searchProduct = createAsyncThunk(
  "/shop/searchProduct",
  async (keyword) => {
    try {
      const response = await axiosInstance.get(
        `/api/shopping/search/${keyword}`
      );
      return response?.data;
    } catch (error) {
      console.error("Create Order Error", error?.response?.data);
      return error?.response?.data;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetsearchResult: (state) => {
      state.searchResult = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResult = action.payload.data;
      })
      .addCase(searchProduct.rejected, (state) => {
        state.isLoading = false;
        state.searchResult = [];
      });
  },
});

export const { resetsearchResult } = searchSlice.actions;

export default searchSlice.reducer;
