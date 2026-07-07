// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store/store";
// import { getAppointmentList } from "@/redux/slice/admin/appointmentSlice/appointmentSlice";

// const useAppointmentList = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { appointments, loading, error } = useSelector(
//     (state: RootState) => state.appointment
//   );

//   useEffect(() => {
//     dispatch(getAppointmentList());
//   }, [dispatch]);

//   return {
//     appointments,
//     loading,
//     error,
//   };
// };

// export default useAppointmentList;

"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getAppointmentList } from "@/redux/slice/admin/appointmentSlice/appointmentSlice";
import { getDoctorList } from "@/redux/slice/admin/doctorSlice/doctorSlice";
import { getDepartmentList } from "@/redux/slice/admin/departmentSlice/departmentSlice";

const useAppointmentList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { appointments, loading, error } = useSelector(
    (state: RootState) => state.appointment
  );
  const { doctors } = useSelector((state: RootState) => state.doctor);
  const { departments } = useSelector((state: RootState) => state.department);

  useEffect(() => {
    dispatch(getAppointmentList());
    dispatch(getDoctorList());
    dispatch(getDepartmentList());
  }, [dispatch]);

  // departmentId -> department name
  const departmentMap = useMemo(() => {
    return new Map(departments.map((dept: any) => [dept._id, dept.name]));
  }, [departments]);

  // doctorId -> { name, department }
  const doctorMap = useMemo(() => {
    return new Map(
      doctors.map((doc: any) => [
        doc._id,
        {
          name: doc.name,
          department:
            doc.department?.name ??
            departmentMap.get(doc.departmentId) ??
            "—",
        },
      ])
    );
  }, [doctors, departmentMap]);

  // Merge doctor name + department onto each appointment using doctorId
  const enrichedAppointments = useMemo(() => {
    return appointments.map((appointment: any) => {
      const doctorInfo = doctorMap.get(appointment.doctorId);
      return {
        ...appointment,
        doctorName: doctorInfo?.name ?? appointment.doctorName ?? "—",
        department: doctorInfo?.department ?? "—",
      };
    });
  }, [appointments, doctorMap]);

  return {
    appointments: enrichedAppointments,
    loading,
    error,
  };
};

export default useAppointmentList;