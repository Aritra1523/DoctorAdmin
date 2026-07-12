"use client";

import { Doctor } from "@/typeScript/admin/crud";

interface Props {
  doctor: Doctor;
  departmentName?: string; 
}

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
      {label}
    </p>
    <p className="mt-1 text-sm text-white">{value}</p>
  </div>
);

const DoctorDetails = ({ doctor, departmentName }: Props) => {
  const displayDepartment = departmentName || doctor.departmentId || "—";

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Full name" value={doctor.name} />
      <Field label="Fees" value={`₹${doctor.fees}`} />
      <Field label="Department" value={displayDepartment} />
      <Field label="Start time" value={doctor.schedule.startTime} />
      <Field label="End time" value={doctor.schedule.endTime} />
      <Field
        label="Slot duration"
        value={`${doctor.schedule.slotDuration} minutes`}
      />
    </div>
  );
};

export default DoctorDetails;