"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getAppointmentList } from "@/redux/slice/admin/appointmentSlice/appointmentSlice";

const useAppointmentList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { appointments, loading, error } = useSelector(
    (state: RootState) => state.appointment
  );

  useEffect(() => {
    dispatch(getAppointmentList());
  }, [dispatch]);

  return {
    appointments,
    loading,
    error,
  };
};

export default useAppointmentList;