// import { Doctor } from "@/typeScript/admin/crud";
// import { DoctorIcons } from "./DoctorIcons";

// const StatCard = ({ label, value, icon }: any) => (
//   <div className="rounded-xl border border-white/10 bg-[#141417] p-5 transition hover:border-white/20 hover:bg-[#18181c]">
//     <div className="flex items-center justify-between">
//       <p className="text-sm text-zinc-400">{label}</p>
//       <span className="text-blue-400/80">{icon}</span>
//     </div>
//     <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
//   </div>
// );

// export const DoctorStats = ({
//   doctors,
//   totalCount,
// }: {
//   doctors: Doctor[];
//   totalCount?: number;
// }) => {
//   const totalFees = doctors.reduce((sum, d) => sum + Number(d.fees), 0);
//   const avgSlotDuration = Math.round(
//     doctors.reduce((s, d) => s + d.schedule.slotDuration, 0) /
//       (doctors.length || 1),
//   );

//   return (
//     <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
//       <StatCard
//         label="Total doctors"
//         value={totalCount || doctors.length}
//         icon={<DoctorIcons.Doctor />}
//       />{" "}
//       <StatCard
//         label="Fees (this page)"
//         value={`₹${totalFees}`}
//         icon={<DoctorIcons.Money />}
//       />
//       <StatCard
//         label="Avg. slot duration (this page)"
//         value={`${avgSlotDuration} min`}
//         icon={<DoctorIcons.Clock />}
//       />
//     </div>
//   );
// };


import { Doctor } from "@/typeScript/admin/crud";
import { DoctorIcons } from "./DoctorIcons";

const StatCard = ({ label, value, icon }: any) => (
  <div className="rounded-xl border border-white/10 bg-[#141417] p-5 transition hover:border-white/20 hover:bg-[#18181c]">
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-400">{label}</p>
      <span className="text-blue-400/80">{icon}</span>
    </div>
    <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
  </div>
);

export const DoctorStats = ({
  doctors,
  totalCount,
}: {
  doctors: Doctor[];
  totalCount?: number;
}) => {
  const totalFees = doctors.reduce((sum, d) => sum + Number(d.fees), 0);
  const avgSlotDuration = Math.round(
    doctors.reduce((s, d) => s + d.schedule.slotDuration, 0) /
      (doctors.length || 1),
  );

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        label="Total doctors"
        value={totalCount || doctors.length}
        icon={<DoctorIcons.Doctor />}
      />{" "}
      <StatCard
        label="Total fees"
        value={`₹${totalFees}`}
        icon={<DoctorIcons.Money />}
      />
      <StatCard
        label="Avg. slot duration"
        value={`${avgSlotDuration} min`}
        icon={<DoctorIcons.Clock />}
      />
    </div>
  );
};