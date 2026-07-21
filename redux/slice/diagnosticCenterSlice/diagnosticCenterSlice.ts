import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import axiosInstance from "@/api/baseURL/baseurl";
import { endpoints } from "@/api/endpoints/endpoints";
import {
  DiagnosticCenterPayload,
  DiagnosticCenterState,
} from "@/typeScript/admin/crud";

const initialState: DiagnosticCenterState = {
  centers: [],
  loading: false,
  error: null,
  success: false,
};

// ==================== Create Diagnostic Center ====================

export const createDiagnosticCenter = createAsyncThunk<
  any, // You should replace 'any' with the actual response type
  DiagnosticCenterPayload,
  { rejectValue: string }
>("diagnosticCenter/create", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      endpoints.diagnosticCenterCreate,
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Diagnostic center creation failed",
    );
  }
});

// ==================== Get Nearby Diagnostic Centers ====================

export const getNearbyDiagnosticCenters = createAsyncThunk<
  any, // You should replace 'any' with the actual response type
  { lat: number | string; lng: number | string; distance?: number | string },
  { rejectValue: string }
>("diagnosticCenter/nearby", async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.diagnosticCenterNearby, {
      params,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch nearby centers",
    );
  }
});

const diagnosticCenterSlice = createSlice({
  name: "diagnosticCenter",
  initialState,
  reducers: {
    // Add reset actions for better state management
    resetDiagnosticCenterState: (state) => {
      state.centers = [];
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearDiagnosticCenterError: (state) => {
      state.error = null;
    },
    clearDiagnosticCenterSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // ==================== Create ====================
      .addCase(createDiagnosticCenter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDiagnosticCenter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Optionally add the created center to the list
        if (action.payload?.data) {
          state.centers.push(action.payload.data);
        }
      })
      .addCase(createDiagnosticCenter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? "Diagnostic center creation failed";
      })

      // ==================== Nearby ====================
      .addCase(getNearbyDiagnosticCenters.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false; // Reset success when fetching
      })
      .addCase(getNearbyDiagnosticCenters.fulfilled, (state, action) => {
        state.loading = false;
        state.centers = action.payload?.data || [];
        state.error = null;
      })
      .addCase(getNearbyDiagnosticCenters.rejected, (state, action) => {
        state.loading = false;
        state.centers = []; // Clear centers on error
        state.error = action.payload ?? "Failed to fetch nearby centers";
      });
  },
});

// Export actions
export const {
  resetDiagnosticCenterState,
  clearDiagnosticCenterError,
  clearDiagnosticCenterSuccess,
} = diagnosticCenterSlice.actions;

export default diagnosticCenterSlice.reducer;