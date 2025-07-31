import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  approvedURL: null,
  orderId: null,
  orderDetails: null,
  orderList: [],
};

export const createOrder = createAsyncThunk(
  "/shop/createOrder",
  async (orderData) => {
    try {
      const response = await axiosInstance.post(
        `/api/shopping/order/createOrder`,
        orderData
      );
      return response?.data;
    } catch (error) {
      console.error("Create Order Error", error?.response?.data);
      return error?.response?.data;
    }
  }
);

export const processPeyment = createAsyncThunk(
  "/order/payment-process",
  async (totalAmount) => {
    try {
      const response = await axiosInstance.post(
        `/api/shopping/order/process-peyment`,
        totalAmount
      );
      return response?.data;
    } catch (error) {
      console.error("Create Order Error", error?.response?.data);
      return error?.response?.data;
    }
  }
);

export const fetchAllOrderByUserId = createAsyncThunk(
  "/shop/fetchAllOrderByUserId",
  async (userId) => {
    try {
      const response = await axiosInstance.get(
        `/api/shopping/order/list/${userId}`
      );
      return response?.data;
    } catch (error) {
      console.error("Create Order Error", error?.response?.data);
      return error?.response?.data;
    }
  }
);

export const fetchOrderDetailsById = createAsyncThunk(
  "/shop/fetchOrderDetailsById",
  async (orderId) => {
    try {
      const response = await axiosInstance.get(
        `/api/shopping/order/details/${orderId}`
      );
      return response?.data;
    } catch (error) {
      console.error("Create Order Error", error?.response?.data);
      return error?.response?.data;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrderByUserId.pending, (state) => {
        state.isLoading = true;
        state.orderList = [];
      })
      .addCase(fetchAllOrderByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.order;
      })
      .addCase(fetchAllOrderByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(fetchOrderDetailsById.pending, (state) => {
        state.isLoading = true;
        state.orderDetails = null;
      })
      .addCase(fetchOrderDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.orderDetails;
      })
      .addCase(fetchOrderDetailsById.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export default orderSlice.reducer;
