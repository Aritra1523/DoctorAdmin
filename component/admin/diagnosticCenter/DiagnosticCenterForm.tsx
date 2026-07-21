"use client";

import useCreateDiagnosticCenter from "@/customHooks/DiagnosticCenter/useCreateDiagnosticCenter";

const DiagnosticCenterForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    handleBack,
    useMyLocation,
  } = useCreateDiagnosticCenter();

  return (
    <div style={styles.pageWrapper}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerIcon}>📍</span>

        <div>
          <h1 style={styles.headerTitle}>New Diagnostic Center</h1>
          <p style={styles.headerSubtitle}>
            Add a new diagnostic center to the system
          </p>
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.card}>
          <div style={styles.cardTitleBar}>
            <div style={styles.cardTitleDot} />
            <span style={styles.cardTitleText}>Center Details</span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={styles.form}
            noValidate
          >
            {/* Name */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Center Name</label>
              <input
                type="text"
                placeholder="e.g. Sunrise Diagnostics"
                {...register("name")}
                style={{
                  ...styles.input,
                  ...(errors.name ? styles.inputError : {}),
                }}
              />
              {errors.name && (
                <p style={styles.errorMsg}>{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Address</label>
              <input
                type="text"
                placeholder="Street, city, state"
                {...register("address")}
                style={{
                  ...styles.input,
                  ...(errors.address ? styles.inputError : {}),
                }}
              />
              {errors.address && (
                <p style={styles.errorMsg}>{errors.address.message}</p>
              )}
            </div>

            {/* Phone */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                {...register("phone")}
                style={{
                  ...styles.input,
                  ...(errors.phone ? styles.inputError : {}),
                }}
              />
              {errors.phone && (
                <p style={styles.errorMsg}>{errors.phone.message}</p>
              )}
            </div>

            {/* Coordinates */}
            <div style={styles.fieldGroup}>
              <div style={styles.coordHeader}>
                <label style={styles.label}>Coordinates</label>
                <button
                  type="button"
                  onClick={useMyLocation}
                  style={styles.locateBtn}
                >
                  Use my location
                </button>
              </div>

              <div style={styles.coordRow}>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Latitude"
                    {...register("lat")}
                    style={{
                      ...styles.input,
                      ...(errors.lat ? styles.inputError : {}),
                    }}
                  />
                  {errors.lat && (
                    <p style={styles.errorMsg}>{errors.lat.message}</p>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Longitude"
                    {...register("lng")}
                    style={{
                      ...styles.input,
                      ...(errors.lng ? styles.inputError : {}),
                    }}
                  />
                  {errors.lng && (
                    <p style={styles.errorMsg}>{errors.lng.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                style={styles.cancelBtn}
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                style={styles.submitBtn}
              >
                {isSubmitting ? "Saving..." : "Create Center"}
              </button>
            </div>
          </form>
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
  body: { padding: "24px 36px 36px", maxWidth: "560px" },
  card: {
    backgroundColor: "#141417",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "24px",
  },
  cardTitleBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
  },
  cardTitleDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#3b82f6",
  },
  cardTitleText: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: 500, color: "#d1d5db" },
  coordHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  coordRow: { display: "flex", gap: "12px" },
  locateBtn: {
    padding: "5px 12px",
    borderRadius: "6px",
    border: "1px solid rgba(59,130,246,0.4)",
    backgroundColor: "rgba(59,130,246,0.1)",
    color: "#60a5fa",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "#0a0a0c",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  },
  inputError: { borderColor: "#ef4444" },
  errorMsg: { margin: 0, fontSize: "12.5px", color: "#f87171" },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "8px",
  },
  cancelBtn: {
    padding: "9px 18px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "transparent",
    color: "#d1d5db",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },
  submitBtn: {
    padding: "9px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default DiagnosticCenterForm;