
// ---------- Helpers ----------
export const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const statusBadge = (status: string) => {
  const s = status.toLowerCase();
  if (s === "accepted") return "bg-[rgba(34,197,94,0.12)] text-[#4ade80]";
  if (s === "pending") return "bg-[rgba(234,179,8,0.12)] text-[#facc15]";
  if (s === "cancelled" || s === "canceled" || s === "rejected")
    return "bg-[rgba(239,68,68,0.12)] text-[#f87171]";
  return "bg-[rgba(148,163,184,0.12)] text-[#cbd5e1]";
};

export const formatTime = (time: string) => time;

export const todayStr = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// ---------- Constants ----------
export const AVATAR_COLORS = [
  { bg: "rgba(59,130,246,0.15)", text: "#93c5fd" },
  { bg: "rgba(168,85,247,0.15)", text: "#d8b4fe" },
  { bg: "rgba(34,197,94,0.12)", text: "#86efac" },
  { bg: "rgba(234,179,8,0.12)", text: "#fde047" },
  { bg: "rgba(239,68,68,0.12)", text: "#fca5a5" },
];

export const DEPT_COLORS = [
  "#3b82f6",
  "#a855f7",
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ec4899",
  "#14b8a6",
  "#6366f1",
];