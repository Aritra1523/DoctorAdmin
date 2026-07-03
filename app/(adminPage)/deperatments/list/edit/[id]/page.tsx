// import DepartmentEdit from "@/components/admin/department/DepartmentEdit";

// interface Props {
//   params: {
//     id: string;
//   };
// }

// export default function Page({ params }: Props) {
//   return <DepartmentEdit id={params.id} />;
// }

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