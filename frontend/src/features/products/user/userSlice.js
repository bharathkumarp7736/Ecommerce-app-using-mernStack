import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

// register api
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${API}/api/v1/register`,
        userData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed, Please try again later."
      );
    }
  }
);

// login api
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${API}/api/v1/login`,
        { email, password },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Invalid email or password"
      );
    }
  }
);

// get profile
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/v1/profile`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to load user profile"
      );
    }
  }
);

// logout api
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/v1/logout`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to logout");
    }
  }
);

// update profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${API}/api/v1/profile/update`,
        userData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Profile update failed");
    }
  }
);

// update password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (password, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${API}/api/v1/password/update`,
        password,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Password update failed");
    }
  }
);

// forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${API}/api/v1/password/forgot`,
        { email },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Forgot password failed");
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${API}/api/v1/reset/${token}`,
        userData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Reset password failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",

  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: localStorage.getItem("user") ? true : false,
    message: null,
  },

  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
        state.user = null;
        state.isAuthenticated = false;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Invalid email or password";
        state.user = null;
        state.isAuthenticated = false;
      })

      // load user
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load user profile";
        state.user = null;
        state.isAuthenticated = false;

        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.success = false;
        state.isAuthenticated = false;

        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to logout";
      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload.user;

        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Profile update failed";
      })

      // update password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Password update failed";
      })

      // forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Forgot password failed";
      })

      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Reset password failed";
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;

export default userSlice.reducer;