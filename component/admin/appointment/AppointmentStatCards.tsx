"use client";

import { TabFilter } from "./AppointmentsPage";

interface Props {
  counts: {
    all: number;
    pending: number;
    accepted: number;
    cancelled: number;
  };
  activeTab: TabFilter;
  onTabChange: (tab: TabFilter) => void;
}

const CARDS: { key: TabFilter; label: string; apiTag: string; icon: React.ReactNode }[] = [
  { 
    key: "all", 
    label: "All Appointments", 
    apiTag: "AppoinmentList",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )
  },
  { 
    key: "pending", 
    label: "Pending", 
    apiTag: "AppoinmentList",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  { 
    key: "accepted", 
    label: "Accepted", 
    apiTag: "AcceptList",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  },
  { 
    key: "cancelled", 
    label: "Cancelled", 
    apiTag: "Cancel_appoinment",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    )
  },
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
            <div style={styles.header}>
              <span style={styles.iconWrapper}>{card.icon}</span>
              <div style={styles.label}>{card.label}</div>
            </div>
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
  header: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  iconWrapper: {
    color: "#8a8a8a",
    display: "flex",
    alignItems: "center",
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