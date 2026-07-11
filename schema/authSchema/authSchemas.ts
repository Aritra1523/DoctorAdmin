
import * as yup from "yup";
//Login Schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email cannot be empty")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(6, "Password must be at least 6 characters"),
});




