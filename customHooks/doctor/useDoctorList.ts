"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getDoctorList } from "@/redux/slice/admin/doctorSlice/doctorSlice";

const useDoctorList = (page?: number, limit?: number) => {
  const dispatch = useDispatch<AppDispatch>();

  const { doctors, loading, error,total, totalPages, page: currentPage } = useSelector(
    (state: RootState) => state.doctor
  );

useEffect(() => {
    if (page && limit) {
      dispatch(getDoctorList({ page, limit }));
    } else {
      dispatch(getDoctorList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, limit]);

  return {
    doctors,
    loading,
    error,
    total,
    totalPages,
    page: currentPage,
  };
};

export default useDoctorList;