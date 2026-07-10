// "use client";

// import { useMemo, useState } from "react";
// import useDoctorList from "@/customHooks/doctor/useDoctorList";
// import useDeleteDoctor from "@/customHooks/doctor/useDeleteDoctor";
// import useDepartmentList from "@/customHooks/Department/useDepartmentList";
// import { Doctor } from "@/typeScript/admin/crud";

// import { DoctorStats } from "./DoctorStats";
// import { DoctorTable } from "./DoctorTable";
// import { Pagination } from "./Pagination";

// import Modal from "../../shared/Model";
// import DoctorDetails from "../DoctorDetails";
// import EditDoctorForm from "../EditDoctorForm";
// import DoctorAdd from "../DoctorAdd";
// import { DoctorIcons } from "./DoctorIcons";

// const DoctorList = () => {
//   const { doctors, loading, error, total, totalPages } = useDoctorList();
//   const [search, setSearch] = useState("");
//   const [viewDoctor, setViewDoctor] = useState<Doctor | null>(null);
//   const [editDoctor, setEditDoctor] = useState<Doctor | null>(null);
//   const [showAdd, setShowAdd] = useState(false);
//   const [page, setPage] = useState(1);
//   const PAGE_SIZE = 5;

//   const { handleDelete } = useDeleteDoctor();
//   const { departments, loading: deptLoading } = useDepartmentList();

//   const departmentMap = useMemo(() => {
//     return new Map(departments.map((dept) => [dept._id, dept.name]));
//   }, [departments]);

//   const filtered = useMemo(
//     () =>
//       doctors.filter((d) =>
//         d.name.toLowerCase().includes(search.toLowerCase()),
//       ),
//     [doctors, search],
//   );

//   if (loading)
//     return (
//       <div className="flex h-64 items-center justify-center text-zinc-400">
//         Loading...
//       </div>
//     );
//   if (error) return <p className="p-8 text-red-400">{error}</p>;

//   return (
//     <div className="min-h-screen bg-[#0a0a0c] p-8 text-white">
//       {/* Header */}
//       <div className="flex items-start justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold pt-2.5">Doctors</h1>
//           <p className="mt-1 text-sm text-zinc-400">
//             Manage doctor profiles and schedules
//           </p>
//         </div>
//         <button
//           onClick={() => setShowAdd(true)}
//           className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 pt-3"
//         >
//           + Add doctor
//         </button>
//       </div>

//       {/* Stats */}
//       <DoctorStats doctors={doctors} />

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search doctors..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="mt-6 w-full max-w-sm rounded-lg border border-white/10 bg-[#141417] px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-blue-500"
//       />

//       {/* Table or Empty State */}
//       {filtered.length === 0 ? (
//         <div className="col-span-full mt-10 flex flex-col items-center justify-center text-center">
//           <DoctorIcons.Empty />
//           <h3 className="mt-4 text-lg font-medium text-gray-300">
//             No doctors found
//           </h3>
//           <p className="mt-1 text-sm text-gray-400">
//             We couldn't find any doctors matching your search criteria.
//           </p>
//         </div>
//       ) : (
//         <DoctorTable
//           doctors={filtered}
//           departmentMap={departmentMap}
//           deptLoading={deptLoading}
//           onView={setViewDoctor}
//           onEdit={setEditDoctor}
//           onDelete={handleDelete}
//         />
//       )}

//       {/* Modals */}
//       {viewDoctor && (
//         <Modal title="Doctor details" onClose={() => setViewDoctor(null)}>
//           <DoctorDetails doctor={viewDoctor} />
//         </Modal>
//       )}

//       {editDoctor && (
//         <Modal title="Edit doctor" onClose={() => setEditDoctor(null)}>
//           <EditDoctorForm
//             doctor={editDoctor}
//             onSuccess={() => setEditDoctor(null)}
//           />
//         </Modal>
//       )}

//       {showAdd && (
//         <Modal title="Add doctor" onClose={() => setShowAdd(false)}>
//           <DoctorAdd onSuccess={() => setShowAdd(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default DoctorList;



"use client";

import { useMemo, useState } from "react";
import useDoctorList from "@/customHooks/doctor/useDoctorList";
import useDeleteDoctor from "@/customHooks/doctor/useDeleteDoctor";
import useDepartmentList from "@/customHooks/Department/useDepartmentList";
import { Doctor } from "@/typeScript/admin/crud";

import { DoctorStats } from "./DoctorStats";
import { DoctorTable } from "./DoctorTable";
import { Pagination } from "./Pagination";
import Modal from "../../shared/Model";
import DoctorDetails from "../DoctorDetails";
import EditDoctorForm from "../EditDoctorForm";
import DoctorAdd from "../DoctorAdd";
import { DoctorIcons } from "./DoctorIcons";

const DoctorList = () => {
  const [search, setSearch] = useState("");
  const [viewDoctor, setViewDoctor] = useState<Doctor | null>(null);
  const [editDoctor, setEditDoctor] = useState<Doctor | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // Server-side paginated fetch: GET admin/doctor/list?page=&limit=
  const { doctors, loading, error, total, totalPages } = useDoctorList(page, PAGE_SIZE);

  const { handleDelete } = useDeleteDoctor();
  const { departments, loading: deptLoading } = useDepartmentList();

  const departmentMap = useMemo(() => {
    return new Map(departments.map((dept) => [dept._id, dept.name]));
  }, [departments]);

  // NOTE: search only filters the doctors currently loaded on this page,
  // since the list itself is now paginated server-side (not fetched in full).
  // To search across every doctor, the backend would need a "search" query
  // param too — ask me if you want that wired up next.
  const filtered = useMemo(
    () => doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase())),
    [doctors, search]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  if (loading) return <div className="flex h-64 items-center justify-center text-zinc-400">Loading...</div>;
  if (error) return <p className="p-8 text-red-400">{error}</p>;

  return (
    <div className="min-h-screen bg-[#0a0a0c] p-8 text-white">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold pt-2.5">Doctors</h1>
          <p className="mt-1 text-sm text-zinc-400">Manage doctor profiles and schedules</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 pt-3">
          + Add doctor
        </button>
      </div>

      {/* Stats */}
      <DoctorStats doctors={doctors} totalCount={total} />

      {/* Search */}
      <input
        type="text"
        placeholder="Search doctors..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="mt-6 w-full max-w-sm rounded-lg border border-white/10 bg-[#141417] px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-blue-500"
      />

      {/* Table or Empty State */}
      {filtered.length === 0 ? (
        <div className="col-span-full mt-10 flex flex-col items-center justify-center text-center">
          <DoctorIcons.Empty />
          <h3 className="mt-4 text-lg font-medium text-gray-300">No doctors found</h3>
          <p className="mt-1 text-sm text-gray-400">We couldn't find any doctors matching your search criteria.</p>
        </div>
      ) : (
        <>
          <DoctorTable
            doctors={filtered}
            departmentMap={departmentMap}
            deptLoading={deptLoading}
            onView={setViewDoctor}
            onEdit={setEditDoctor}
            onDelete={handleDelete}
            startIndex={(page - 1) * PAGE_SIZE}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      {/* Modals */}
      {viewDoctor && (
        <Modal title="Doctor details" onClose={() => setViewDoctor(null)}>
          <DoctorDetails doctor={viewDoctor} />
        </Modal>
      )}

      {editDoctor && (
        <Modal title="Edit doctor" onClose={() => setEditDoctor(null)}>
          <EditDoctorForm doctor={editDoctor} onSuccess={() => setEditDoctor(null)} />
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