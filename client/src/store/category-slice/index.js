import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  categoryList: [],
};

export const addNewCategory = createAsyncThunk(
  "/category/add",
  async (formData) => {
    try {
      const response = await axiosInstance.post(
        `/api/admin/category/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error Adding Category:", error.response);
      return error.response?.data;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "/category/update",
  async ({ newFormData, id }) => {
    try {
      const response = await axiosInstance.put(
        `/api/admin/category/update/${id}`,
        newFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error Updating Category:", error.response);
      return error.response?.data;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "/category/delete",
  async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/api/admin/category/delete/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error Deleting Category:", error.response);
      return error.response?.data;
    }
  }
);

export const fetchAllCategory = createAsyncThunk("/category/list", async () => {
  try {
    const response = await axiosInstance.get(
      `/api/admin/category/list`,
    );
    return response.data;
  } catch (error) {
    console.error("Error Fetching Categories:", error.response);
    return error.response?.data;
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCategory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewCategory.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action,"payload data")
        state.categoryList = action?.payload?.success
          ? action?.payload?.categoryList
          : [];
      })
      .addCase(fetchAllCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default categorySlice.reducer;
