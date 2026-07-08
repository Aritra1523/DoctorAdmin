interface DepartmentHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  departmentCount: number;
  onAddDepartment: () => void;
  isLoading: boolean;
  hasError: boolean;
}

const DepartmentHeader = ({
  searchTerm,
  onSearchChange,
  departmentCount,
  onAddDepartment,
  isLoading,
  hasError,
}: DepartmentHeaderProps) => {
  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.headerTitle}>Departments</h1>
        <p style={styles.headerSubtitle}>Manage hospital departments</p>
      </div>
      <div style={styles.headerRight}>
        <input
          type="text"
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={styles.searchInput}
        />
        {!isLoading && !hasError && (
          <div style={styles.badge}>
            {departmentCount} Department
            {departmentCount !== 1 ? "s" : ""}
          </div>
        )}
        <button style={styles.addBtn} onClick={onAddDepartment}>
          + Add department
        </button>
      </div>
    </div>
  );
};

const styles = {
  header: {
    padding: "28px 36px 0",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  headerTitle: { 
    margin: 0, 
    fontSize: "24px", 
    fontWeight: 600, 
    color: "#fff" 
  },
  headerSubtitle: { 
    margin: "4px 0 0", 
    fontSize: "13px", 
    color: "#9ca3af" 
  },
  searchInput: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "#141417",
    color: "#fff",
    fontSize: "14px",
    width: "220px",
    outline: "none",
  },
  badge: {
    backgroundColor: "rgba(59,130,246,0.15)",
    color: "#60a5fa",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  addBtn: {
    padding: "9px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontSize: "13.5px",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};

export default DepartmentHeader;