import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoading: false,
  orderDetails: null,
  orderList: [],
};

export const fetchOrderDetailsById = createAsyncThunk(
  "/shop/fetchOrderDetailsById",
  async (orderId) => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/order/details/${orderId}`
      );
      return response?.data;
    } catch (error) {
      console.error("Create Order Error", error?.response?.data);
      return error?.response?.data;
    }
  }
);

export const fetchAllOrder = createAsyncThunk(
  "/shop/fetchAllOrder",
  async () => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/order/list`
      );
      return response?.data;
    } catch (error) {
      console.error("fetch All Order Error", error?.response?.data);
      return error?.response?.data;
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/shop/updateOrderStatus",
  async ({ orderId, formData }) => {
    try {
      const response = await axiosInstance.put(
        `/api/admin/order/update/${orderId}`,
        formData
      );
      return response?.data;
    } catch (error) {
      console.error("update Order Status Error", error?.response?.data);
      return error?.response?.data;
    }
  }
);

const orderSlice = createSlice({
  name: "adminorder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetailsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(fetchOrderDetailsById.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(fetchAllOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(fetchAllOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      });
  },
});

export default orderSlice.reducer;
