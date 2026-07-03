import * as yup from "yup";

export const doctorSchema = yup.object({
  name: yup
    .string()
    .required("Doctor name is required")
    .min(3, "Minimum 3 characters"),

  fees: yup
    .number()
    .typeError("Fees must be a number")
    .required("Fees is required")
    .positive("Fees must be greater than 0"),

  departmentId: yup
    .string()
    .required("Department is required"),

  schedule: yup.object({
    startTime: yup
      .string()
      .required("Start time is required"),

    endTime: yup
      .string()
      .required("End time is required"),

    slotDuration: yup
      .number()
      .typeError("Slot duration must be a number")
      .required("Slot duration is required")
      .positive("Slot duration must be greater than 0"),
  }),
});

export type DoctorFormData = yup.InferType<typeof doctorSchema>;