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
  const initials =
    name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "?";
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  return { initials, ...color };
}

const HEADERS = [
  "#",
  "Patient",
  "Doctor",
  "Department",
  "Date",
  "Time",
  "Status",
  "Action",
];

export default function AppointmentTable({ appointments, onCancel, onAccept }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHead}>
        <h2 style={styles.cardTitle}>All appointments</h2>
        <span style={styles.apiTag}>GET /AppoinmentList</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              {HEADERS.map((h) => (
                <th key={h} style={styles.th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.map((a: any, index: number) => {
              const av = getAvatar(a.name);
              const isCancelled = a.status?.toLowerCase() === "cancelled";
              const isPending = a.status?.toLowerCase() === "pending";
              return (
                <tr key={a._id}>
                  <td
                    style={{
                      ...styles.td,
                      color: "#6b6b6b",
                      fontFamily: "monospace",
                      fontSize: 12,
                    }}
                  >
                    {index + 1}
                  </td>
                  <td style={styles.td}>
                    <div style={styles.patCell}>
                      <div
                        style={{
                          ...styles.avatar,
                          background: av.bg,
                          color: av.fg,
                        }}
                      >
                        {av.initials}
                      </div>
                      <div>
                        <div style={styles.patName}>{a.name}</div>
                        {a.patientId && (
                          <div style={styles.patId}>#{a.patientId}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>{a.doctorName}</td>
                  <td style={{ ...styles.td, color: "#8a8a8a" }}>
                    {a.department ?? "—"}
                  </td>
                  <td style={styles.td}>
                    {new Date(a.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </td>
                  <td style={styles.td}>{a.time}</td>
                  <td style={styles.td}>
                    <StatusPill status={a.status} />
                  </td>
                  <td style={{ ...styles.td, textAlign: "right" }}>
                    <div style={styles.actionGroup}>
                      {isPending && (
                        <button
                          style={styles.acceptBtn}
                          onClick={() => onAccept(a._id)}
                        >
                          Accept
                        </button>
                      )}
                      <button
                        style={{
                          ...styles.cancelBtn,
                          ...(isCancelled ? styles.cancelDisabled : {}),
                        }}
                        disabled={isCancelled}
                        onClick={() => !isCancelled && onCancel(a._id)}
                      >
                        {isCancelled ? "Cancelled" : "Cancel"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={styles.apiFoot}>
        GET AppoinmentList · GET AcceptList · GET Cancel_appoinment · GET
        doctor_appointment
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#171717",
    border: "0.5px solid #2a2a2a",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderBottom: "0.5px solid #2a2a2a",
  },
  cardTitle: { fontSize: 14, fontWeight: 500, color: "#fff", margin: 0 },
  apiTag: { fontFamily: "monospace", fontSize: 10, color: "#5b9bd5" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    fontSize: 11,
    fontWeight: 500,
    color: "#6b6b6b",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    padding: "10px 18px",
    textAlign: "left",
    borderBottom: "0.5px solid #2a2a2a",
    background: "#141414",
  },
  td: {
    padding: "12px 18px",
    borderBottom: "0.5px solid #232323",
    color: "#c5c5c5",
    verticalAlign: "middle",
  },
  patCell: { display: "flex", alignItems: "center", gap: 10 },
  actionGroup: { display: "flex", gap: 8, justifyContent: "flex-end" },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 500,
    flexShrink: 0,
  },
  patName: { fontSize: 13, fontWeight: 500, color: "#fff" },
  patId: { fontSize: 11, color: "#8a8a8a", marginTop: 1 },
  acceptBtn: {
    padding: "5px 12px",
    borderRadius: 6,
    fontSize: 11.5,
    fontWeight: 500,
    cursor: "pointer",
    border: "0.5px solid #163322",
    background: "#0d1f14",
    color: "#4ade80",
    fontFamily: "Inter, sans-serif",
  },
  cancelBtn: {
    padding: "5px 12px",
    borderRadius: 6,
    fontSize: 11.5,
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
  apiFoot: {
    padding: "10px 18px",
    borderTop: "0.5px solid #2a2a2a",
    background: "#141414",
    fontSize: 10,
    color: "#6b6b6b",
    fontFamily: "monospace",
  },
};