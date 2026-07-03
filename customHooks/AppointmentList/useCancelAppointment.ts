"use client";

import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { AppDispatch } from "@/redux/store/store";
import { cancelAppointment } from "@/redux/slice/admin/appointmentSlice/appointmentSlice";

const useCancelAppointment = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleCancel = async (appointmentId: string) => {
    const result = await Swal.fire({
      title: "Cancel Appointment?",
      text: "You can not undo this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(cancelAppointment(appointmentId)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Appointment Cancelled",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err,
      });
    }
  };

  return {
    handleCancel,
  };
};

export default useCancelAppointment;