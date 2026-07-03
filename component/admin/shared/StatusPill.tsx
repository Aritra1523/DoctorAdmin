"use client";

interface Props { status: string }

const MAP: Record<string, { bg: string; color: string; label: string }> = {
  completed: { bg: "#0f2e1a", color: "#4ade80", label: "Completed" },
  pending:   { bg: "#332006", color: "#fbbf24", label: "Pending"   },
  cancelled: { bg: "#2e0f0f", color: "#f87171", label: "Cancelled" },
};

export default function StatusPill({ status }: Props) {
  const cfg = MAP[status?.toLowerCase()] ?? { bg: "#101e30", color: "#5b9bd5", label: status };
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "3px 9px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 500,
      background: cfg.bg,
      color: cfg.color,
      whiteSpace: "nowrap",
    }}>
      {cfg.label}
    </span>
  );
}