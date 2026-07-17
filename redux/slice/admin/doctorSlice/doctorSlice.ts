
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { AxiosError } from "axios";
// import {
//   DoctorFormData,
//   DoctorState,
//   UpdateDoctorPayload,
// } from "@/typeScript/admin/doctor/doctor";
// import axiosInstance from "@/api/baseURL/baseurl";
// import { endpoints } from "@/api/endpoints/endpoints";

// const initialState: DoctorState = {
//   doctors: [],
//   doctor: null,
//   loading: false,
//   error: null,
//   success: false,
//   page: 1,
//   limit: 0,
//   total: 0,
//   totalPages: 1,
// };
// interface DoctorListParams {
//   page?: number;
//   limit?: number;
// }
// //Doctor List
// export const getDoctorList = createAsyncThunk<
//   any,
//   DoctorListParams | void,
//   { rejectValue: string }
// >("doctor/list", async (params, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.get(endpoints.adminDoctorList,{ params: params?.page && params?.limit
//         ? { page: params.page, limit: params.limit }
//         : undefined,});

//     return response.data;
//   } catch (error) {
//     const err = error as AxiosError<{ message: string }>;

//     return rejectWithValue(
//       err.response?.data?.message || "Failed to fetch doctors",
//     );
//   }
// });

// //Doctor Details
// export const getDoctorDetails = createAsyncThunk<
//   any,
//   string,
//   { rejectValue: string }
// >("doctor/details", async (id, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.get(
//       `${endpoints.doctorDetails}/${id}`,
//     );

//     return response.data;
//   } catch (error) {
//     const err = error as AxiosError<{ message: string }>;

//     return rejectWithValue(
//       err.response?.data?.message || "Failed to fetch doctor details",
//     );
//   }
// });

// //Update Doctor
// export const updateDoctor = createAsyncThunk<
//   any,
//   UpdateDoctorPayload,
//   { rejectValue: string }
// >("doctor/update", async (data, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(endpoints.doctorUpdate, data);

//     return response.data;
//   } catch (error) {
//     const err = error as AxiosError<{ message: string }>;

//     return rejectWithValue(
//       err.response?.data?.message || "Doctor update failed",
//     );
//   }
// });
// //Delete Doctor
// export const deleteDoctor = createAsyncThunk<
//   any,
//   string,
//   { rejectValue: string }
// >("doctor/delete", async (id, { rejectWithValue }) => {
//   try {
//     const response = await axiosInstance.post(endpoints.doctorDelete, {
//       id,
//     });

//     return response.data;
//   } catch (error) {
//     const err = error as AxiosError<{ message: string }>;

//     return rejectWithValue(
//       err.response?.data?.message || "Doctor delete failed",
//     );
//   }
// });

// //Add Doctor
// export const createDoctor = createAsyncThunk(
//   "doctor/create",
//   async (data: DoctorFormData, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post(endpoints.doctorAdd, data);

//       return res.data.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message);
//     }
//   },
// );
// // export const bookAppointment = createAsyncThunk(
// //   "doctor/bookAppointment",
// //   async (
// //     appointmentData: AppointmentPayload,
// //     { rejectWithValue }
// //   ) => {
// //     try {
// //       const response = await axiosInstance.post(
// //         endpoints.doctorAppointment,
// //         appointmentData
// //       );

// //       return response.data;
// //     } catch (error: any) {
// //       return rejectWithValue(
// //         error.response?.data?.message ||
// //           "Appointment booking failed"
// //       );
// //     }
// //   }
// // );

// const doctorSlice = createSlice({
//   name: "doctor",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder

//       // ================= LIST =================

//       .addCase(getDoctorList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(getDoctorList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.doctors = action.payload.data;
//          const sentPage = action.meta.arg?.page;
//         const sentLimit = action.meta.arg?.limit;
//         state.page = action.payload.page ?? sentPage ?? 1;
//         state.limit = action.payload.limit ?? sentLimit ?? action.payload.data.length;
//         state.total = action.payload.totalItems ?? action.payload.total ?? action.payload.data.length;
//         state.totalPages =
//           action.payload.totalPages ??
//           Math.max(1, Math.ceil(state.total / (state.limit || 1)));
//       })

//       .addCase(getDoctorList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "Failed";
//       })

//       // ================= DETAILS =================

//       .addCase(getDoctorDetails.pending, (state) => {
//         state.loading = true;
//       })

//       .addCase(getDoctorDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.doctor = action.payload.data;
//       })

//       .addCase(getDoctorDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "Failed";
//       })

//       // ================= UPDATE =================

//       .addCase(updateDoctor.pending, (state) => {
//         state.loading = true;
//       })

//       .addCase(updateDoctor.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;

//         // Assuming the API returns the updated doctor under action.payload.data
//         const updatedDoctor = action.payload?.data;
//         if (updatedDoctor) {
//           // Update in the doctors list
//           const index = state.doctors.findIndex(
//             (doc) => doc._id === updatedDoctor._id,
//           );
//           if (index !== -1) {
//             state.doctors[index] = updatedDoctor;
//           }
//           // Update the single doctor if it's currently being viewed
//           if (state.doctor && state.doctor._id === updatedDoctor._id) {
//             state.doctor = updatedDoctor;
//           }
//         }
//       })

//       .addCase(updateDoctor.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "Update Failed";
//       })

//       // ================= DELETE =================

//       .addCase(deleteDoctor.pending, (state) => {
//         state.loading = true;
//       })

//       .addCase(deleteDoctor.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         // Remove from local list so UI updates instantly without re-fetch
//         const deletedId = action.meta.arg;
//         state.doctors = state.doctors.filter((doc) => doc._id !== deletedId);
//         if (state.doctor && state.doctor._id === deletedId) {
//           state.doctor = null;
//         }
//         // Keep total in sync so stat card stays correct
//         state.total = Math.max(0, state.total - 1);
//         state.totalPages = Math.max(1, Math.ceil(state.total / (state.limit || 1)));
//       })

//       .addCase(deleteDoctor.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "Delete Failed";
//       })

//       //add doctor
//       .addCase(createDoctor.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(createDoctor.fulfilled, (state) => {
//         state.loading = false;
//         // Do NOT mutate state.doctors — list is server-side paginated.
//         // DoctorList will re-fetch page 1 via onSuccess -> setPage(1).
//         state.total = state.total + 1;
//         state.totalPages = Math.max(1, Math.ceil(state.total / (state.limit || 1)));
//       })

//       .addCase(createDoctor.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default doctorSlice.reducer;






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
  allDoctorsForStats: [],
  allDoctorsForStatsLoading: false,
};

interface DoctorListParams {
  page?: number;
  limit?: number;
}

// Doctor List
export const getDoctorList = createAsyncThunk<
  any,
  DoctorListParams | void,
  { rejectValue: string }
>("doctor/list", async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.adminDoctorList, {
      params: params?.page && params?.limit
        ? { page: params.page, limit: params.limit }
        : undefined,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctors",
    );
  }
});

// Full doctor list for stat cards ONLY (fees / avg slot duration) —
// intentionally kept separate from getDoctorList so it never conflicts
// with the paginated table state.
export const getAllDoctorsForStats = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("doctor/allForStats", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.adminDoctorList);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctor stats",
    );
  }
});

// Doctor Details
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

// Update Doctor
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

// Delete Doctor
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

// Add Doctor
export const createDoctor = createAsyncThunk<
  any,
  DoctorFormData,
  { rejectValue: string }
>("doctor/create", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post(endpoints.doctorAdd, data);
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Doctor creation failed");
  }
});

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    // Add reset state reducer if needed
    resetDoctorState: (state) => {
      state.doctor = null;
      state.success = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= LIST =================
      .addCase(getDoctorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorList.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload.data || [];
        const sentPage = action.meta.arg?.page;
        const sentLimit = action.meta.arg?.limit;
        state.page = action.payload.page ?? sentPage ?? 1;
        state.limit = action.payload.limit ?? sentLimit ?? action.payload.data?.length ?? 0;
        state.total = action.payload.totalItems ?? action.payload.total ?? action.payload.data?.length ?? 0;
        state.totalPages =
          action.payload.totalPages ??
          Math.max(1, Math.ceil(state.total / (state.limit || 1)));
      })
      .addCase(getDoctorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch doctors";
      })

      // ================= ALL (STATS ONLY) =================
      .addCase(getAllDoctorsForStats.pending, (state) => {
        state.allDoctorsForStatsLoading = true;
        state.error = null;
      })
      .addCase(getAllDoctorsForStats.fulfilled, (state, action) => {
        state.allDoctorsForStatsLoading = false;
        state.allDoctorsForStats = action.payload.data || [];
      })
      .addCase(getAllDoctorsForStats.rejected, (state, action) => {
        state.allDoctorsForStatsLoading = false;
        state.error = action.payload ?? "Failed to fetch doctor stats";
      })

      // ================= DETAILS =================
      .addCase(getDoctorDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload.data || null;
      })
      .addCase(getDoctorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch doctor details";
      })

      // ================= UPDATE =================
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedDoctor = action.payload?.data;
        if (updatedDoctor) {
          // Update in doctors list
          const index = state.doctors.findIndex(
            (doc) => doc._id === updatedDoctor._id,
          );
          if (index !== -1) {
            state.doctors[index] = updatedDoctor;
          }
          
          // Update current doctor if it's the same
          if (state.doctor && state.doctor._id === updatedDoctor._id) {
            state.doctor = updatedDoctor;
          }
          
          // Update in stats list
          const statsIndex = state.allDoctorsForStats.findIndex(
            (doc) => doc._id === updatedDoctor._id,
          );
          if (statsIndex !== -1) {
            state.allDoctorsForStats[statsIndex] = updatedDoctor;
          }
        }
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Update Failed";
        state.success = false;
      })

      // ================= DELETE =================
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        const deletedId = action.meta.arg;
        
        // Remove from doctors list
        state.doctors = state.doctors.filter((doc) => doc._id !== deletedId);
        
        // Clear current doctor if deleted
        if (state.doctor && state.doctor._id === deletedId) {
          state.doctor = null;
        }
        
        // Update pagination
        state.total = Math.max(0, state.total - 1);
        state.totalPages = Math.max(1, Math.ceil(state.total / (state.limit || 1)));
        
        // Remove from stats list
        state.allDoctorsForStats = state.allDoctorsForStats.filter(
          (doc) => doc._id !== deletedId,
        );
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Delete Failed";
        state.success = false;
      })

      // ================= ADD DOCTOR =================
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        // Update pagination
        state.total = state.total + 1;
        state.totalPages = Math.max(1, Math.ceil(state.total / (state.limit || 1)));
        
        // Add to stats list if payload exists
        if (action.payload) {
          state.allDoctorsForStats.push(action.payload);
        }
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Doctor creation failed";
        state.success = false;
      });
  },
});

export const { resetDoctorState, clearError } = doctorSlice.actions;
export default doctorSlice.reducer;