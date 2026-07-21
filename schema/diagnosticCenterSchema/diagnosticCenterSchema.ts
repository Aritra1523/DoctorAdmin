import * as yup from "yup";

export const diagnosticCenterSchema = yup.object({
  name: yup
    .string()
    .required("Center name is required")
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 100 characters"),

  address: yup
    .string()
    .required("Address is required")
    .min(5, "Minimum 5 characters")
    .max(255, "Maximum 255 characters"),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[0-9+\-\s()]{7,15}$/, 
      "Enter a valid phone number (7-15 digits, +, -, spaces, and () allowed)"
    ),

  lat: yup
    .number()
    .typeError("Latitude must be a number")
    .required("Latitude is required")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),

  lng: yup
    .number()
    .typeError("Longitude must be a number")
    .required("Longitude is required")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});

// FIXED: Removed extra closing angle bracket
export type DiagnosticCenterFormData = yup.InferType<typeof diagnosticCenterSchema>;

// Optional: Add a partial schema for updates
export const diagnosticCenterUpdateSchema = diagnosticCenterSchema.partial();

// Optional: Add a schema for nearby search
export const nearbySearchSchema = yup.object({
  lat: yup
    .number()
    .typeError("Latitude must be a number")
    .required("Latitude is required")
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  
  lng: yup
    .number()
    .typeError("Longitude must be a number")
    .required("Longitude is required")
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  
  distance: yup
    .number()
    .typeError("Distance must be a number")
    .min(1, "Minimum distance is 1 km")
    .max(100, "Maximum distance is 100 km")
    .default(10),
});

export type NearbySearchFormData = yup.InferType<typeof nearbySearchSchema>;