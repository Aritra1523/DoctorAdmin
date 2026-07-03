"use client";

import { useMemo, useState } from "react";
import useAppointmentList from "@/customHooks/AppointmentList/useAppointmentList";
import useCancelAppointment from "@/customHooks/AppointmentList/useCancelAppointment";

// ── components (from your component/admin/appointment folder) ──
import AppointmentStatCards from "@/component/admin/appointment/AppointmentStatCards";
import AppointmentFilters from "@/component/admin/appointment/AppointmentFilters";
import AppointmentTable from "@/component/admin/appointment/AppointmentTable";
import CancelConfirmModal from "@/component/admin/appointment/CancelConfirmModal";
import AppointmentCardGrid from "@/component/admin/appointment/AppointmentCardGrid";

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

  return (
    <div style={styles.wrapper}>

      {/* ── Page header ── */}
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

      {/* ── Stat tiles ── */}
      <AppointmentStatCards
        counts={counts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* ── Filters + tabs ── */}
      <AppointmentFilters
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      {/* ── Loading ── */}
      {loading && (
        <div style={styles.center}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Loading appointments…</p>
        </div>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <div style={styles.errorBox}>⚠️ {error}</div>
      )}

      {/* ── Empty ── */}
      {!loading && !error && filtered.length === 0 && (
        <div style={styles.center}>
          <p style={styles.emptyText}>No appointments found.</p>
        </div>
      )}

      {/* ── Card / Table view ── */}
      {!loading && !error && filtered.length > 0 && (
        viewMode === "card"
          ? <AppointmentCardGrid appointments={filtered} onCancel={openCancel} />
          : <AppointmentTable appointments={filtered} onCancel={openCancel} />
      )}

      {/* ── Cancel modal ── */}
      <CancelConfirmModal
        open={!!cancelTargetId}
        onConfirm={confirmCancel}
        onClose={closeCancel}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    padding: "28px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    minHeight: "100vh",
    background: "#0d0d0d",
    fontFamily: "Inter, sans-serif",
    color: "#e5e5e5",
  },
  pageHead: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  title: { fontSize: 21, fontWeight: 500, color: "#fff", margin: 0 },
  subtitle: { fontSize: 13, color: "#8a8a8a", marginTop: 4 },
  count: { color: "#5b9bd5", fontWeight: 500 },
  viewToggle: {
    display: "flex",
    background: "#141414",
    border: "0.5px solid #2a2a2a",
    borderRadius: 8,
    padding: 3,
    gap: 3,
  },
  viewBtn: {
    padding: "5px 14px",
    fontSize: 12,
    borderRadius: 6,
    cursor: "pointer",
    color: "#8a8a8a",
    border: "none",
    background: "transparent",
    fontFamily: "Inter, sans-serif",
  },
  viewBtnActive: { background: "#1d3a5f", color: "#5b9bd5" },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 0",
  },
  spinner: {
    width: 32,
    height: 32,
    border: "2px solid #2a2a2a",
    borderTop: "2px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: { color: "#8a8a8a", marginTop: 12, fontSize: 13 },
  emptyText: { color: "#6b6b6b", fontSize: 13 },
  errorBox: {
    padding: "14px 18px",
    background: "#2e0f0f",
    border: "0.5px solid #4a1a1a",
    borderRadius: 10,
    color: "#f87171",
    fontSize: 13,
  },
};