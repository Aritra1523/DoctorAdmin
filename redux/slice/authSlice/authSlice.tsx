import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "@/api/baseURL/baseurl";
import { endpoints } from "@/api/endpoints/endpoints";
import {
  LoginPayload,
  LoginResponse,
  AuthState,
} from "@/typeScript/authtypes";
import { deleteCookie, getCookie } from "cookies-next";
import { setCookie } from "cookies-next/client";
import path from "path";
import { toast } from "react-toastify";

const token = (getCookie("toke") as string) ?? null;
const role = (getCookie("role") as string) ?? null;
const user = getCookie("user" as string) ?? null;
// ----- Helper to persist auth state -----
const loadState = (): Partial<AuthState> => {
  try {
    const serialized = localStorage.getItem("authState");
    if (serialized === null) return {};
    return JSON.parse(serialized);
  } catch {
    return {};
  }
};

const saveState = (state: AuthState) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("authState", serialized);
  } catch(error) {
    // ignore
    console.log(error)
  }
};

// ----- Initial State (merge with persisted data) -----
const persisted = loadState();
const initialState: AuthState = {
  user: persisted.user || null,
  token: persisted.token || null,
  loading: false,
  error: null,
  isOtpVerified: persisted.isOtpVerified || false,
};

// ----- Async Thunks -----

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      endpoints.login,
      userData,
    );

    console.log("LOGIN RESPONSE:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
    return rejectWithValue("Something went wrong");
  }
});

// ----- Slice -----
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isOtpVerified = false;
      state.error = null;
      localStorage.removeItem("authState");
      localStorage.removeItem("accessToken");

      deleteCookie("token", { path: "/" });
      deleteCookie("refresh-token", { path: "/" });
      deleteCookie("role", { path: "/" });
      deleteCookie("user", { path: "/" });
      localStorage.removeItem("authState");
    },
    clearError: (state) => {
      state.error = null;
    },
    // Rehydrate from localStorage (called once on app start)
    rehydrate: (state) => {
      const saved = loadState();
      if (saved.user) state.user = saved.user;
      if (saved.token) state.token = saved.token;
      if (saved.isOtpVerified) state.isOtpVerified = saved.isOtpVerified;
    },
  },
  extraReducers: (builder) => {
    builder
// ---- Login ----
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.accessToken;
        state.user = payload.data;
        state.role = payload.data.role;
        state.error = null;
        saveState(state);

        if (payload.status == true) {
          setCookie("token", payload.accessToken, {
            path: "/",
            sameSite: "lax",
          });
          setCookie("refresh-token", payload.refreshToken, {
            path: "/",
            sameSite: "lax",
          });
          setCookie("role", payload.data.role, {
            path: "/",
            sameSite: "lax",
          });
          setCookie("user", JSON.stringify(payload.data), {
            path: "/",
            sameSite: "lax",
          });
          toast.success(payload?.message || "login successful");
        }
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? "Login failed";
      });
  },
});

export const { logout, clearError, rehydrate } = authSlice.actions;
export default authSlice.reducer;


