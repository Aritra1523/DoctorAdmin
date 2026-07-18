"use client";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { AppDispatch } from "@/redux/store/store";
import { acceptAppointment } from "@/redux/slice/admin/appointmentSlice/appointmentSlice";

const useAcceptAppointment = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAccept = async (appointmentId: string) => {
    const result = await Swal.fire({
      title: "Accept Appointment?",
      text: "The appointment will be marked as accepted.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "No",
    });
    if (!result.isConfirmed) return;

    try {
      await dispatch(acceptAppointment(appointmentId)).unwrap();
      Swal.fire({ icon: "success", title: "Appointment Accepted", timer: 1500, showConfirmButton: false });
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Error", text: err });
    }
  };

  return { handleAccept };
};

export default useAcceptAppointment;