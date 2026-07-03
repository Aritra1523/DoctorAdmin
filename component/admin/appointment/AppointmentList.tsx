"use client";

import useAppointmentList from "@/customHooks/AppointmentList/useAppointmentList";
import useCancelAppointment from "@/customHooks/AppointmentList/useCancelAppointment";
import { useMemo, useState } from "react";

const AppointmentList = () => {
  const { appointments, loading, error } = useAppointmentList();
  const { handleCancel } = useCancelAppointment();

  const [search, setSearch] = useState("");

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment: any) => {
      const keyword = search.toLowerCase();

      return (
        appointment.patientName?.toLowerCase().includes(keyword) ||
        appointment.doctorName?.toLowerCase().includes(keyword) ||
        appointment.status?.toLowerCase().includes(keyword)
      );
    });
  }, [appointments, search]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#16A34A";

      case "cancelled":
        return "#DC2626";

      case "pending":
        return "#F59E0B";

      default:
        return "#2563EB";
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}

      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Appointment Management</h2>

          <p style={styles.subtitle}>
            Total Appointment : {filteredAppointments.length}
          </p>
        </div>

        <input
          style={styles.search}
          placeholder="Search patient / doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading */}

      {loading && (
        <div style={styles.center}>
          <h3>Loading...</h3>
        </div>
      )}

      {/* Error */}

      {error && <div style={styles.error}>{error}</div>}

      {/* Empty */}

      {!loading && filteredAppointments.length === 0 && (
        <div style={styles.center}>
          <h3>No Appointment Found</h3>
        </div>
      )}

      {/* Cards */}

      <div style={styles.grid}>
        {filteredAppointments.map((appointment: any, index: number) => (
          <div key={appointment._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.index}>#{index + 1}</span>

              <span
                style={{
                  ...styles.status,
                  background: getStatusColor(appointment.status),
                }}
              >
                {appointment.status}
              </span>
            </div>

            <div style={styles.body}>
              <p>
                <strong>Patient :</strong> {appointment.name}
              </p>

              <p>
                <strong>Doctor :</strong> {appointment.doctorName}
              </p>

              <p>
                <strong>Date :</strong> {appointment.appointmentDate}
              </p>

              <p>
                <strong>Time :</strong> {appointment.appointmentTime}
              </p>
            </div>

            <div style={styles.footer}>
              <button
                style={styles.cancel}
                disabled={appointment.status?.toLowerCase() === "cancelled"}
                onClick={() => handleCancel(appointment._id)}
              >
                {appointment.status?.toLowerCase() === "cancelled"
                  ? "Cancelled"
                  : "Cancel Appointment"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
    marginBottom: 30,
    flexWrap: "wrap",
    gap: 20,
  },

  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
  },

  subtitle: {
    color: "#64748B",
    marginTop: 6,
  },

  search: {
    width: 300,
    padding: 12,
    borderRadius: 8,
    border: "1px solid #CBD5E1",
    outline: "none",
    fontSize: 15,
  },

  center: {
    textAlign: "center",
    padding: 60,
  },

  error: {
    background: "#FEE2E2",
    color: "#991B1B",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
    gap: 20,
  },

  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
    border: "1px solid #E2E8F0",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  index: {
    fontWeight: 700,
    color: "#0F766E",
  },

  status: {
    color: "#fff",
    padding: "4px 12px",
    borderRadius: 30,
    fontSize: 13,
    fontWeight: 600,
  },

  body: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    color: "#334155",
    marginBottom: 20,
  },

  footer: {
    display: "flex",
    justifyContent: "flex-end",
  },

  cancel: {
    background: "#DC2626",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default AppointmentList;
