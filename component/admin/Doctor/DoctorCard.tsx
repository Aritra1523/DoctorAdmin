"use client";

import useDeleteDoctor from "@/customHooks/doctor/useDeleteDoctor";
import { Doctor } from "@/typeScript/admin/crud";

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
  onView: (doctor: Doctor) => void;
  onEdit: (doctor: Doctor) => void;
}

const AVATAR_COLORS = [
  "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "bg-green-500/20 text-green-400 border-green-500/30",
  "bg-amber-500/20 text-amber-400 border-amber-500/30",
];

const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const DoctorCard = ({ doctor, index, onView, onEdit }: DoctorCardProps) => {
  const { handleDelete } = useDeleteDoctor();
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <div
      onClick={() => onView(doctor)}
      className="cursor-pointer rounded-xl border border-white/10 bg-[#141417] p-5 transition hover:border-blue-500/40"
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${color}`}
        >
          {initials(doctor.name)}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-white">
            {doctor.name}
          </h2>
          <p className="truncate text-sm text-zinc-400">
            Dept: {doctor.departmentId}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-sm text-zinc-400">
        <p>
          Fees: <span className="text-white">₹{doctor.fees}</span>
        </p>
        <p>
          {doctor.schedule.startTime} – {doctor.schedule.endTime}
        </p>
        <p>Slot duration: {doctor.schedule.slotDuration} mins</p>
      </div>

      <div className="mt-5 flex gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onView(doctor)}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500"
        >
          Details
        </button>
        <button
          onClick={() => onEdit(doctor)}
          className="rounded-md bg-amber-600/90 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-500"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(doctor._id)}
          className="rounded-md bg-red-600/90 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
