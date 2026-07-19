"use client";

import axiosInstance from "@/api/baseURL/baseurl";
import {
  Appointment,
  AppointmentState,
} from "@/typeScript/admin/Appointment/Appointment";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppointmentState = {
  appointments: [],
  doctorAppointments: [],
  acceptedAppointments: [],
  departmentWiseDoctors: [],
  loading: false,
  error: null,
};

/*
   Get All Appointments*/

export const getAppointmentList = createAsyncThunk(
  "appointment/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/admin/doctor/appointment/list",
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch appointments",
      );
    }
  },
);

/* 
   Get Doctor Appointments
 */

export const getDoctorAppointment = createAsyncThunk(
  "appointment/doctor",
  async (doctorId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/admin/doctor/appointment/${doctorId}`,
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctor appointments",
      );
    }
  },
);
/*
   Get Accepted Appointments List
 */

export const getAcceptedAppointmentList = createAsyncThunk(
  "appointment/acceptedList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/admin/appointment/acceptedlist",
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch accepted appointments",
      );
    }
  },
);

//Accept  Appointment
export const acceptAppointment = createAsyncThunk(
  "appointment/accept",
  async (appointmentId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/admin/doctor/appointment/${appointmentId}`);
      return appointmentId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept appointment",
      );
    }
  },
);

/* 
   Cancel Appointment
 */

export const cancelAppointment = createAsyncThunk(
  "appointment/cancel",
  async (appointmentId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.put(
        `/admin/doctor/appointment/cancelld/${appointmentId}`,
      );

      return appointmentId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel appointment",
      );
    }
  },
);

//DepartmentWise Doctors
export const getDepartmentWiseDoctors = createAsyncThunk(
  "appointment/getDepartmentWiseDoctors",
  async (departmentId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/admin/departments/${departmentId}/doctors`,
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

/*  Slice */

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* 
         Appointment List
       */

      .addCase(getAppointmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getAppointmentList.fulfilled,
        (state, action: PayloadAction<Appointment[]>) => {
          state.loading = false;
          state.appointments = action.payload;
        },
      )

      .addCase(getAppointmentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* 
         Doctor Appointment
       */

      .addCase(getDoctorAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getDoctorAppointment.fulfilled,
        (state, action: PayloadAction<Appointment[]>) => {
          state.loading = false;
          state.doctorAppointments = action.payload;
        },
      )

      .addCase(getDoctorAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* 
         Accepted Appointment List
       */

      .addCase(getAcceptedAppointmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getAcceptedAppointmentList.fulfilled,
        (state, action: PayloadAction<Appointment[]>) => {
          state.loading = false;
          state.acceptedAppointments = action.payload;
        },
      )

      .addCase(getAcceptedAppointmentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(acceptAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        acceptAppointment.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.appointments = state.appointments.map((a) =>
            a._id === action.payload ? { ...a, status: "Confirmed" } : a,
          );
          state.doctorAppointments = state.doctorAppointments.map((a) =>
            a._id === action.payload ? { ...a, status: "Confirmed" } : a,
          );
        },
      )
      .addCase(acceptAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* 
         Cancel Appointment
       */

      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        cancelAppointment.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;

          state.appointments = state.appointments.map((appointment) =>
            appointment._id === action.payload
              ? { ...appointment, status: "Cancelled" }
              : appointment,
          );

          state.doctorAppointments = state.doctorAppointments.map(
            (appointment) =>
              appointment._id === action.payload
                ? { ...appointment, status: "Cancelled" }
                : appointment,
          );
          // ✅ remove it from the accepted list since it's no longer accepted
          state.acceptedAppointments = state.acceptedAppointments.filter(
            (appointment) => appointment._id !== action.payload,
          );
        },
      )

      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Department Wise Doctor

      .addCase(getDepartmentWiseDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDepartmentWiseDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentWiseDoctors = action.payload;
      })

      .addCase(getDepartmentWiseDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default appointmentSlice.reducer;
