// // components/doctor/DoctorTable.tsx
// import { Doctor } from "@/typeScript/admin/crud";
// import { DoctorIcons } from "./DoctorIcons";

// const ACCENT_COLORS = ["#3b82f6", "#a855f7", "#22c55e", "#eab308", "#ef4444", "#a45c2a"];

// export const DoctorTable = ({ 
//   doctors, 
//   departmentMap, 
//   deptLoading, 
//   onView, 
//   onEdit, 
//   onDelete 
// }: any) => (
//   <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
//     <table className="w-full min-w-[700px] border-collapse bg-[#141417] text-sm">
//       <thead>
//         <tr className="border-b border-white/10 bg-[#0f0f12]">
//           <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">#</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Doctor</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Specialization</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Fees (₹)</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Slot Duration</th>
//           <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Status</th>
//           <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {doctors.map((doctor: Doctor, index: number) => {
//           const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
//           return (
//             <tr key={doctor._id} className="border-b border-white/5 transition hover:bg-white/5">
//               <td className="px-4 py-3 text-zinc-300">
//                 <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: color }} />
//                 {index + 1}
//               </td>
//               <td className="px-4 py-3 font-medium text-white">{doctor.name}</td>
//               <td className="px-4 py-3 text-zinc-300">
//                 {deptLoading ? "…" : departmentMap.get(doctor.departmentId) || "—"}
//               </td>
//               <td className="px-4 py-3 text-zinc-300">{doctor.fees || "—"}</td>
//               <td className="px-4 py-3 text-zinc-300">{doctor.schedule?.slotDuration || "—"} min</td>
//               <td className="px-4 py-3">
//                 <span className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">Active</span>
//               </td>
//               <td className="px-4 py-3">
//                 <div className="flex items-center justify-center gap-1">
//                   <button onClick={() => onView(doctor)} className="rounded-full p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white">
//                     <DoctorIcons.View />
//                   </button>
//                   <button onClick={() => onEdit(doctor)} className="rounded-full p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white">
//                     <DoctorIcons.Edit />
//                   </button>
//                   <button onClick={() => onDelete(doctor._id)} className="rounded-full p-1.5 text-zinc-400 transition hover:bg-red-500/20 hover:text-red-400">
//                     <DoctorIcons.Delete />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   </div>
// );


// components/doctor/DoctorTable.tsx
import { Doctor } from "@/typeScript/admin/crud";
import { DoctorIcons } from "./DoctorIcons";

const ACCENT_COLORS = ["#3b82f6", "#a855f7", "#22c55e", "#eab308", "#ef4444", "#a45c2a"];

export const DoctorTable = ({
  doctors,
  departmentMap,
  deptLoading,
  onView,
  onEdit,
  onDelete,
  startIndex = 0,
}: any) => (
  <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
    <table className="w-full min-w-[700px] border-collapse bg-[#141417] text-sm">
      <thead>
        <tr className="border-b border-white/10 bg-[#0f0f12]">
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">#</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Doctor</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Specialization</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Fees (₹)</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Slot Duration</th>
          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Status</th>
          <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor: Doctor, index: number) => {
          const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
          return (
            <tr key={doctor._id} className="border-b border-white/5 transition hover:bg-white/5">
              <td className="px-4 py-3 text-zinc-300">
                <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: color }} />
                {startIndex + index + 1}
              </td>
              <td className="px-4 py-3 font-medium text-white">{doctor.name}</td>
              <td className="px-4 py-3 text-zinc-300">
                {deptLoading ? "…" : departmentMap.get(doctor.departmentId) || "—"}
              </td>
              <td className="px-4 py-3 text-zinc-300">{doctor.fees || "—"}</td>
              <td className="px-4 py-3 text-zinc-300">{doctor.schedule?.slotDuration || "—"} min</td>
              <td className="px-4 py-3">
                <span className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">Active</span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-1">
                  <button onClick={() => onView(doctor)} className="rounded-full p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white">
                    <DoctorIcons.View />
                  </button>
                  <button onClick={() => onEdit(doctor)} className="rounded-full p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white">
                    <DoctorIcons.Edit />
                  </button>
                  <button onClick={() => onDelete(doctor._id)} className="rounded-full p-1.5 text-zinc-400 transition hover:bg-red-500/20 hover:text-red-400">
                    <DoctorIcons.Delete />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);