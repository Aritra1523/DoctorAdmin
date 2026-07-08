
"use client";

interface ActionsProps {
  accepted: number;
  pending: number;
  cancelled: number;
  total: number;
}

export function DashboardActions({ accepted, pending, cancelled, total }: ActionsProps) {
  const quickActions = [
    {
      href: "/doctors",
      label: "Add doctor",
      bg: "rgba(59,130,246,0.12)",
      border: "rgba(59,130,246,0.2)",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ),
    },
    {
      href: "/deperatments/add",
      label: "Add department",
      bg: "rgba(168,85,247,0.12)",
      border: "rgba(168,85,247,0.2)",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round">
          <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        </svg>
      ),
    },
    {
      href: "/appointments",
      label: "View appointments",
      bg: "rgba(34,197,94,0.1)",
      border: "rgba(34,197,94,0.2)",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  const statuses = [
    { label: "Accepted", color: "#4ade80", count: accepted },
    { label: "Pending", color: "#facc15", count: pending },
    { label: "Cancelled", color: "#f87171", count: cancelled },
  ];

  return (
    <div className="grid grid-cols-2 gap-3.5">
      {/* Quick actions */}
      <div className="bg-[#141417] border border-white/[0.07] rounded-xl px-5 py-[18px]">
        <div className="mb-4">
          <span className="text-sm font-medium text-[#e2e8f0]">Quick actions</span>
        </div>

        {quickActions.map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] mb-2 last:mb-0 cursor-pointer hover:bg-white/[0.05] transition-colors"
          >
            <div
              className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center shrink-0"
              style={{ background: btn.bg, border: `1px solid ${btn.border}` }}
            >
              {btn.icon}
            </div>
            <span className="text-[13px] text-[#d1d5db] font-normal">{btn.label}</span>
            <span className="text-[#374151] text-sm ml-auto">›</span>
          </a>
        ))}
      </div>

      {/* Status breakdown */}
      <div className="bg-[#141417] border border-white/[0.07] rounded-xl px-5 py-[18px]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-[#e2e8f0]">Appointment status</span>
          <span className="text-xs text-[#60a5fa]">today</span>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {statuses.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: row.color }} />
                <span className="text-[13px] text-[#9ca3af]">{row.label}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-[100px] h-1.5 bg-white/[0.06] rounded-full">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${Math.round((row.count / total) * 100)}%`, background: row.color }}
                  />
                </div>
                <span className="text-[13px] font-medium text-[#e2e8f0] min-w-[22px] text-right">
                  {row.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}