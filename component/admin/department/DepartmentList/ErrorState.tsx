interface ErrorStateProps {
  error: string;
}

const ErrorState = ({ error }: ErrorStateProps) => (
  <div style={styles.container}>
    <div style={styles.errorBox}>
      <span>⚠️</span>
      <span>{error}</span>
    </div>
  </div>
);

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "8px",
    padding: "16px 20px",
    color: "#f87171",
    fontSize: "14px",
  },
};

export default ErrorState;