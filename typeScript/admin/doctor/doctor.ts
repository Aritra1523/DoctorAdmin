// export interface Schedule {
//   startTime: string;
//   endTime: string;
//   slotDuration: number;
// }

// export interface Department {
//   _id: string;
//   name: string;
// }

// export interface Doctor {
//   _id: string;
//   name: string;
//   fees: number;
//   departmentId: string;
//   department?: Department;
//   schedule: Schedule;
// }

// export interface CreateDoctorPayload {
//   name: string;
//   fees: number;
//   departmentId: string;
//   schedule: Schedule;
// }

// export interface UpdateDoctorPayload {
//   id: string;
//   name: string;
//   fees: number;
//   departmentId: string;
//   schedule: Schedule;
// }

// export interface DeleteDoctorPayload {
//   id: string;
// }

// export interface DoctorDetailsResponse {
//   status: boolean;
//   message: string;
//   data: Doctor;
// }

// export interface DoctorListResponse {
//   status: boolean;
//   message: string;
//   data: Doctor[];
// }

// export interface DoctorState {
//   doctors: Doctor[];
//   doctor: Doctor | null;
//   loading: boolean;
//   error: string | null;
//   success: boolean;
//   page: number;
//   limit: number;
//   total: number;
//   totalPages: number;
// }

// export interface DoctorFormData {
//   name: string;
//   fees: number;
//   departmentId: string;
//   schedule: {
//     startTime: string;
//     endTime: string;
//     slotDuration: number;
//   };
// }


export interface Schedule {
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export interface Department {
  _id: string;
  name: string;
}

export interface Doctor {
  _id: string;
  name: string;
  fees: number;
  departmentId: string;
  department?: Department;
  schedule: Schedule;
}

export interface CreateDoctorPayload {
  name: string;
  fees: number;
  departmentId: string;
  schedule: Schedule;
}

export interface UpdateDoctorPayload {
  id: string;
  name: string;
  fees: number;
  departmentId: string;
  schedule: Schedule;
}

export interface DeleteDoctorPayload {
  id: string;
}

export interface DoctorDetailsResponse {
  status: boolean;
  message: string;
  data: Doctor;
}

export interface DoctorListResponse {
  status: boolean;
  message: string;
  data: Doctor[];
}

export interface DoctorState {
  doctors: Doctor[];
  doctor: Doctor | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  // Separate, independent full list used ONLY for aggregate stats
  // (fees / avg slot duration) so it doesn't conflict with the
  // server-side paginated `doctors` array used by the table.
  allDoctorsForStats: Doctor[];
  allDoctorsForStatsLoading: boolean;
}

export interface DoctorFormData {
  name: string;
  fees: number;
  departmentId: string;
  schedule: {
    startTime: string;
    endTime: string;
    slotDuration: number;
  };
}