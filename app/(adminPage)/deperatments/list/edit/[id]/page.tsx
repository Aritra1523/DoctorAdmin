

import DepartmentEdit from "@/component/admin/department/DepartmentEdit";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <DepartmentEdit id={id} />;
}