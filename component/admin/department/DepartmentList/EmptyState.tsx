interface EmptyStateProps {
  hasDepartments: boolean;
}

const EmptyState = ({ hasDepartments }: EmptyStateProps) => (
  <div style={styles.container}>
    <div style={styles.emptyIcon}>🗂️</div>
    <p style={styles.title}>
      {hasDepartments ? "No matching departments" : "No departments yet"}
    </p>
    <p style={styles.text}>
      {hasDepartments
        ? "Try adjusting your search term."
        : "Add your first department to get started."}
    </p>
  </div>
);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "12px",
  },
  emptyIcon: { 
    fontSize: "40px" 
  },
  title: { 
    margin: 0, 
    fontSize: "16px", 
    fontWeight: 600, 
    color: "#fff" 
  },
  text: { 
    margin: 0, 
    fontSize: "14px", 
    color: "#9ca3af" 
  },
};

export default EmptyState;