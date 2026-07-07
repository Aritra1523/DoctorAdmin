export const endpoints = {
  // otp: "auth/verify_otp",
  login: "auth/login",
  // doctorList: "user/doctor/list",
  // doctorAppointment: "doctor/appointment",
  // Admin
  departmentCreate: "admin/doctor/department",
  departmentList: "admin/departments/list",
  departmentUpdate: "admin/department/update",
  departmentDelete: "admin/department/delete",

  // Doctor
  adminDoctorList: "admin/doctor/list",
  doctorDetails: "admin/doctor/details",
  doctorUpdate: "admin/doctor/update",
  doctorDelete: "admin/doctor/delete",
  doctorAdd: "admin/doctor/create",

  //Appointments
  appointmentList: "appointment/list",
  doctorAppointment: "/admin/doctor/appointment",
  cancelAppointment: "/admin/doctor/appointment/cancelld",

  acceptedlist:"/admin/appointment/acceptedlist"
};
