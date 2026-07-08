import { useMemo } from "react";
import { Department } from "@/typeScript/admin/crud";

export const useDepartmentFilter = (departments: Department[], searchTerm: string) => {
  return useMemo(() => {
    return departments.filter((dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);
};