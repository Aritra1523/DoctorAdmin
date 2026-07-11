

"use client";

import { Skeleton } from "@/component/shared/Skeleton";

interface StatsProps {
  doctors: any[];
  departments: any[];
  appointmentsToday: any[];
  accepted: any[];
  totalDoctors: number;
  doctorsLoading: boolean;
  appointmentsLoading: boolean;
  departmentsLoading: boolean;
}

export function DashboardStats({
  doctors,
  departments,
  appointmentsToday,
  accepted,
  totalDoctors,
  doctorsLoading,
  appointmentsLoading,
  departmentsLoading,
}: StatsProps) {
  const stats = [
    {
      label: "Total doctors",
      value: totalDoctors ?? doctors.length,
      loading: doctorsLoading,
      sub: "from doctor_list",
      iconBg: "rgba(59,130,246,0.12)",
      iconBorder: "rgba(59,130,246,0.2)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      label: "Appointments today",
      value: appointmentsToday.length,
      loading: appointmentsLoading,
      sub: "from AppointmentList",
      iconBg: "rgba(34,197,94,0.1)",
      iconBorder: "rgba(34,197,94,0.2)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: "Accepted",
      value: accepted.length,
      loading: appointmentsLoading,
      sub: "from AcceptList",
      iconBg: "rgba(234,179,8,0.1)",
      iconBorder: "rgba(234,179,8,0.2)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      label: "Departments",
      value: departments.length,
      loading: departmentsLoading,
      sub: "from Department_list",
      iconBg: "rgba(168,85,247,0.1)",
      iconBorder: "rgba(168,85,247,0.2)",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round">
          <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[#141417] border border-white/[0.07] rounded-xl px-5 py-[18px]">
          <div
            className="w-[34px] h-[34px] rounded-lg flex items-center justify-center mb-3"
            style={{ background: stat.iconBg, border: `1px solid ${stat.iconBorder}` }}
          >
            {stat.icon}
          </div>
          <div className="text-xs text-[#6b7280] mb-1.5">{stat.label}</div>
          {stat.loading ? (
            <Skeleton className="h-[26px] w-14" />
          ) : (
            <div className="text-[26px] font-semibold text-white leading-none">{stat.value}</div>
          )}
          <div className="text-[11.5px] text-[#374151] mt-[5px]">{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}