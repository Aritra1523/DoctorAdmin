


"use client";

import useDoctorAppointment from "@/customHooks/AppointmentList/useDoctorAppointment";


interface DoctorDetailsProps {
  id: string;
}

export default function DoctorDetails({ id }: DoctorDetailsProps) {
  const { doctorAppointments, loading } = useDoctorAppointment(id);

  return (
    <div>
      <h2>Doctor Details</h2>

      <p>ID : {id}</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        doctorAppointments.map((item: any) => (
          <div key={item._id}>
            {item.patientName}
          </div>
        ))
      )}
    </div>
  );
}