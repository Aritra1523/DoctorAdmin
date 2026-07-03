"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getDepartmentWiseDoctors } from "@/redux/slice/admin/appointmentSlice/appointmentSlice";

const useDepartmentWiseDoctor = (departmentId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    departmentWiseDoctors,
    loading,
    error,
  } = useSelector((state: RootState) => state.appointment);

  useEffect(() => {
    if (departmentId) {
      dispatch(getDepartmentWiseDoctors(departmentId));
    }
  }, [dispatch, departmentId]);

  return {
    doctors: departmentWiseDoctors,
    loading,
    error,
  };
};

export default useDepartmentWiseDoctor;