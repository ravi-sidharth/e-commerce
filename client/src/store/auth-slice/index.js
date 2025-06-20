import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

export const registerUser = createAsyncThunk('/auth/register',
    async (formData) => {
        const response = await axiosInstance.post(
            '/api/auth/register',
            formData,
            {
                withCredentials: true
            }
        );
        return response.data
    }
)

export const loginUser = createAsyncThunk('/auth/login',
    async (formData) => {
        const response = await axiosInstance.post('/api/auth/login', formData, {
            withCredentials: true
        })
        return response.data
    }
)

export const logoutUser = createAsyncThunk('/auth/logout',
    async () => {
        const response = await axiosInstance.post('/api/auth/logout', {}, {
            withCredentials: true
        })

        return response.data

    }
)

export const checkAuth = createAsyncThunk('/auth/checkauth',
    async () => {
        const response = await axiosInstance.get('/api/auth/check-auth', {
            withCredentials: true,
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            }
        },
        )
        return response.data
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        }).addCase(registerUser.rejected, (state) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            }).addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = action.payload.success ? true : false
                state.user = action.payload.success ? action.payload.user : null
            }).addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false,
                    state.isAuthenticated = false,
                    state.user = null
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true
            }).addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = action.payload.success ? true : false
                state.user = action.payload.success ? action.payload.user : null
            }).addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.user = null
            }).addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.user = null
            })
    }
})

export const { setUser } = authSlice.actions

export default authSlice.reducer