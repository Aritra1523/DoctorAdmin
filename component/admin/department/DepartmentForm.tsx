"use client";

import { useEffect } from "react";
import useCreateDepartment from "@/customHooks/Department/useCreateDepartment";
import useUpdateDepartment from "@/customHooks/Department/useUpdateDepartment";
import { Department } from "@/typeScript/admin/crud";

interface DepartmentFormProps {
  selectedDepartment: Department | null;
  clearSelectedDepartment: () => void;
}

const DepartmentForm = ({
  selectedDepartment,
  clearSelectedDepartment,
}: DepartmentFormProps) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    reset,
    handleBack,
  } = useCreateDepartment();

  const { handleUpdate } = useUpdateDepartment();

  useEffect(() => {
    if (selectedDepartment) {
      reset({
        name: selectedDepartment.name,
        description: selectedDepartment.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [selectedDepartment, reset]);

  const submitHandler = async (data: { name: string; description: string }) => {
    if (selectedDepartment) {
      await handleUpdate({
        id: selectedDepartment._id,
        name: data.name,
        description: data.description,
      });

      clearSelectedDepartment();

      reset({
        name: "",
        description: "",
      });
    } else {
      await onSubmit(data);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerIcon}>🏥</span>

        <div>
          <h1 style={styles.headerTitle}>
            {selectedDepartment ? "Edit Department" : "New Department"}
          </h1>

          <p style={styles.headerSubtitle}>
            {selectedDepartment
              ? "Update department information"
              : "Add a new department to the system"}
          </p>
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.card}>
          <div style={styles.cardTitleBar}>
            <div style={styles.cardTitleDot} />
            <span style={styles.cardTitleText}>Department Details</span>
          </div>

          <form
            onSubmit={handleSubmit(submitHandler)}
            style={styles.form}
            noValidate
          >
            {/* Department Name */}

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Department Name</label>

              <input
                type="text"
                placeholder="Department Name"
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

            {/* Description */}

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Description</label>

              <textarea
                rows={5}
                placeholder="Description..."
                {...register("description")}
                style={{
                  ...styles.textarea,
                  ...(errors.description ? styles.inputError : {}),
                }}
              />

              {errors.description && (
                <p style={styles.errorMsg}>{errors.description.message}</p>
              )}
            </div>

            <div style={styles.actions}>
              {selectedDepartment && (
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => {
                    clearSelectedDepartment();

                    reset({
                      name: "",
                      description: "",
                    });
                  }}
                >
                  Cancel Edit
                </button>
              )}
              <button type="submit" style={styles.submitBtn} onClick={handleBack}>
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                style={styles.submitBtn}
              >
                {isSubmitting
                  ? "Saving..."
                  : selectedDepartment
                    ? "Update Department"
                    : "Create Department"}
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
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "#0a0a0c",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "#0a0a0c",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
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

export default DepartmentForm;
