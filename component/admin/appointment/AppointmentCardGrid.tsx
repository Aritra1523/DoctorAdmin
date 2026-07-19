"use client";

import StatusPill from "@/component/admin/shared/StatusPill";

interface Props {
  appointments: any[];
  onCancel: (id: string) => void;
  onAccept: (id: string) => void;
}

const AVATAR_COLORS = [
  { bg: "#1d3a5f", fg: "#5b9bd5" },
  { bg: "#163322", fg: "#4ade80" },
  { bg: "#332006", fg: "#fbbf24" },
  { bg: "#2e0f0f", fg: "#f87171" },
  { bg: "#1d1530", fg: "#a78bfa" },
  { bg: "#101e30", fg: "#60a5fa" },
];

function getAvatar(name: string = "") {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  return { initials, ...color };
}

export default function AppointmentCardGrid({ appointments, onCancel, onAccept }: Props) {
  return (
    <div style={styles.grid}>
      {appointments.map((a: any, index: number) => {
        const av = getAvatar(a.patientName);
        const isCancelled = a.status?.toLowerCase() === "cancelled";
        const isPending = a.status?.toLowerCase() === "pending";

        return (
          <div key={a._id} style={styles.card}>

            {/* Card head: index + status */}
            <div style={styles.cardHead}>
              <span style={styles.index}>#{index + 1}</span>
              <StatusPill status={a.status} />
            </div>

            {/* Patient avatar + name */}
            <div style={styles.patientRow}>
              <div style={{ ...styles.avatar, background: av.bg, color: av.fg }}>
                {av.initials}
              </div>
              <div>
                <div style={styles.patientName}>{a.name}</div>
                {a.patientId && <div style={styles.patientId}>#{a.patientId}</div>}
              </div>
            </div>

            {/* Details */}
            <div style={styles.body}>
              <InfoRow label="Doctor" value={a.doctorName} />
              {a.department && <InfoRow label="Dept"   value={a.department} />}
              <InfoRow label="Date"   value={a.appointmentDate} />
              <InfoRow label="Time"   value={a.appointmentTime} />
            </div>

            {/* Accept / Cancel buttons */}
            <div style={styles.footer}>
              {isPending && (
                <button
                  style={styles.acceptBtn}
                  onClick={() => onAccept(a._id)}
                >
                  Accept
                </button>
              )}
              <button
                style={{ ...styles.cancelBtn, ...(isCancelled ? styles.cancelDisabled : {}) }}
                disabled={isCancelled}
                onClick={() => !isCancelled && onCancel(a._id)}
              >
                {isCancelled ? "Cancelled" : "Cancel Appointment"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p style={{ fontSize: 13, color: "#c5c5c5", marginBottom: 5, display: "flex", gap: 8 }}>
      <strong style={{ color: "#fff", minWidth: 48, fontWeight: 500 }}>{label}</strong>
      {value}
    </p>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
  },
  card: {
    background: "#171717",
    border: "0.5px solid #2a2a2a",
    borderRadius: 12,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    borderBottom: "0.5px solid #232323",
  },
  index: { fontSize: 11, color: "#6b6b6b", fontFamily: "monospace" },
  patientRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 14px 8px",
  },
  avatar: {
    width: 36, height: 36, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: 500, flexShrink: 0,
  },
  patientName: { fontSize: 13, fontWeight: 500, color: "#fff" },
  patientId:   { fontSize: 11, color: "#8a8a8a", marginTop: 1 },
  body:   { padding: "8px 14px 14px", flex: 1 },
  footer: {
    padding: "10px 14px",
    borderTop: "0.5px solid #232323",
    background: "#141414",
    display: "flex",
    gap: 8,
  },
  acceptBtn: {
    flex: 1,
    padding: "7px 12px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    border: "0.5px solid #163322",
    background: "#0d1f14",
    color: "#4ade80",
    fontFamily: "Inter, sans-serif",
  },
  cancelBtn: {
    flex: 1,
    padding: "7px 12px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    border: "0.5px solid #2e0f0f",
    background: "#1a0a0a",
    color: "#f87171",
    fontFamily: "Inter, sans-serif",
  },
  cancelDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    border: "0.5px solid #2a2a2a",
    background: "#1a1a1a",
    color: "#6b6b6b",
  },
};