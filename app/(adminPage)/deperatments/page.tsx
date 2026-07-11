
"use client";

import { useRouter } from "next/navigation";
import { Department } from "@/typeScript/admin/crud";
import DepartmentList from "@/component/admin/department/DepartmentList/DepartmentList";

const Page = () => {
  const router = useRouter();
  return (
    <DepartmentList onEdit={(d: Department) => router.push(`/deperatments/list/edit/${d._id}`)} />
  );
};

export default Page;



