"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getNearbyDiagnosticCenters } from "@/redux/slice/diagnosticCenterSlice/diagnosticCenterSlice";

const DiagnosticCenterList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { centers, loading, error } = useSelector(
    (state: RootState) => state.diagnosticCenter,
  );

  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [distance, setDistance] = useState("5000");

  const handleSearch = () => {
    if (!lat || !lng) return;
    dispatch(getNearbyDiagnosticCenters({ lat, lng, distance }));
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.header}>
        <span style={styles.headerIcon}>🔎</span>
        <div>
          <h1 style={styles.headerTitle}>Nearby Diagnostic Centers</h1>
          <p style={styles.headerSubtitle}>
            Search centers by coordinates and radius
          </p>
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Radius (m)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            style={styles.input}
          />
          <button style={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>

        {loading && <p style={styles.muted}>Searching…</p>}
        {error && <p style={styles.errorMsg}>{error}</p>}

        {!loading && !error && centers.length === 0 && (
          <p style={styles.muted}>
            No results yet. Enter coordinates above and search.
          </p>
        )}

        <div style={styles.list}>
          {centers.map((center) => (
            <div key={center._id} style={styles.card}>
              <div>
                <h3 style={styles.cardTitle}>{center.name}</h3>
                <p style={styles.cardSub}>
                  {center.address} · {center.phone}
                </p>
              </div>
              {typeof center.distance === "number" && (
                <span style={styles.distTag}>
                  {(center.distance / 1000).toFixed(2)} km
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0c",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "28px 36px 0",
  },
  headerIcon: { fontSize: "28px" },
  headerTitle: { margin: 0, fontSize: "22px", fontWeight: 600, color: "#fff" },
  headerSubtitle: { margin: "4px 0 0", fontSize: "13px", color: "#9ca3af" },
  body: { padding: "24px 36px 36px", maxWidth: "720px" },
  searchBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "24px",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "#141417",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  searchBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  muted: { color: "#9ca3af", fontSize: "13.5px" },
  errorMsg: { color: "#f87171", fontSize: "13.5px" },
  list: { display: "flex", flexDirection: "column", gap: "10px" },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    backgroundColor: "#141417",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "14px 18px",
  },
  cardTitle: { margin: "0 0 4px", fontSize: "15px", color: "#fff" },
  cardSub: { margin: 0, fontSize: "13px", color: "#9ca3af" },
  distTag: {
    fontSize: "13px",
    fontFamily: "monospace",
    backgroundColor: "rgba(59,130,246,0.1)",
    color: "#60a5fa",
    padding: "5px 10px",
    borderRadius: "6px",
    whiteSpace: "nowrap",
  },
};

export default DiagnosticCenterList;