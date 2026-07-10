import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AxiosError } from "axios";
import {
  DoctorFormData,
  DoctorState,
  UpdateDoctorPayload,
} from "@/typeScript/admin/doctor/doctor";
import axiosInstance from "@/api/baseURL/baseurl";
import { endpoints } from "@/api/endpoints/endpoints";

const initialState: DoctorState = {
  doctors: [],
  doctor: null,
  loading: false,
  error: null,
  success: false,
  page: 1,
  limit: 0,
  total: 0,
  totalPages: 1,
};
interface DoctorListParams {
  page?: number;
  limit?: number;
}
//Doctor List
export const getDoctorList = createAsyncThunk<
  any,
  DoctorListParams | void,
  { rejectValue: string }
>("doctor/list", async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.adminDoctorList,{ params: params?.page && params?.limit
        ? { page: params.page, limit: params.limit }
        : undefined,});

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctors",
    );
  }
});

//Doctor Details
export const getDoctorDetails = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("doctor/details", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `${endpoints.doctorDetails}/${id}`,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctor details",
    );
  }
});

//Update Doctor
export const updateDoctor = createAsyncThunk<
  any,
  UpdateDoctorPayload,
  { rejectValue: string }
>("doctor/update", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.doctorUpdate, data);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Doctor update failed",
    );
  }
});
//Delete Doctor
export const deleteDoctor = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("doctor/delete", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.doctorDelete, {
      id,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Doctor delete failed",
    );
  }
});

//Add Doctor
export const createDoctor = createAsyncThunk(
  "doctor/create",
  async (data: DoctorFormData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(endpoints.doctorAdd, data);

      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
// export const bookAppointment = createAsyncThunk(
//   "doctor/bookAppointment",
//   async (
//     appointmentData: AppointmentPayload,
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axiosInstance.post(
//         endpoints.doctorAppointment,
//         appointmentData
//       );

//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message ||
//           "Appointment booking failed"
//       );
//     }
//   }
// );

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ================= LIST =================

      .addCase(getDoctorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDoctorList.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload.data;
         const sentPage = action.meta.arg?.page;
        const sentLimit = action.meta.arg?.limit;
        state.page = action.payload.page ?? sentPage ?? 1;
        state.limit = action.payload.limit ?? sentLimit ?? action.payload.data.length;
        state.total = action.payload.total ?? action.payload.data.length;
        state.totalPages =
          action.payload.totalPages ??
          Math.max(1, Math.ceil(state.total / (state.limit || 1)));
      })

      .addCase(getDoctorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed";
      })

      // ================= DETAILS =================

      .addCase(getDoctorDetails.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDoctorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload.data;
      })

      .addCase(getDoctorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed";
      })

      // ================= UPDATE =================

      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // Assuming the API returns the updated doctor under action.payload.data
        const updatedDoctor = action.payload?.data;
        if (updatedDoctor) {
          // Update in the doctors list
          const index = state.doctors.findIndex(
            (doc) => doc._id === updatedDoctor._id,
          );
          if (index !== -1) {
            state.doctors[index] = updatedDoctor;
          }
          // Update the single doctor if it's currently being viewed
          if (state.doctor && state.doctor._id === updatedDoctor._id) {
            state.doctor = updatedDoctor;
          }
        }
      })

      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Update Failed";
      })

      // ================= DELETE =================

      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Remove the deleted doctor from the list using the id from the action meta
        const deletedId = action.meta.arg; // the id passed to the thunk
        state.doctors = state.doctors.filter((doc) => doc._id !== deletedId);
        if (state.doctor && state.doctor._id === deletedId) {
          state.doctor = null;
        }
      })

      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Delete Failed";
      })

      //add doctor
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors.unshift(action.payload);
        //state.doctors.push(action.payload);
      })

      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default doctorSlice.reducer;
