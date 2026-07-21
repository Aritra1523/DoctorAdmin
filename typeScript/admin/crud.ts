export interface DepartmentPayload {
  name: string;
  description: string;
}

export interface Department {
  _id: string;
  name: string;
  description: string;
}

export interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: string | null;
  success: boolean;
}


//DOCTOR

export interface Schedule {
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export interface Doctor {
  _id: string;
  name: string;
  fees: number;
  departmentId: string;
  schedule: Schedule;
}

export interface DoctorState {
  doctors: Doctor[];
  doctor: Doctor | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface UpdateDoctorPayload {
  id: string;
  name: string;
  fees: number;
  departmentId: string;
  schedule: Schedule;
}

// DIAGNOSTIC CENTER

export interface DiagnosticCenterPayload {
  name: string;
  address: string;
  phone: string;
  lat: number | string;
  lng: number | string;
}

export interface DiagnosticCenter {
  _id: string;
  name: string;
  address: string;
  phone: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  distance?: number; // present when returned from the nearby-search endpoint
}

export interface DiagnosticCenterState {
  centers: DiagnosticCenter[];
  loading: boolean;
  error: string | null;
  success: boolean;
}