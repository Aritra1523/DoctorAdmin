import DepartmentList from '@/component/admin/department/DepartmentList'
import React from 'react'

const page = () => {
  return (
    <> <div style={styles.scrollCol}>
              <DepartmentList onEdit={setSelectedDepartment} />
            </div></>
  )
}

export default page