"use client";

import { TabFilter } from "./AppointmentsPage";

interface Props {
  counts: {
    all: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  activeTab: TabFilter;
  onTabChange: (tab: TabFilter) => void;
}

const CARDS: { key: TabFilter; label: string; apiTag: string }[] = [
  { key: "all", label: "All Appointments", apiTag: "AppoinmentList" },
  { key: "pending", label: "Pending", apiTag: "AppoinmentList" },
  { key: "completed", label: "Completed", apiTag: "AcceptList" },
  { key: "cancelled", label: "Cancelled", apiTag: "Cancel_appoinment" },
];

export default function AppointmentStatCards({
  counts,
  activeTab,
  onTabChange,
}: Props) {
  return (
    <div style={styles.grid}>
      {CARDS.map((card) => {
        const active = activeTab === card.key;
        return (
          <div
            key={card.key}
            style={{ ...styles.card, ...(active ? styles.cardActive : {}) }}
            onClick={() => onTabChange(card.key)}
          >
            <div style={styles.label}>{card.label}</div>
            <div style={styles.value}>{counts[card.key]}</div>
            <span style={styles.apiTag}>{card.apiTag}</span>
          </div>
        );
      })}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 14,
  },
  card: {
    background: "#171717",
    border: "0.5px solid #2a2a2a",
    borderRadius: 12,
    padding: "16px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    transition: "border-color 0.15s",
  },
  cardActive: {
    borderColor: "#2563eb",
    background: "#0d1829",
  },
  label: { fontSize: 12, color: "#8a8a8a" },
  value: {
    fontSize: 26,
    fontWeight: 500,
    color: "#fff",
    lineHeight: 1,
    marginTop: 4,
  },
  apiTag: {
    fontFamily: "monospace",
    fontSize: 9.5,
    color: "#5b9bd5",
    background: "#101e30",
    padding: "1px 6px",
    borderRadius: 4,
    marginTop: 6,
    display: "inline-block",
    width: "fit-content",
  },
};
