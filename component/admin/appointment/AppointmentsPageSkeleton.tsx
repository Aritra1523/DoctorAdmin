import { Skeleton } from "@/component/shared/Skeleton";

const AppointmentsPageSkeleton = () => (
  <div style={styles.wrapper}>
    {/* Page header */}
    <div style={styles.pageHead}>
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-9 w-40 rounded-lg" />
    </div>

    {/* Stat tiles */}
    <div style={styles.statGrid}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={styles.statCard}>
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-7 w-10 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>

    {/* Filters */}
    <div style={styles.filterBox}>
      <div style={styles.filterRow}>
        <Skeleton className="h-8 flex-1 max-w-[280px] rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>
      <div style={styles.tabsRow}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-md" />
        ))}
      </div>
    </div>

    {/* Table rows */}
    <div style={styles.table}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            ...styles.row,
            borderBottom: i < 5 ? "0.5px solid #2a2a2a" : "none",
          }}
        >
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-16 rounded-full ml-auto" />
        </div>
      ))}
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "2rem 1.5rem",
    color: "#e5e7eb",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  pageHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 14,
    marginBottom: "1.5rem",
  },
  statCard: {
    background: "#171717",
    border: "0.5px solid #2a2a2a",
    borderRadius: 12,
    padding: 16,
  },
  filterBox: {
    display: "flex",
    flexDirection: "column",
    background: "#171717",
    border: "0.5px solid #2a2a2a",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: "1.5rem",
  },
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    borderBottom: "0.5px solid #2a2a2a",
    background: "#141414",
  },
  tabsRow: {
    display: "flex",
    gap: 6,
    padding: "10px 16px",
  },
  table: {
    border: "0.5px solid #2a2a2a",
    borderRadius: 12,
    overflow: "hidden",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "14px 16px",
  },
};

export default AppointmentsPageSkeleton;
