
"use client";

import { useRouter } from "next/navigation";
import { Department } from "@/typeScript/admin/crud";
import DepartmentList from "@/component/admin/department/DepartmentList/DepartmentList";

const Page = () => {
  const router = useRouter();

  const handleEdit = (department: Department) => {
    router.push(`/deperatments/list/edit/${department._id}`);
  };

  return (
    <div>
      <DepartmentList onEdit={handleEdit} />
    </div>
  );
};

export default Page;