import { useMemo } from "react";

export const useDoctorsByDepartment = (doctors: any[]) => {
  return useMemo(() => {
    const map = new Map<string, string[]>();
    doctors.forEach((doc: any) => {
      const list = map.get(doc.departmentId) ?? [];
      list.push(doc.name);
      map.set(doc.departmentId, list);
    });
    return map;
  }, [doctors]);
};