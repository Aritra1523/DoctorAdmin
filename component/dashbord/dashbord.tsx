// "use client";

// import useAppointmentList from "@/customHooks/AppointmentList/useAppointmentList";
// import useDoctorList from "@/customHooks/doctor/useDoctorList";
// import { Appointment } from "@/typeScript/admin/Appointment/Appointment";
// import { Doctor } from "@/typeScript/admin/crud";
// import useDepartmentList from "@/customHooks/Department/useDepartmentList";
// /* ---------- helpers ---------- */

// const initials = (name: string) =>
//   name
//     .replace(/^Dr\.?\s*/i, "")
//     .split(" ")
//     .map((p) => p[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

// const AVATAR_COLORS = [
//   { bg: "rgba(59,130,246,0.15)", text: "#93c5fd" },
//   { bg: "rgba(168,85,247,0.15)", text: "#d8b4fe" },
//   { bg: "rgba(34,197,94,0.12)", text: "#86efac" },
//   { bg: "rgba(234,179,8,0.12)", text: "#fde047" },
//   { bg: "rgba(239,68,68,0.12)", text: "#fca5a5" },
// ];

// const DEPT_COLORS = [
//   "#3b82f6",
//   "#a855f7",
//   "#22c55e",
//   "#eab308",
//   "#f97316",
//   "#ec4899",
//   "#14b8a6",
//   "#6366f1",
// ];

// const statusBadge = (status: string) => {
//   const s = status.toLowerCase();
//   if (s === "accepted") return "bg-[rgba(34,197,94,0.12)] text-[#4ade80]";
//   if (s === "pending") return "bg-[rgba(234,179,8,0.12)] text-[#facc15]";
//   if (s === "cancelled" || s === "canceled" || s === "rejected")
//     return "bg-[rgba(239,68,68,0.12)] text-[#f87171]";
//   return "bg-[rgba(148,163,184,0.12)] text-[#cbd5e1]";
// };

// const formatTime = (time: string) => time;

// const todayStr = () =>
//   new Date().toLocaleDateString("en-US", {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });

// /* ---------- stat card ---------- */

// function StatCard({
//   icon,
//   iconBg,
//   iconBorder,
//   label,
//   value,
//   sub,
// }: {
//   icon: React.ReactNode;
//   iconBg: string;
//   iconBorder: string;
//   label: string;
//   value: number | string;
//   sub: string;
// }) {
//   return (
//     <div className="bg-[#141417] border border-white/[0.07] rounded-xl px-5 py-[18px]">
//       <div
//         className="w-[34px] h-[34px] rounded-lg flex items-center justify-center mb-3"
//         style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
//       >
//         {icon}
//       </div>
//       <div className="text-xs text-[#6b7280] mb-1.5">{label}</div>
//       <div className="text-[26px] font-semibold text-white leading-none">
//         {value}
//       </div>
//       <div className="text-[11.5px] text-[#374151] mt-[5px]">{sub}</div>
//     </div>
//   );
// }

// /* ---------- page ---------- */

// export default function DashboardPage() {
//   const { doctors, loading: doctorsLoading } = useDoctorList();
//   const { appointments, loading: appointmentsLoading } = useAppointmentList();
// const {departments}=useDepartmentList()
//   const today = new Date().toDateString();

//   const appointmentsToday = appointments.filter(
//     (a: Appointment) => new Date(a.appointmentDate).toDateString() === today,
//   );

//   const accepted = appointments.filter(
//     (a: Appointment) => a.status.toLowerCase() === "accepted",
//   );
//   const pending = appointments.filter(
//     (a: Appointment) => a.status.toLowerCase() === "pending",
//   );
//   const cancelled = appointments.filter((a: Appointment) =>
//     ["cancelled", "canceled"].includes(a.status.toLowerCase()),
//   );

//   // Group doctors by department (uses Doctor.department if populated, else departmentId)
//   const deptMap = new Map<string, { name: string; count: number }>();
//   doctors.forEach((d: Doctor) => {
//     const key = d.department?._id || d.departmentId;
//     const name = d.department?.name || "Unassigned";
//     const existing = deptMap.get(key);
//     if (existing) existing.count += 1;
//     else deptMap.set(key, { name, count: 1 });
//   });
//   const deptBreakdown = Array.from(deptMap.values()).sort(
//     (a, b) => b.count - a.count,
//   );
//   const maxDeptCount = Math.max(1, ...deptBreakdown.map((d) => d.count));

//   const recentAppointments = [...appointments]
//     .sort(
//       (a, b) =>
//         new Date(b.appointmentDate).getTime() -
//         new Date(a.appointmentDate).getTime(),
//     )
//     .slice(0, 5);

//   const total = appointments.length || 1;

//   return (
//     <div className="bg-[#0a0a0c] min-h-screen px-8 py-7 text-[#e2e8f0]">
//       {/* Topbar */}
//       <div className="flex items-center justify-between mb-7">
//         <div>
//           <div className="text-[22px] font-semibold text-white">Dashboard</div>
//           <div className="text-[13px] text-[#6b7280] mt-[3px]">
//             Welcome back, Admin — here&apos;s what&apos;s happening today
//           </div>
//         </div>
//         <div className="bg-[#141417] border border-white/[0.08] rounded-lg px-3.5 py-[7px] text-xs text-[#9ca3af]">
//           {todayStr()}
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-3.5 mb-6">
//         <StatCard
//           label="Total doctors"
//           value={doctorsLoading ? "—" : doctors.length}
//           sub="from doctor_list"
//           iconBg="rgba(59,130,246,0.12)"
//           iconBorder="rgba(59,130,246,0.2)"
//           icon={
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#60a5fa"
//               strokeWidth="2"
//               strokeLinecap="round"
//             >
//               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//               <circle cx="12" cy="7" r="4" />
//             </svg>
//           }
//         />
//         <StatCard
//           label="Appointments today"
//           value={appointmentsLoading ? "—" : appointmentsToday.length}
//           sub="from AppointmentList"
//           iconBg="rgba(34,197,94,0.1)"
//           iconBorder="rgba(34,197,94,0.2)"
//           icon={
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#4ade80"
//               strokeWidth="2"
//               strokeLinecap="round"
//             >
//               <rect x="3" y="4" width="18" height="18" rx="2" />
//               <line x1="16" y1="2" x2="16" y2="6" />
//               <line x1="8" y1="2" x2="8" y2="6" />
//               <line x1="3" y1="10" x2="21" y2="10" />
//             </svg>
//           }
//         />
//         <StatCard
//           label="Accepted"
//           value={appointmentsLoading ? "—" : accepted.length}
//           sub="from AcceptList"
//           iconBg="rgba(234,179,8,0.1)"
//           iconBorder="rgba(234,179,8,0.2)"
//           icon={
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#facc15"
//               strokeWidth="2"
//               strokeLinecap="round"
//             >
//               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//               <polyline points="22 4 12 14.01 9 11.01" />
//             </svg>
//           }
//         />
//         <StatCard
//           label="Departments"
//           value={doctorsLoading ? "—" : departments.length}
//           sub="from Department_list"
//           iconBg="rgba(168,85,247,0.1)"
//           iconBorder="rgba(168,85,247,0.2)"
//           icon={
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#c084fc"
//               strokeWidth="2"
//               strokeLinecap="round"
//             >
//               <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
//             </svg>
//           }
//         />
//       </div>

//       {/* Row 2: recent appointments + dept breakdown */}
//       <div className="grid grid-cols-[1.5fr_1fr] gap-3.5 mb-3.5">
//         {/* Recent appointments */}
//         <div className="bg-[#141417] border border-white/[0.07] rounded-xl px-5 py-[18px]">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-sm font-medium text-[#e2e8f0]">
//               Recent appointments
//             </span>
//             <a
//               href="/appointments"
//               className="text-xs text-[#60a5fa] hover:underline"
//             >
//               AppointmentList →
//             </a>
//           </div>

//           {appointmentsLoading && (
//             <div className="text-sm text-[#6b7280] py-4">Loading…</div>
//           )}
//           {!appointmentsLoading && recentAppointments.length === 0 && (
//             <div className="text-sm text-[#6b7280] py-4">
//               No appointments yet.
//             </div>
//           )}

//           {recentAppointments.map((a: Appointment, i: number) => {
//             const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
//             return (
//               <div
//                 key={a._id}
//                 className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-b-0"
//               >
//                 <div
//                   className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
//                   style={{ background: color.bg, color: color.text }}
//                 >
//                   {initials(a.doctorName || "Dr")}
//                 </div>
//                 <div className="flex-1 px-3">
//                   <div className="text-[13px] font-medium text-[#e2e8f0]">
//                     {a.doctorName}
//                   </div>
//                   <div className="text-[11.5px] text-[#6b7280] mt-px">
//                     {a.patientName}
//                   </div>
//                 </div>
//                 <div className="text-xs text-[#9ca3af]">
//                   {formatTime(a.appointmentTime)}
//                 </div>
//                 <div className="w-2.5" />
//                 <span
//                   className={`text-[11px] font-semibold px-2.5 py-[3px] rounded-full ${statusBadge(a.status)}`}
//                 >
//                   {a.status}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {/* Doctors per department */}
//         <div className="bg-[#141417] border border-white/[0.07] rounded-xl px-5 py-[18px]">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-sm font-medium text-[#e2e8f0]">
//               Doctors per department
//             </span>
//             <a
//               href="/deperatments"
//               className="text-xs text-[#60a5fa] hover:underline"
//             >
//               Department_wise_doctor →
//             </a>
//           </div>

//           {doctorsLoading && (
//             <div className="text-sm text-[#6b7280] py-4">Loading…</div>
//           )}
//           {!doctorsLoading && deptBreakdown.length === 0 && (
//             <div className="text-sm text-[#6b7280] py-4">No doctors yet.</div>
//           )}

//           {deptBreakdown.map((d, i) => {
//             const color = DEPT_COLORS[i % DEPT_COLORS.length];
//             const pct = Math.round((d.count / maxDeptCount) * 100);
//             return (
//               <div
//                 key={d.name}
//                 className="flex items-center gap-2.5 py-[9px] border-b border-white/[0.05] last:border-b-0"
//               >
//                 <div
//                   className="w-2 h-2 rounded-full shrink-0"
//                   style={{ background: color }}
//                 />
//                 <div className="text-[13px] text-[#e2e8f0] flex-1">
//                   {d.name}
//                 </div>
//                 <div className="h-1 bg-white/[0.07] rounded-full flex-1">
//                   <div
//                     className="h-1 rounded-full"
//                     style={{ width: `${pct}%`, background: color }}
//                   />
//                 </div>
//                 <div className="text-xs font-medium text-[#9ca3af]">
//                   {d.count}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Row 3: quick actions + status breakdown */}
//       <div className="grid grid-cols-2 gap-3.5">
//         <div className="bg-[#141417] border border-white/[0.07] rounded-xl px-5 py-[18px]">
//           <div className="mb-4">
//             <span className="text-sm font-medium text-[#e2e8f0]">
//               Quick actions
//             </span>
//           </div>

//           {[
//             {
//               href: "/doctors",
//               label: "Add doctor",
//               bg: "rgba(59,130,246,0.12)",
//               border: "rgba(59,130,246,0.2)",
//               icon: (
//                 <svg
//                   width="14"
//                   height="14"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#60a5fa"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 >
//                   <line x1="12" y1="5" x2="12" y2="19" />
//                   <line x1="5" y1="12" x2="19" y2="12" />
//                 </svg>
//               ),
//             },
//             {
//               href: "/deperatments/add",
//               label: "Add department",
//               bg: "rgba(168,85,247,0.12)",
//               border: "rgba(168,85,247,0.2)",
//               icon: (
//                 <svg
//                   width="14"
//                   height="14"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#c084fc"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 >
//                   <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
//                 </svg>
//               ),
//             },
//             {
//               href: "/appointments",
//               label: "View appointments",
//               bg: "rgba(34,197,94,0.1)",
//               border: "rgba(34,197,94,0.2)",
//               icon: (
//                 <svg
//                   width="14"
//                   height="14"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="#4ade80"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                 >
//                   <rect x="3" y="4" width="18" height="18" rx="2" />
//                   <line x1="16" y1="2" x2="16" y2="6" />
//                   <line x1="8" y1="2" x2="8" y2="6" />
//                   <line x1="3" y1="10" x2="21" y2="10" />
//                 </svg>
//               ),
//             },
//           ].map((btn) => (
//             <a
//               key={btn.label}
//               href={btn.href}
//               className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] mb-2 last:mb-0 cursor-pointer hover:bg-white/[0.05] transition-colors"
//             >
//               <div
//                 className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center shrink-0"
//                 style={{
//                   background: btn.bg,
//                   border: `1px solid ${btn.border}`,
//                 }}
//               >
//                 {btn.icon}
//               </div>
//               <span className="text-[13px] text-[#d1d5db] font-normal">
//                 {btn.label}
//               </span>
//               <span className="text-[#374151] text-sm ml-auto">›</span>
//             </a>
//           ))}
//         </div>

//         <div className="bg-[#141417] border border-white/[0.07] rounded-xl px-5 py-[18px]">
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-sm font-medium text-[#e2e8f0]">
//               Appointment status
//             </span>
//             <span className="text-xs text-[#60a5fa]">today</span>
//           </div>

//           <div className="flex flex-col gap-3 mt-1">
//             {[
//               { label: "Accepted", color: "#4ade80", count: accepted.length },
//               { label: "Pending", color: "#facc15", count: pending.length },
//               { label: "Cancelled", color: "#f87171", count: cancelled.length },
//             ].map((row) => (
//               <div
//                 key={row.label}
//                 className="flex items-center justify-between"
//               >
//                 <div className="flex items-center gap-2">
//                   <div
//                     className="w-2 h-2 rounded-full"
//                     style={{ background: row.color }}
//                   />
//                   <span className="text-[13px] text-[#9ca3af]">
//                     {row.label}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2.5">
//                   <div className="w-[100px] h-1.5 bg-white/[0.06] rounded-full">
//                     <div
//                       className="h-1.5 rounded-full"
//                       style={{
//                         width: `${Math.round((row.count / total) * 100)}%`,
//                         background: row.color,
//                       }}
//                     />
//                   </div>
//                   <span className="text-[13px] font-medium text-[#e2e8f0] min-w-[22px] text-right">
//                     {row.count}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
