import { Department } from "@/typeScript/admin/crud";
import { DeleteIcon, EditIcon } from "./Icons";

const ACCENT_COLORS = [
  "#3b82f6",
  "#a855f7",
  "#22c55e",
  "#eab308",
  "#ef4444",
  "#a45c2a",
];

interface DepartmentRowProps {
  department: Department;
  index: number;
  doctors: string[];
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
}

const DepartmentRow = ({
  department,
  index,
  doctors,
  onEdit,
  onDelete,
}: DepartmentRowProps) => {
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <tr style={styles.tr}>
      <td style={styles.td}>
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: color,
            marginRight: 10,
            verticalAlign: "middle",
          }}
        />
        {index + 1}
      </td>
      <td style={styles.td}>
        <strong style={styles.deptName}>{department.name}</strong>
      </td>
      <td style={styles.td}>{department.description || "—"}</td>
      <td style={styles.td}>
        {doctors.length ? (
          doctors.join(", ")
        ) : (
          <span style={{ color: "#9ca3af" }}>No doctors assigned</span>
        )}
      </td>
      <td style={styles.td}>
        <span style={styles.cardStatus}>Active</span>
      </td>
      <td style={styles.td}>
        <div style={styles.actionGroup}>
          <button
            className="icon-btn"
            style={styles.iconBtn}
            onClick={() => onEdit(department)}
            title="Edit department"
          >
            <EditIcon />
          </button>
          <button
            className="icon-btn icon-btn-danger"
            style={{
              ...styles.iconBtn,
              ...styles.iconBtnDanger,
            }}
            onClick={() => onDelete(department._id)}
            title="Delete department"
          >
            <DeleteIcon />
          </button>
        </div>
      </td>
    </tr>
  );
};

const styles = {
  tr: {
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    transition: "background 0.15s",
  },
  td: {
    padding: "14px 16px",
    color: "#e5e7eb",
    verticalAlign: "middle",
  },
  deptName: {
    fontWeight: 500,
    color: "#fff",
  },
  cardStatus: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#4ade80",
    backgroundColor: "rgba(34,197,94,0.12)",
    padding: "4px 12px",
    borderRadius: "20px",
    display: "inline-block",
  },
  actionGroup: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  iconBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    color: "#9ca3af",
    cursor: "pointer",
    padding: 0,
    transition: "background 0.2s, color 0.2s",
  },
  iconBtnDanger: {},
};

export default DepartmentRow;