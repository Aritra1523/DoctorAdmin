"use client";

import useCancelAppointment from "@/customHooks/AppointmentList/useCancelAppointment";
import useDoctorAppointment from "@/customHooks/AppointmentList/useDoctorAppointment";
import { useMemo, useState } from "react";

interface DoctorAppointmentProps {
  doctorId: string;
}

const DoctorAppointment = ({ doctorId }: DoctorAppointmentProps) => {
  const { doctorAppointments, loading, error } = useDoctorAppointment(doctorId);

  const { handleCancel } = useCancelAppointment();

  const [search, setSearch] = useState("");

  const filteredAppointments = useMemo(() => {
    return doctorAppointments.filter((appointment: any) => {
      const keyword = search.toLowerCase();

      return (
        appointment.patientName?.toLowerCase().includes(keyword) ||
        appointment.status?.toLowerCase().includes(keyword) ||
        appointment.appointmentDate?.toLowerCase().includes(keyword)
      );
    });
  }, [doctorAppointments, search]);

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
          <h2 style={styles.title}>Doctor Appointments</h2>

          <p style={styles.subtitle}>
            Total Appointment : {filteredAppointments.length}
          </p>
        </div>

        <input
          style={styles.search}
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading */}

      {loading && (
        <div style={styles.center}>
          <h2>Loading...</h2>
        </div>
      )}

      {/* Error */}

      {error && <div style={styles.error}>{error}</div>}

      {/* Empty */}

      {!loading && filteredAppointments.length === 0 && (
        <div style={styles.center}>
          <h2>No Appointment Found</h2>
        </div>
      )}

      {/* Table */}

      {!loading && filteredAppointments.length > 0 && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((appointment: any, index: number) => (
                <tr key={appointment._id}>
                  <td>{index + 1}</td>

                  <td>{appointment.name}</td>

                  <td>{appointment.date}</td>

                  <td>{appointment.time}</td>

                  <td>
                    <span
                      style={{
                        ...styles.status,
                        background: getStatusColor(appointment.status),
                      }}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td>
                    <button
                      style={styles.cancelButton}
                      disabled={
                        appointment.status?.toLowerCase() === "cancelled"
                      }
                      onClick={() => handleCancel(appointment._id)}
                    >
                      {appointment.status?.toLowerCase() === "cancelled"
                        ? "Cancelled"
                        : "Cancel"}
                    </button>
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
    marginTop: 6,
    color: "#64748B",
  },

  search: {
    width: 300,
    padding: 12,
    borderRadius: 8,
    border: "1px solid #CBD5E1",
    outline: "none",
  },

  center: {
    textAlign: "center",
    padding: 50,
  },

  error: {
    background: "#FEE2E2",
    color: "#991B1B",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },

  tableContainer: {
    background: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  status: {
    color: "#fff",
    padding: "5px 12px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
  },

  cancelButton: {
    background: "#DC2626",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default DoctorAppointment;
