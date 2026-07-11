import { Skeleton } from "@/component/shared/Skeleton";

const TABLE_HEADERS = [
  "#",
  "Doctor",
  "Specialization",
  "Fees (₹)",
  "Slot Duration",
  "Status",
  "Actions",
];

const DoctorListSkeleton = () => (
  <div className="min-h-screen bg-[#0a0a0c] p-8 text-white">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div>
        <Skeleton className="h-7 w-40 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>

    {/* Stats */}
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-[#141417] p-5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          <Skeleton className="mt-3 h-8 w-16" />
        </div>
      ))}
    </div>

    {/* Search */}
    <Skeleton className="mt-6 h-10 w-full max-w-sm rounded-lg" />

    {/* Table */}
    <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[700px] border-collapse bg-[#141417] text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-[#0f0f12]">
            {TABLE_HEADERS.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-6" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-14" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-5 w-16 rounded-full" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-6 w-20 mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DoctorListSkeleton;
