"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DiagnosticCenterFormData,
  diagnosticCenterSchema,
} from "@/schema/diagnosticCenterSchema/diagnosticCenterSchema";
import { useRouter } from "next/navigation";
import { createDiagnosticCenter } from "@/redux/slice/diagnosticCenterSlice/diagnosticCenterSlice";

const useCreateDiagnosticCenter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DiagnosticCenterFormData>({
    resolver: yupResolver(diagnosticCenterSchema),
  });

  const onSubmit = async (data: DiagnosticCenterFormData) => {
    try {
      await dispatch(createDiagnosticCenter(data)).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Diagnostic Center Created",
      });

      reset();
      router.push("/diagnostic-centers/list");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error,
      });
    }
  };

  const handleBack = () => {
    router.push("/diagnostic-centers/list");
  };

  // Fills lat/lng from the browser's geolocation API
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      Swal.fire({
        icon: "error",
        title: "Geolocation is not supported in this browser",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setValue("lat", Number(pos.coords.latitude.toFixed(6)), {
          shouldValidate: true,
        });
        setValue("lng", Number(pos.coords.longitude.toFixed(6)), {
          shouldValidate: true,
        });
      },
      () => {
        Swal.fire({
          icon: "error",
          title: "Could not get your location",
          text: "Enter coordinates manually.",
        });
      },
    );
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    isSubmitting,
    handleBack,
    useMyLocation,
  };
};

export default useCreateDiagnosticCenter;