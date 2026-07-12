
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useDepartmentList from "@/customHooks/Department/useDepartmentList";
import useDepartmentDelete from "@/customHooks/Department/useDepartmentDelete";
import useDoctorList from "@/customHooks/doctor/useDoctorList";
import { Department } from "@/typeScript/admin/crud";
import { useDepartmentFilter } from "@/customHooks/Department/useDepartmentFilter";
import { useDoctorsByDepartment } from "@/customHooks/Department/useDoctorsByDepartment";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import DepartmentHeader from "./DepartmentHeader";
import EmptyState from "./EmptyState";
import StatsRow from "./StatsRow";
import DepartmentTable from "./DepartmentTable";


interface DepartmentListProps {
  onEdit: (department: Department) => void;
}

const DepartmentList = ({ onEdit }: DepartmentListProps) => {
  const router = useRouter();
  
  const { departments, loading, error } = useDepartmentList();
  const { doctors } = useDoctorList();
  const { handleDelete } = useDepartmentDelete();
  
  const [searchTerm, setSearchTerm] = useState("");

  // Custom hooks for filtering and grouping
  const filteredDepartments = useDepartmentFilter(departments, searchTerm);
  const doctorsByDepartment = useDoctorsByDepartment(doctors);

  const handleAddDepartment = () => {
    router.push("/deperatments/add");
  };

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} />;
  }


  const hasResults = filteredDepartments.length > 0;

  return (
    <div style={styles.pageWrapper}>
      <DepartmentHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        departmentCount={filteredDepartments.length}
        onAddDepartment={handleAddDepartment}
        isLoading={loading}
        hasError={!!error}
      />

      {hasResults ? (
        <>
          <StatsRow
            totalDepartments={departments.length}
            totalDoctors={doctors.length}
          />

          <DepartmentTable
            departments={filteredDepartments}
            doctorsByDepartment={doctorsByDepartment}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <EmptyState hasDepartments={departments.length > 0} />
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .icon-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          transition: background 0.2s, color 0.2s;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
        }
        .icon-btn:hover {
          background: rgba(255,255,255,0.08);
          color: #e5e7eb;
        }
        .icon-btn-danger:hover {
          background: rgba(239,68,68,0.15);
          color: #f87171;
        }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0c",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
};

export default DepartmentList;