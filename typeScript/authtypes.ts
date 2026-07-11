export interface Doctor {
  _id: string;
  name: string;
  email: string;
  address: string;
  image?: string;
  department?: string;
  specialization?: string;
  fees?: number;
}

export interface DoctorState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

export interface AppointmentPayload {
  doctorId: string;
  userId: string;
  name: string;
  date: string;
  time: string;
}

// ================= LOGIN =================

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}



// ================= FORM TYPES =================


export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

