"use client";

import useDepartmentWiseDoctor from "@/customHooks/AppointmentList/useDepartmentWiseDoctor";
import { useMemo, useState } from "react";

interface Props {
  departmentId: string;
}

const DepartmentWiseDoctor = ({ departmentId }: Props) => {
  const { doctors, loading, error } = useDepartmentWiseDoctor(departmentId);

  const [search, setSearch] = useState("");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor: any) =>
      doctor.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [doctors, search]);

  const totalFees = filteredDoctors.reduce(
    (sum: number, doctor: any) => sum + Number(doctor.fees || 0),
    0,
  );

  const avgFees =
    filteredDoctors.length > 0
      ? Math.round(totalFees / filteredDoctors.length)
      : 0;

  const totalSlotDuration = filteredDoctors.reduce(
    (sum: number, doctor: any) =>
      sum + Number(doctor.schedule?.slotDuration || 0),
    0,
  );

  const avgSlotDuration =
    filteredDoctors.length > 0
      ? Math.round(totalSlotDuration / filteredDoctors.length)
      : 0;

  const formatDuration = (minutes: number) => {
    const totalSeconds = minutes * 60;

    const hours = Math.floor(totalSeconds / 3600);

    const mins = Math.floor((totalSeconds % 3600) / 60);

    const secs = totalSeconds % 60;

    return `${hours}h ${mins}m ${secs}s`;
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}

      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Department Doctors</h2>

          <p style={styles.subtitle}>
            Total Doctors : {filteredDoctors.length}
          </p>
        </div>

        <input
          style={styles.search}
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Stats */}

      {!loading && (
        <div style={styles.statsGrid}>
          <StatCard title="Doctors" value={filteredDoctors.length} />

          <StatCard title="Total Fees" value={`₹${totalFees}`} />

          <StatCard title="Average Fees" value={`₹${avgFees}`} />

          <StatCard
            title="Average Slot"
            value={formatDuration(avgSlotDuration)}
          />
        </div>
      )}

      {/* Loading */}

      {loading && <div style={styles.center}>Loading doctors...</div>}

      {/* Error */}

      {error && <div style={styles.error}>{error}</div>}

      {/* Empty */}

      {!loading && filteredDoctors.length === 0 && (
        <div style={styles.center}>No Doctors Found</div>
      )}

      {/* Table */}

      {!loading && filteredDoctors.length > 0 && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Fees</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Slot Duration</th>
              </tr>
            </thead>

            <tbody>
              {filteredDoctors.map((doctor: any, index: number) => (
                <tr key={doctor._id}>
                  <td>{index + 1}</td>

                  <td>{doctor.name}</td>

                  <td>₹{Number(doctor.fees).toLocaleString()}</td>

                  <td>{doctor.schedule?.startTime}</td>

                  <td>{doctor.schedule?.endTime}</td>

                  <td>
                    {formatDuration(Number(doctor.schedule?.slotDuration || 0))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div style={styles.statCard}>
    <div style={styles.statTitle}>{title}</div>

    <div style={styles.statValue}>{value}</div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    padding: 30,
    background: "#F8FAFC",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    flexWrap: "wrap",
    gap: 20,
  },

  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
  },

  subtitle: {
    marginTop: 5,
    color: "#64748B",
  },

  search: {
    width: 280,
    padding: 12,
    borderRadius: 8,
    border: "1px solid #CBD5E1",
    outline: "none",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 20,
    marginBottom: 30,
  },

  statCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,.08)",
  },

  statTitle: {
    color: "#64748B",
    fontSize: 14,
  },

  statValue: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: 700,
    color: "#0F172A",
  },

  tableWrapper: {
    background: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  center: {
    textAlign: "center",
    padding: 60,
    fontSize: 18,
  },

  error: {
    background: "#FEE2E2",
    color: "#B91C1C",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
};

export default DepartmentWiseDoctor;
