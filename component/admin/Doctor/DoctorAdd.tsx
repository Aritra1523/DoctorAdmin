"use client";

import useCreateDoctor from "@/customHooks/doctor/useAdd";
import useDepartmentList from "@/customHooks/Department/useDepartmentList";

interface Props {
  onSuccess?: () => void; 
}

const DoctorAdd = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    onSubmit: createDoctor,
    errors,
    isSubmitting,
  } = useCreateDoctor();

  const { departments, loading: deptLoading } = useDepartmentList();

  const handleSubmitForm = async (data: any) => {
    await createDoctor(data);
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      style={styles.form}
      noValidate
    >
      {/* Name */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Full name</label>
        <input
          type="text"
          placeholder="Dr. Full Name"
          {...register("name")}
          style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
        />
        {errors.name && <p style={styles.errorMsg}>{errors.name.message}</p>}
      </div>

      {/* Fees + Department */}
      <div style={styles.row}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Fees</label>
          <input
            type="number"
            placeholder="Consultation fees"
            {...register("fees")}
            style={{
              ...styles.input,
              ...(errors.fees ? styles.inputError : {}),
            }}
          />
          {errors.fees && <p style={styles.errorMsg}>{errors.fees.message}</p>}
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Department</label>
          <select
            {...register("departmentId")}
            defaultValue=""
            style={{
              ...styles.input,
              ...(errors.departmentId ? styles.inputError : {}),
            }}
          >
            <option value="" disabled>
              {deptLoading ? "Loading..." : "Select department"}
            </option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.departmentId && (
            <p style={styles.errorMsg}>{errors.departmentId.message}</p>
          )}
        </div>
      </div>

      {/* Start + End time */}
      <div style={styles.row}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Start time</label>
          <input
            type="time"
            {...register("schedule.startTime")}
            style={{
              ...styles.input,
              ...(errors.schedule?.startTime ? styles.inputError : {}),
            }}
          />
          {errors.schedule?.startTime && (
            <p style={styles.errorMsg}>{errors.schedule.startTime.message}</p>
          )}
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>End time</label>
          <input
            type="time"
            {...register("schedule.endTime")}
            style={{
              ...styles.input,
              ...(errors.schedule?.endTime ? styles.inputError : {}),
            }}
          />
          {errors.schedule?.endTime && (
            <p style={styles.errorMsg}>{errors.schedule.endTime.message}</p>
          )}
        </div>
      </div>

      {/* Slot duration */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Slot duration (minutes)</label>
        <input
          type="number"
          placeholder="30"
          {...register("schedule.slotDuration")}
          style={{
            ...styles.input,
            ...(errors.schedule?.slotDuration ? styles.inputError : {}),
          }}
        />
        {errors.schedule?.slotDuration && (
          <p style={styles.errorMsg}>{errors.schedule.slotDuration.message}</p>
        )}
      </div>

      <div style={styles.actions}>
        <button type="button" onClick={onSuccess} style={styles.cancelBtn}>
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} style={styles.submitBtn}>
          {isSubmitting ? "Creating..." : "Create doctor"}
        </button>
      </div>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: 500, color: "#d1d5db" },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "#0a0a0c",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  inputError: { borderColor: "#ef4444" },
  errorMsg: { margin: 0, fontSize: "12.5px", color: "#f87171" },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    paddingTop: "8px",
  },
  cancelBtn: {
    padding: "9px 18px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "transparent",
    color: "#d1d5db",
    fontSize: "14px",
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

export default DoctorAdd;
