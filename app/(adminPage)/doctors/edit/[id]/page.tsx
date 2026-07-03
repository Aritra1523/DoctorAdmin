import EditDoctorForm from "@/component/admin/Doctor/EditDoctorForm";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <EditDoctorForm id={params.id} />;
};

export default Page;