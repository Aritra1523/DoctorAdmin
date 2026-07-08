interface StatCardProps {
  label: string;
  value: string | number;
  linkLabel: string;
}

const StatCard = ({ label, value, linkLabel }: StatCardProps) => {
  return (
    <div style={styles.statCard}>
      <p style={styles.statLabel}>{label}</p>
      <p style={styles.statValue}>{value}</p>
      <span style={styles.statLink}>{linkLabel}</span>
    </div>
  );
};

const styles = {
  statCard: {
    backgroundColor: "#141417",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "18px 20px",
  },
  statLabel: { 
    margin: 0, 
    fontSize: "13px", 
    color: "#9ca3af" 
  },
  statValue: {
    margin: "8px 0",
    fontSize: "26px",
    fontWeight: 600,
    color: "#fff",
  },
  statLink: { 
    fontSize: "12px", 
    color: "#60a5fa", 
    cursor: "pointer" 
  },
};

export default StatCard;