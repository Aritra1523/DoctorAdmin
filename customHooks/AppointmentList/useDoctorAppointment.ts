"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getDoctorAppointment } from "@/redux/slice/admin/appointmentSlice/appointmentSlice";

const useDoctorAppointment = (doctorId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const { doctorAppointments, loading, error } = useSelector(
    (state: RootState) => state.appointment
  );

  useEffect(() => {
    if (doctorId) {
      dispatch(getDoctorAppointment(doctorId));
    }
  }, [dispatch, doctorId]);

  return {
    doctorAppointments,
    loading,
    error,
  };
};

export default useDoctorAppointment;