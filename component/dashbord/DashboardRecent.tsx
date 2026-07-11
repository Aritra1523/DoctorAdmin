



"use client";

import { Appointment } from "@/typeScript/admin/Appointment/Appointment";
import { AVATAR_COLORS, DEPT_COLORS, initials, statusBadge, formatTime } from "./dashboardHelpers";
import { Skeleton } from "@/component/shared/Skeleton";

interface RecentProps {
  appointments: Appointment[];
  deptBreakdown: { name: string; count: number }[];
  maxDeptCount: number;
  loading: boolean;
}

export function DashboardRecent({ appointments, deptBreakdown, maxDeptCount, loading }: RecentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-3.5 mb-3.5">
      {/* Recent appointments */}
      <div className="bg-[#141417] border border-white/[0.07] rounded-xl px-5 py-[18px]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-[#e2e8f0]">Recent appointments</span>
          <a href="/appointments" className="text-xs text-[#60a5fa] hover:underline">
            AppointmentList →
          </a>
        </div>

        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-b-0"
            >
              <Skeleton className="w-8 h-8 rounded-full shrink-0" />
              <div className="flex-1 min-w-0 px-3">
                <Skeleton className="h-3.5 w-32 mb-1.5" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-3 w-10 shrink-0" />
              <div className="w-2.5 shrink-0" />
              <Skeleton className="h-5 w-16 rounded-full shrink-0" />
            </div>
          ))}
        {!loading && appointments.length === 0 && (
          <div className="text-sm text-[#6b7280] py-4">No appointments yet.</div>
        )}

        {!loading && appointments.map((a, i) => {
          const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
          return (
            <div key={a._id} className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-b-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                style={{ background: color.bg, color: color.text }}
              >
                {initials(a.doctorName || "Dr")}
              </div>
              <div className="flex-1 min-w-0 px-3">
                <div className="text-[13px] font-medium text-[#e2e8f0] truncate">{a.doctorName}</div>
                <div className="text-[11.5px] text-[#6b7280] mt-px truncate">{a.patientName}</div>
              </div>
              <div className="text-xs text-[#9ca3af] shrink-0">{formatTime(a.appointmentTime)}</div>
              <div className="w-2.5 shrink-0" />
              <span className={`text-[11px] font-semibold px-2.5 py-[3px] rounded-full shrink-0 whitespace-nowrap ${statusBadge(a.status)}`}>
                {a.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Department breakdown */}
      <div className="bg-[#141417] border border-white/[0.07] rounded-xl px-5 py-[18px]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-[#e2e8f0]">Doctors per department</span>
          <a href="/deperatments" className="text-xs text-[#60a5fa] hover:underline">
            Department_wise_doctor →
          </a>
        </div>

        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 py-[9px] border-b border-white/[0.05] last:border-b-0">
              <Skeleton className="w-2 h-2 rounded-full shrink-0" />
              <Skeleton className="h-3.5 w-24 flex-1" />
              <Skeleton className="h-1 flex-1 rounded-full" />
              <Skeleton className="h-3 w-6" />
            </div>
          ))}
        {!loading && deptBreakdown.length === 0 && (
          <div className="text-sm text-[#6b7280] py-4">No doctors yet.</div>
        )}

        {!loading && deptBreakdown.map((d, i) => {
          const color = DEPT_COLORS[i % DEPT_COLORS.length];
          const pct = Math.round((d.count / maxDeptCount) * 100);
          return (
            <div key={d.name} className="flex items-center gap-2.5 py-[9px] border-b border-white/[0.05] last:border-b-0">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
              <div className="text-[13px] text-[#e2e8f0] flex-1 min-w-0 truncate">{d.name}</div>
              <div className="h-1 bg-white/[0.07] rounded-full flex-1">
                <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: color }} />
              </div>
              <div className="text-xs font-medium text-[#9ca3af]">{d.count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}