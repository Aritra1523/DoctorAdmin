"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getAllDoctorsForStats } from "@/redux/slice/admin/doctorSlice/doctorSlice";

const useAllDoctorsForStats = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allDoctorsForStats, allDoctorsForStatsLoading } = useSelector(
    (state: RootState) => state.doctor,
  );

  useEffect(() => {
    dispatch(getAllDoctorsForStats());
  }, [dispatch]);

  return {
    doctors: allDoctorsForStats,
    loading: allDoctorsForStatsLoading,
  };
};

export default useAllDoctorsForStats;