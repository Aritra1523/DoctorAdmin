// const LoadingState = () => (
//   <div style={styles.container}>
//     <div style={styles.spinner} />
//     <p style={styles.text}>Loading departments...</p>
//   </div>
// );

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     minHeight: "100vh",
//     backgroundColor: "#0a0a0c",
//     padding: "80px 20px",
//     gap: "12px",
//   },
//   spinner: {
//     width: "32px",
//     height: "32px",
//     border: "3px solid rgba(255,255,255,0.1)",
//     borderTop: "3px solid #3b82f6",
//     borderRadius: "50%",
//     animation: "spin 0.8s linear infinite",
//   },
//   text: { 
//     margin: 0, 
//     fontSize: "14px", 
//     color: "#9ca3af" 
//   },
// };

// export default LoadingState;


import { Skeleton } from "@/component/shared/Skeleton";

const TABLE_HEADERS = [
  "#",
  "Department Name",
  "Description",
  "Doctors",
  "Status",
  "Actions",
];

const LoadingState = () => (
  <div style={styles.pageWrapper}>
    {/* Header */}
    <div style={styles.header}>
      <div>
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div style={styles.headerRight}>
        <Skeleton className="h-10 w-[220px] rounded-lg" />
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>
    </div>

    {/* Stats row */}
    <div style={styles.statsRow}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={styles.statCard}>
          <Skeleton className="h-3 w-24 mb-3" />
          <Skeleton className="h-7 w-16 mb-3" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>

    {/* Table */}
    <div style={styles.body}>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              {TABLE_HEADERS.map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} style={styles.tr}>
                <td style={styles.td}><Skeleton className="h-4 w-6" /></td>
                <td style={styles.td}><Skeleton className="h-4 w-28" /></td>
                <td style={styles.td}><Skeleton className="h-4 w-40" /></td>
                <td style={styles.td}><Skeleton className="h-4 w-32" /></td>
                <td style={styles.td}><Skeleton className="h-5 w-16 rounded-full" /></td>
                <td style={styles.td}><Skeleton className="h-6 w-16" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0c",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
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
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    padding: "20px 36px 0",
  },
  statCard: {
    backgroundColor: "#141417",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "18px 20px",
  },
  body: {
    padding: "24px 36px 36px",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#141417",
    fontSize: "14px",
    minWidth: "600px",
  },
  th: {
    padding: "14px 16px",
    textAlign: "left",
    fontWeight: 600,
    color: "#9ca3af",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    backgroundColor: "#0f0f12",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  td: {
    padding: "14px 16px",
    verticalAlign: "middle",
  },
};

export default LoadingState;
