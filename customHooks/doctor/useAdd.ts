"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { createDoctor } from "@/redux/slice/admin/doctorSlice/doctorSlice";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DoctorFormData } from "@/typeScript/admin/doctor/doctor";
import { doctorSchema } from "@/schema/doctorAdd/doctorSchema";


const useCreateDoctor = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormData>({
    resolver: yupResolver(doctorSchema),
  });

  const onSubmit = async (data: DoctorFormData) => {
    try {
         const payload = {
      ...data,
      fees: String(data.fees), // Convert number to string
    };
      await dispatch(createDoctor(payload)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Doctor Created Successfully",
      });

      reset();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: err,
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    reset,
    errors,
    isSubmitting,
  };
};

export default useCreateDoctor;