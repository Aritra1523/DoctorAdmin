import { Department } from "@/typeScript/admin/crud";
import DepartmentRow from "./DepartmentRow";

interface DepartmentTableProps {
  departments: Department[];
  doctorsByDepartment: Map<string, string[]>;
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
}

const DepartmentTable = ({
  departments,
  doctorsByDepartment,
  onEdit,
  onDelete,
}: DepartmentTableProps) => {
  return (
    <div style={styles.body}>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Department Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Doctors</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <DepartmentRow
                key={department._id}
                department={department}
                index={index}
                doctors={doctorsByDepartment.get(department._id) || []}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  body: { 
    padding: "24px 36px 36px" 
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
};

export default DepartmentTable;