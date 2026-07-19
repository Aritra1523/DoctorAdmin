export interface Appointment {
   _id: string;
  doctorId: string;
  userId: string;
  patientName: string;
  doctorName?: string;
  departmentId?: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
}

export interface AppointmentState {
 appointments: Appointment[];
   doctorAppointments: Appointment[];
   acceptedAppointments: Appointment[];
   departmentWiseDoctors: any[];
   loading: boolean;
   error: string | null;
}