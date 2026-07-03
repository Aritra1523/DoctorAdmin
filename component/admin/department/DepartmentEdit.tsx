"use client";

import { useRouter } from "next/navigation";
import useDepartmentList from "@/customHooks/Department/useDepartmentList";
import DepartmentForm from "@/component/admin/department/DepartmentForm";

const DepartmentEdit = ({ id }: { id: string }) => {
  const router = useRouter();
  const { departments, loading } = useDepartmentList();

  if (loading)
    return <p style={{ padding: 36, color: "#9ca3af" }}>Loading...</p>;

  const department = departments.find((d) => d._id === id) || null;

  if (!department)
    return (
      <p style={{ padding: 36, color: "#f87171" }}>Department not found.</p>
    );

  return (
    <DepartmentForm
      selectedDepartment={department}
      clearSelectedDepartment={() => router.push("/deperatments/list")}
    />
  );
};

export default DepartmentEdit;
