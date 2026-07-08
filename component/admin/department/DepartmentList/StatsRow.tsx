import StatCard from "./StatCard";

interface StatsRowProps {
  totalDepartments: number;
  totalDoctors: number;
}

const StatsRow = ({ totalDepartments, totalDoctors }: StatsRowProps) => {
  return (
    <div style={styles.statsRow}>
      <StatCard
        label="Total departments"
        value={totalDepartments}
        linkLabel="Department_list"
      />
      <StatCard
        label="Doctors assigned"
        value={totalDoctors}
        linkLabel="Department_wise_doc"
      />
      <StatCard
        label="Appointments today"
        value="—"
        linkLabel="AppointmentList"
      />
      <StatCard
        label="Most active"
        value="—"
        linkLabel="Department_wise_doc"
      />
    </div>
  );
};

const styles = {
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    padding: "20px 36px 0",
  },
};

export default StatsRow;