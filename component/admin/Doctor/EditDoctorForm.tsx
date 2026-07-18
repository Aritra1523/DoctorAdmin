
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useUpdateDoctor from "@/customHooks/doctor/useUpdateDoctor";
import useDepartmentList from "@/customHooks/Department/useDepartmentList";
import { UpdateDoctorPayload } from "@/typeScript/admin/doctor/doctor";
import { Doctor } from "@/typeScript/admin/crud";

interface Props {
  doctor: Doctor; //  full object, no fetch needed
  onSuccess?: () => void;
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#0a0a0c] px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-blue-500";
const labelClass = "block text-sm font-medium text-zinc-300 mb-2";

const EditDoctorForm = ({ doctor, onSuccess }: Props) => {
  const { handleUpdate } = useUpdateDoctor();
  const { departments, loading: deptLoading } = useDepartmentList();
  const { register, handleSubmit, reset } = useForm<UpdateDoctorPayload>();

  useEffect(() => {
    reset({
      id: doctor._id,
      name: doctor.name,
      fees: doctor.fees,
      departmentId: doctor.departmentId,
      schedule: {
        startTime: doctor.schedule.startTime,
        endTime: doctor.schedule.endTime,
        slotDuration: doctor.schedule.slotDuration,
      },
    });
  }, [doctor, reset]);

  const onSubmit = async (data: UpdateDoctorPayload) => {
    await handleUpdate(data);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass}>Full name</label>
        <input {...register("name")} placeholder="Dr. Full Name" className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Fees</label>
          <input type="number" {...register("fees", { valueAsNumber: true })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Department</label>
          <select {...register("departmentId")} className={inputClass}>
            <option value="">{deptLoading ? "Loading..." : "Select department"}</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>{dept.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Start time</label>
          <input type="time" {...register("schedule.startTime")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>End time</label>
          <input type="time" {...register("schedule.endTime")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slot (mins)</label>
          <input type="number" {...register("schedule.slotDuration", { valueAsNumber: true })} className={inputClass} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onSuccess} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:text-white">
          Cancel
        </button>
        <button type="submit" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500">
          Update doctor
        </button>
      </div>
    </form>
  );
};

export default EditDoctorForm;