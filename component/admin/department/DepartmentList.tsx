"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useDepartmentList from "@/customHooks/Department/useDepartmentList";
import { Department } from "@/typeScript/admin/crud";
import useDepartmentDelete from "@/customHooks/Department/useDepartmentDelete";

interface DepartmentListProps {
  onEdit: (department: Department) => void;
}

const ACCENT_COLORS = [
  "#3b82f6",
  "#a855f7",
  "#22c55e",
  "#eab308",
  "#ef4444",
  "#a45c2a",
];

const StatCard = ({
  label,
  value,
  linkLabel,
}: {
  label: string;
  value: string | number;
  linkLabel: string;
}) => (
  <div style={styles.statCard}>
    <p style={styles.statLabel}>{label}</p>
    <p style={styles.statValue}>{value}</p>
    <span style={styles.statLink}>{linkLabel}</span>
  </div>
);

const DepartmentList = ({ onEdit }: DepartmentListProps) => {
  const { departments, loading, error } = useDepartmentList();
  const [searchTerm, setSearchTerm] = useState("");
  const { handleDelete } = useDepartmentDelete();
  const router = useRouter();

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [departments, searchTerm]);

  return (
    <div style={styles.pageWrapper}>
      {/* Header & stats – unchanged */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>Departments</h1>
          <p style={styles.headerSubtitle}>Manage hospital departments</p>
        </div>
        <div style={styles.headerRight}>
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          {!loading && !error && (
            <div style={styles.badge}>
              {filteredDepartments.length} Department
              {filteredDepartments.length !== 1 ? "s" : ""}
            </div>
          )}
          <button
            style={styles.addBtn}
            onClick={() => router.push("/deperatments/add")}
          >
            + Add department
          </button>
        </div>
      </div>

      <div style={styles.statsRow}>
        <StatCard
          label="Total departments"
          value={departments.length}
          linkLabel="Department_list"
        />
        <StatCard
          label="Doctors assigned"
          value="—"
          linkLabel="Department_wise_doc"
        />
        <StatCard
          label="Appointments today"
          value="—"
          linkLabel="AppointmentList"
        />
        <StatCard
          label="Most active"
          value="—"
          linkLabel="Department_wise_doc"
        />
      </div>

      <div style={styles.body}>
        {loading && (
          <div style={styles.stateContainer}>
            <div style={styles.spinner} />
            <p style={styles.stateText}>Loading departments...</p>
          </div>
        )}

        {error && !loading && (
          <div style={styles.errorBox}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && filteredDepartments.length === 0 && (
          <div style={styles.stateContainer}>
            <div style={styles.emptyIcon}>🗂️</div>
            <p style={styles.stateTitle}>
              {departments.length === 0
                ? "No departments yet"
                : "No matching departments"}
            </p>
            <p style={styles.stateText}>
              {departments.length === 0
                ? "Add your first department to get started."
                : "Try adjusting your search term."}
            </p>
          </div>
        )}

        {!loading && !error && filteredDepartments.length > 0 && (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Department Name</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.map(
                  (department: Department, index: number) => {
                    const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
                    return (
                      <tr key={department._id} style={styles.tr}>
                        <td style={styles.td}>
                          <span
                            style={{
                              display: "inline-block",
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: color,
                              marginRight: 10,
                              verticalAlign: "middle",
                            }}
                          />
                          {index + 1}
                        </td>
                        <td style={styles.td}>
                          <strong style={styles.deptName}>
                            {department.name}
                          </strong>
                        </td>
                        <td style={styles.td}>
                          {department.description || "—"}
                        </td>
                        <td style={styles.td}>
                          <span style={styles.cardStatus}>Active</span>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.actionGroup}>
                            <button
                              className="icon-btn"
                              style={styles.iconBtn}
                              onClick={() => onEdit(department)}
                              title="Edit department"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                              </svg>
                            </button>
                            <button
                              className="icon-btn icon-btn-danger"
                              style={{
                                ...styles.iconBtn,
                                ...styles.iconBtnDanger,
                              }}
                              onClick={() => handleDelete(department._id)}
                              title="Delete department"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 6h18" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add global hover styles for icon buttons */}
      <style>{`
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

const styles: Record<string, React.CSSProperties> = {
  // ... (all previous styles, but replace actionBtn and actionBtnDanger with these)
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0c",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    padding: "28px 36px 0",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  headerTitle: { margin: 0, fontSize: "24px", fontWeight: 600, color: "#fff" },
  headerSubtitle: { margin: "4px 0 0", fontSize: "13px", color: "#9ca3af" },
  searchInput: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "#141417",
    color: "#fff",
    fontSize: "14px",
    width: "220px",
    outline: "none",
  },
  badge: {
    backgroundColor: "rgba(59,130,246,0.15)",
    color: "#60a5fa",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  addBtn: {
    padding: "9px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontSize: "13.5px",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    padding: "20px 36px 0",
  },
  statCard: {
    backgroundColor: "#141417",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "18px 20px",
  },
  statLabel: { margin: 0, fontSize: "13px", color: "#9ca3af" },
  statValue: {
    margin: "8px 0",
    fontSize: "26px",
    fontWeight: 600,
    color: "#fff",
  },
  statLink: { fontSize: "12px", color: "#60a5fa", cursor: "pointer" },
  body: { padding: "24px 36px 36px" },
  stateContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "12px",
  },
  emptyIcon: { fontSize: "40px" },
  stateTitle: { margin: 0, fontSize: "16px", fontWeight: 600, color: "#fff" },
  stateText: { margin: 0, fontSize: "14px", color: "#9ca3af" },
  spinner: {
    width: "32px",
    height: "32px",
    border: "3px solid rgba(255,255,255,0.1)",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "8px",
    padding: "16px 20px",
    color: "#f87171",
    fontSize: "14px",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#141417",
    fontSize: "14px",
    minWidth: "600px",
  },
  th: {
    padding: "14px 16px",
    textAlign: "left",
    fontWeight: 600,
    color: "#9ca3af",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    backgroundColor: "#0f0f12",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    transition: "background 0.15s",
  },
  td: {
    padding: "14px 16px",
    color: "#e5e7eb",
    verticalAlign: "middle",
  },
  deptName: {
    fontWeight: 500,
    color: "#fff",
  },
  cardStatus: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#4ade80",
    backgroundColor: "rgba(34,197,94,0.12)",
    padding: "4px 12px",
    borderRadius: "20px",
    display: "inline-block",
  },
  actionGroup: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  iconBtn: {
    // Base style – we use className for hover, so this is just for layout
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    color: "#9ca3af",
    cursor: "pointer",
    padding: 0,
    transition: "background 0.2s, color 0.2s",
  },
  iconBtnDanger: {
    // Additional styling – hover handled via CSS class
  },
};

export default DepartmentList;
