"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getAppointmentList, getAcceptedAppointmentList } from "@/redux/slice/admin/appointmentSlice/appointmentSlice";
import { getAllDoctorsForStats } from "@/redux/slice/admin/doctorSlice/doctorSlice";
import { getDepartmentList } from "@/redux/slice/admin/departmentSlice/departmentSlice";

const useAppointmentList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { appointments, acceptedAppointments, loading, error } = useSelector(
    (state: RootState) => state.appointment
  );
  const { doctors: allDoctorsForStats } = useSelector(
    (state: RootState) => ({ doctors: state.doctor.allDoctorsForStats })
  );
  const { departments } = useSelector((state: RootState) => state.department);

  useEffect(() => {
    dispatch(getAppointmentList());
    dispatch(getAcceptedAppointmentList());
    dispatch(getAllDoctorsForStats());
    dispatch(getDepartmentList());
  }, [dispatch]);

  // departmentId -> department name
  const departmentMap = useMemo(() => {
    return new Map(departments.map((dept: any) => [dept._id, dept.name]));
  }, [departments]);

  // doctorId -> { name, department }
  const doctorMap = useMemo(() => {
    return new Map(
      allDoctorsForStats.map((doc: any) => [
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
  }, [allDoctorsForStats, departmentMap]);

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

  const enrichedAcceptedAppointments = useMemo(() => {
    return acceptedAppointments.map((appointment: any) => {
      const doctorInfo = doctorMap.get(appointment.doctorId);
      return {
        ...appointment,
        doctorName: doctorInfo?.name ?? appointment.doctorName ?? "—",
        department: doctorInfo?.department ?? "—",
        status: appointment.status ?? "Confirmed",
      };
    });
  }, [acceptedAppointments, doctorMap]);

  return {
    appointments: enrichedAppointments,
    acceptedAppointments: enrichedAcceptedAppointments,
    loading,
    error,
  };
};

export default useAppointmentList;