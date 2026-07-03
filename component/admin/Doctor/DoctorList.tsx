"use client";

import { useMemo, useState } from "react";
import useDoctorList from "@/customHooks/doctor/useDoctorList";
import { Doctor } from "@/typeScript/admin/crud";
import DoctorDetails from "./DoctorDetails";
import EditDoctorForm from "./EditDoctorForm";
import Modal from "../shared/Model";
import DoctorAdd from "./DoctorAdd";
import useDeleteDoctor from "@/customHooks/doctor/useDeleteDoctor";
import axiosInstance from "@/api/baseURL/baseurl";
import axios from "axios";
import useDepartmentList from "@/customHooks/Department/useDepartmentList";
// If you have a delete hook, import it here:
// import useDoctorDelete from "@/customHooks/doctor/useDoctorDelete";

const ACCENT_COLORS = [
  "#3b82f6",
  "#a855f7",
  "#22c55e",
  "#eab308",
  "#ef4444",
  "#a45c2a",
];

// ── SVG Icons ──────────────────────────────────────────
const IconDoctor = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMoney = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

const IconClock = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ── StatCard with icon ───────────────────────────────
const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="rounded-xl border border-white/10 bg-[#141417] p-5 transition hover:border-white/20 hover:bg-[#18181c]">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-400">{label}</p>
      <span className="text-blue-400/80">{icon}</span>
    </div>
    <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
  </div>
);

// ── Main Component ─────────────────────────────────────
const DoctorList = () => {
  const { doctors, loading, error } = useDoctorList();
  const [search, setSearch] = useState("");
  const [viewDoctor, setViewDoctor] = useState<Doctor | null>(null);
  const [editDoctor, setEditDoctor] = useState<Doctor | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // Uncomment if you have the delete hook:
  // const { handleDelete } = useDeleteDoctor();
  const { departments, loading: deptLoading } = useDepartmentList();
  const departmentMap = useMemo(() => {
    return new Map(departments.map((dept) => [dept._id, dept.name]));
  }, [departments]);
  const filtered = useMemo(
    () =>
      doctors.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [doctors, search],
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      const response = await axiosInstance.post("/admin/doctor/delete", { id });

      // Success
      console.log("Delete successful:", response.data);
      alert("Doctor deleted successfully");

      // Refresh your doctor list (e.g., fetchDoctors() or update state)
      //fetchDoctors(); // or setDoctors(prev => prev.filter(doc => doc.id !== id));
    } catch (err) {
      // Handle errors gracefully
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        alert(`Failed to delete doctor: ${message}`);
      } else {
        alert("Failed to delete doctor");
      }
    }
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center text-zinc-400">
        Loading...
      </div>
    );
  if (error) return <p className="p-8 text-red-400">{error}</p>;

  return (
    <div className="min-h-screen bg-[#0a0a0c] p-8 text-white">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Doctors</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage doctor profiles and schedules
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          + Add doctor
        </button>
      </div>

      {/* Stats Row with Icons */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total doctors"
          value={doctors.length}
          icon={<IconDoctor />}
        />
        <StatCard
          label="Total Fees Value"
          value={`₹${doctors.reduce((sum, d) => sum + parseFloat(d.fees), 0)}`}
          icon={<IconMoney />}
        />
        <StatCard
          label="Avg. slot duration"
          value={`${Math.round(doctors.reduce((s, d) => s + d.schedule.slotDuration, 0) / (doctors.length || 1))} min`}
          icon={<IconClock />}
        />
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search doctors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-6 w-full max-w-sm rounded-lg border border-white/10 bg-[#141417] px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-blue-500"
      />

      {/* Table / Empty State */}
      {filtered.length === 0 ? (
        <div className="col-span-full mt-10 flex flex-col items-center justify-center text-center">
          <svg
            className="h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-300">
            No doctors found
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            We couldn’t find any doctors matching your search criteria. Try
            adjusting your filters or search term.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[700px] border-collapse bg-[#141417] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-[#0f0f12]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Doctor
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Specialization
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Fees (₹)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Slot Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doctor, index) => {
                const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
                return (
                  <tr
                    key={doctor._id}
                    className="border-b border-white/5 transition hover:bg-white/5"
                  >
                    <td className="px-4 py-3 text-zinc-300">
                      <span
                        className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
                        style={{ backgroundColor: color }}
                      />
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">
                      {doctor.name}
                    </td>
                    <td className="px-4 py-3 text-zinc-300">
                      {deptLoading
                        ? "…"
                        : departmentMap.get(doctor.departmentId) || "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-300">
                      {doctor.fees || "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-300">
                      {doctor.schedule?.slotDuration || "—"} min
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {/* View */}
                        <button
                          onClick={() => setViewDoctor(doctor)}
                          className="rounded-full p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                          title="View details"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => setEditDoctor(doctor)}
                          className="rounded-full p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                          title="Edit doctor"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(doctor._id)}
                          className="rounded-full p-1.5 text-zinc-400 transition hover:bg-red-500/20 hover:text-red-400"
                          title="Delete doctor"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals – unchanged */}
      {viewDoctor && (
        <Modal title="Doctor details" onClose={() => setViewDoctor(null)}>
          <DoctorDetails doctor={viewDoctor} />
        </Modal>
      )}

      {editDoctor && (
        <Modal title="Edit doctor" onClose={() => setEditDoctor(null)}>
          <EditDoctorForm
            doctor={editDoctor}
            onSuccess={() => setEditDoctor(null)}
          />
        </Modal>
      )}

      {showAdd && (
        <Modal title="Add doctor" onClose={() => setShowAdd(false)}>
          <DoctorAdd onSuccess={() => setShowAdd(false)} />
        </Modal>
      )}
    </div>
  );
};

export default DoctorList;
