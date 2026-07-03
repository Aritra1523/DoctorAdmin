import { configureStore } from "@reduxjs/toolkit"
import doctorReducer from "../slice/admin/doctorSlice/doctorSlice"
import departmentReducer from "../slice/admin/departmentSlice/departmentSlice";
import authReducer from "../slice/authSlice/authSlice"
import appointmentReducer from "../slice/admin/appointmentSlice/appointmentSlice"
export const store=configureStore({
    reducer:{
         auth:authReducer ,
        doctor:doctorReducer,
        department:departmentReducer,
        appointment: appointmentReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;