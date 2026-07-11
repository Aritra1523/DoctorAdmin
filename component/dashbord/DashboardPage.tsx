


"use client";

import { useMemo } from "react";
import useAppointmentList from "@/customHooks/AppointmentList/useAppointmentList";
import useDoctorList from "@/customHooks/doctor/useDoctorList";
import useDepartmentList from "@/customHooks/Department/useDepartmentList";
import { Appointment } from "@/typeScript/admin/Appointment/Appointment";
import { Doctor } from "@/typeScript/admin/crud";
import { DashboardStats } from "./DashboardStats";
import { DashboardRecent } from "./DashboardRecent";
import { DashboardActions } from "./DashboardActions";
import { todayStr } from "./dashboardHelpers";

export default function DashboardPage() {
  const { doctors, loading: doctorsLoading, total: totalDoctors } = useDoctorList();
  const { appointments, loading: appointmentsLoading } = useAppointmentList();
  const { departments, loading: departmentsLoading } = useDepartmentList();

  const today = new Date().toDateString();

  const appointmentsToday = appointments.filter(
    (a: Appointment) => new Date(a.appointmentDate).toDateString() === today
  );

  const accepted = appointments.filter(
    (a: Appointment) => a.status.toLowerCase() === "accepted"
  );

  const pending = appointments.filter(
    (a: Appointment) => a.status.toLowerCase() === "pending"
  );

  const cancelled = appointments.filter((a: Appointment) =>
    ["cancelled", "canceled"].includes(a.status.toLowerCase())
  );

  const deptBreakdown = useMemo(() => {
    const deptMap = new Map<string, { name: string; count: number }>();
    doctors.forEach((d: Doctor) => {
      const key = d.department?._id || d.departmentId;
      const name = d.department?.name || "Unassigned";
      const existing = deptMap.get(key);
      if (existing) existing.count += 1;
      else deptMap.set(key, { name, count: 1 });
    });
    return Array.from(deptMap.values()).sort((a, b) => b.count - a.count);
  }, [doctors]);

  const recentAppointments = useMemo(
    () =>
      [...appointments]
        .sort(
          (a, b) =>
            new Date(b.appointmentDate).getTime() -
            new Date(a.appointmentDate).getTime()
        )
        .slice(0, 5),
    [appointments]
  );

  const maxDeptCount = Math.max(1, ...deptBreakdown.map((d) => d.count));
  const total = appointments.length || 1;

  return (
    <div className="bg-[#0a0a0c] min-h-screen px-4 sm:px-6 lg:px-8 py-5 lg:py-7 text-[#e2e8f0]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 lg:mb-7 pt-2">
        <div>
          <div className="text-lg sm:text-[22px] font-semibold text-white">Dashboard</div>
          <div className="text-[13px] text-[#6b7280] mt-[3px]">
            Welcome back, Admin — here&apos;s what&apos;s happening today
          </div>
        </div>
        <div className="self-start sm:self-auto bg-[#141417] border border-white/[0.08] rounded-lg px-3.5 py-[7px] text-xs text-[#9ca3af]">
          {todayStr()}
        </div>
      </div>

      <DashboardStats
        doctors={doctors}
        departments={departments}
        appointmentsToday={appointmentsToday}
        accepted={accepted}
        totalDoctors={totalDoctors}
        doctorsLoading={doctorsLoading}
        appointmentsLoading={appointmentsLoading}
        departmentsLoading={departmentsLoading}
      />

      <DashboardRecent
        appointments={recentAppointments}
        deptBreakdown={deptBreakdown}
        maxDeptCount={maxDeptCount}
        loading={appointmentsLoading || doctorsLoading}
      />

      <DashboardActions
        accepted={accepted.length}
        pending={pending.length}
        cancelled={cancelled.length}
        total={total}
      />
    </div>
  );
}