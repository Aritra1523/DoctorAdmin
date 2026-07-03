// import DepartmentForm from '@/component/admin/department/DepartmentForm'
// import React from 'react'

// const page = () => {
//   return (
//     <><div style={styles.stickyCol}>
//               <DepartmentForm
//                 selectedDepartment={selectedDepartment}
//                 clearSelectedDepartment={() => setSelectedDepartment(null)}
//               />
//             </div></>
//   )
// }

// export default page

"use client";

import DepartmentForm from "@/component/admin/department/DepartmentForm";

const Page = () => (
  <DepartmentForm
    selectedDepartment={null}
    clearSelectedDepartment={() => {}}
  />
);

export default Page;
