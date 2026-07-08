const LoadingState = () => (
  <div style={styles.container}>
    <div style={styles.spinner} />
    <p style={styles.text}>Loading departments...</p>
  </div>
);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#0a0a0c",
    padding: "80px 20px",
    gap: "12px",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: "3px solid rgba(255,255,255,0.1)",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  text: { 
    margin: 0, 
    fontSize: "14px", 
    color: "#9ca3af" 
  },
};

export default LoadingState;