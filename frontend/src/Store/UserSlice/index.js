import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export const sendVerificationEmailAction = createAsyncThunk(
  "user/sendVerificationEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send-verification-email`, { email });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const verifyEmailCodeAction = createAsyncThunk(
  "user/verifyEmailCode",
  async ({ email, verificationCode }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-email`, { email, verificationCode });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const RegisterUserAction = createAsyncThunk(
  "register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const UserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUserAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(RegisterUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.isAuthenticated = false;
          state.user = action.payload.data.newUser;
          state.error = null;
        } else {
          state.error = "Registration failed, please try again.";
        }
      })
      .addCase(RegisterUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || "Registration failed";
      })
      .addCase(sendVerificationEmailAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendVerificationEmailAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.data;
      })
      .addCase(sendVerificationEmailAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyEmailCodeAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmailCodeAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.data;
      })
      .addCase(verifyEmailCodeAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
