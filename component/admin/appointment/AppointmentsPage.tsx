"use client";

import { useMemo, useState } from "react";
import useAppointmentList from "@/customHooks/AppointmentList/useAppointmentList";
import useCancelAppointment from "@/customHooks/AppointmentList/useCancelAppointment";
import AppointmentStatCards from "@/component/admin/appointment/AppointmentStatCards";
import AppointmentFilters from "@/component/admin/appointment/AppointmentFilters";
import AppointmentTable from "@/component/admin/appointment/AppointmentTable";
import CancelConfirmModal from "@/component/admin/appointment/CancelConfirmModal";
import AppointmentCardGrid from "@/component/admin/appointment/AppointmentCardGrid";
import AppointmentsPageSkeleton from "./AppointmentsPageSkeleton";

export type TabFilter = "all" | "pending" | "completed" | "cancelled";
export type ViewMode = "card" | "table";

export default function AppointmentsPage() {
  const { appointments, loading, error } = useAppointmentList();
  const { handleCancel } = useCancelAppointment();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return (appointments ?? []).filter((a: any) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.patientName?.toLowerCase().includes(q) ||
        a.doctorName?.toLowerCase().includes(q) ||
        a.status?.toLowerCase().includes(q);
      const matchDept = !department || a.department === department;
      const matchTab =
        activeTab === "all" || a.status?.toLowerCase() === activeTab;
      return matchSearch && matchDept && matchTab;
    });
  }, [appointments, search, department, activeTab]);

  const counts = useMemo(
    () => ({
      all: appointments?.length ?? 0,
      pending: appointments?.filter((a: any) => a.status?.toLowerCase() === "pending").length ?? 0,
      completed: appointments?.filter((a: any) => a.status?.toLowerCase() === "completed").length ?? 0,
      cancelled: appointments?.filter((a: any) => a.status?.toLowerCase() === "cancelled").length ?? 0,
    }),
    [appointments]
  );

  const openCancel = (id: string) => setCancelTargetId(id);
  const closeCancel = () => setCancelTargetId(null);
  const confirmCancel = async () => {
    if (!cancelTargetId) return;
    await handleCancel(cancelTargetId);
    closeCancel();
  };

  if (loading) {
    return <AppointmentsPageSkeleton />;
  }

  return (
    <div style={styles.wrapper}>
      {/* Page header */}
      <div style={styles.pageHead}>
        <div>
          <h1 style={styles.title}>Appointment Management</h1>
          <p style={styles.subtitle}>
            Total Appointments:{" "}
            <span style={styles.count}>{filtered.length}</span>
          </p>
        </div>

        {/* Card / Table toggle */}
        <div style={styles.viewToggle}>
          <button
            style={{ ...styles.viewBtn, ...(viewMode === "card" ? styles.viewBtnActive : {}) }}
            onClick={() => setViewMode("card")}
          >
            ⊞ Cards
          </button>
          <button
            style={{ ...styles.viewBtn, ...(viewMode === "table" ? styles.viewBtnActive : {}) }}
            onClick={() => setViewMode("table")}
          >
            ☰ Table
          </button>
        </div>
      </div>

      {/* Stat tiles */}
      <AppointmentStatCards
        counts={counts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Filters */}
      <AppointmentFilters
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      {/* Error */}
      {error && (
        <div style={styles.errorBox}>⚠️ {error}</div>
      )}

      {/* Empty */}
      {!error && filtered.length === 0 && (
        <div style={styles.center}>
          <p style={styles.emptyText}>No appointments found.</p>
        </div>
      )}

      {/* Card / Table view */}
      {!error && filtered.length > 0 && (
        viewMode === "card"
          ? <AppointmentCardGrid appointments={filtered} onCancel={openCancel} />
          : <AppointmentTable appointments={filtered} onCancel={openCancel} />
      )}

      {/* Cancel modal */}
      <CancelConfirmModal
        open={!!cancelTargetId}
        onConfirm={confirmCancel}
        onClose={closeCancel}
      />
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "2rem 1.5rem",
    color: "#e5e7eb",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  pageHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap" as const,
    gap: "1rem",
  },
  title: {
    fontSize: "1.875rem",
    fontWeight: 600,
    margin: 0,
    color: "#f3f4f6",
  },
  subtitle: {
    fontSize: "0.875rem",
    color: "#9ca3af",
    margin: "0.25rem 0 0",
  },
  count: {
    color: "#60a5fa",
    fontWeight: 500,
  },
  viewToggle: {
    display: "flex",
    gap: "0.5rem",
    background: "#1f2937",
    padding: "0.25rem",
    borderRadius: "0.5rem",
  },
  viewBtn: {
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "none",
    background: "transparent",
    color: "#9ca3af",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "all 0.2s",
  },
  viewBtnActive: {
    background: "#374151",
    color: "#f3f4f6",
  },
  center: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 0",
  },
  spinner: {
    width: "2.5rem",
    height: "2.5rem",
    border: "3px solid #1f2937",
    borderTop: "3px solid #60a5fa",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "#9ca3af",
    marginTop: "1rem",
  },
  errorBox: {
    background: "#7f1d1d",
    border: "1px solid #991b1b",
    color: "#fca5a5",
    padding: "1rem",
    borderRadius: "0.5rem",
    textAlign: "center" as const,
  },
  emptyText: {
    color: "#9ca3af",
    fontSize: "1.125rem",
  },
};