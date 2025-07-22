import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const userRegister = createAsyncThunk(
  "/auth/register",
  async (userData) => {
    try {
      const response = await axiosInstance.post(
        `/api/auth/register`,
        userData,
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

export const userLogin = createAsyncThunk("/auth/login", async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/api/auth/login`,
      userData,
      { withCredentials: true }
    );
    return response.data; 
  } catch (error) {
    return error.response.data;
  }
});

export const userLogout = createAsyncThunk("/auth/logout", async () => {
  try {
    const response = await axiosInstance.get(
      `/api/auth/logout`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axiosInstance.get(
    `/api/auth/check-auth`,
    {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
        Expires: "0",
      },
    }
  );

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(userLogout.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
