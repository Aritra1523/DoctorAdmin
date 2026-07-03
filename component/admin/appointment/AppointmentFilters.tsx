"use client";

import { TabFilter } from "@/app/(adminPage)/appointments/page";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  activeTab: TabFilter;
  onTabChange: (tab: TabFilter) => void;
  counts: { all: number; pending: number; completed: number; cancelled: number };
}

const TABS: { key: TabFilter; label: string }[] = [
  { key: "all",       label: "All"       },
  { key: "pending",   label: "Pending"   },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const DEPARTMENTS = [
  "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Ophthalmology",
];

export default function AppointmentFilters({
  search, onSearchChange,
  department, onDepartmentChange,
  activeTab, onTabChange,
  counts,
}: Props) {
  return (
    <div style={styles.wrapper}>
      {/* Search + dropdowns row */}
      <div style={styles.filterRow}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Search patient / doctor…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select
          style={styles.select}
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
        >
          <option value="">All departments</option>
          {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select
          style={styles.select}
          value={activeTab}
          onChange={(e) => onTabChange(e.target.value as TabFilter)}
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Status tabs */}
      <div style={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.key}
            style={{
              ...styles.tab,
              ...(activeTab === t.key ? styles.tabActive : {}),
            }}
            onClick={() => onTabChange(t.key)}
          >
            {t.label}
            <span style={{
              ...styles.tabCount,
              ...(activeTab === t.key ? styles.tabCountActive : {}),
            }}>
              {counts[t.key]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    background: "#171717",
    border: "0.5px solid #2a2a2a",
    borderRadius: 12,
    overflow: "hidden",
  },
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    borderBottom: "0.5px solid #2a2a2a",
    background: "#141414",
  },
  searchInput: {
    flex: 1,
    maxWidth: 280,
    padding: "7px 12px",
    border: "0.5px solid #2a2a2a",
    borderRadius: 6,
    background: "#1a1a1a",
    fontSize: 12,
    color: "#e5e5e5",
    outline: "none",
    fontFamily: "Inter, sans-serif",
  },
  select: {
    padding: "7px 10px",
    border: "0.5px solid #2a2a2a",
    borderRadius: 6,
    background: "#1a1a1a",
    fontSize: 12,
    color: "#c5c5c5",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    cursor: "pointer",
  },
  tabs: { display: "flex" },
  tab: {
    padding: "10px 18px",
    fontSize: 12.5,
    cursor: "pointer",
    color: "#8a8a8a",
    border: "none",
    borderBottom: "2px solid transparent",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "Inter, sans-serif",
  },
  tabActive: {
    color: "#5b9bd5",
    borderBottom: "2px solid #2563eb",
    fontWeight: 500,
  },
  tabCount: {
    fontSize: 10,
    background: "#232323",
    color: "#9b9b9b",
    padding: "1px 6px",
    borderRadius: 10,
  },
  tabCountActive: {
    background: "#101e30",
    color: "#5b9bd5",
  },
};