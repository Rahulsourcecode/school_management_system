import React from 'react'
import MarkAttendanceOption from './pages/MarkAttendanceOption'
import ViewAttendanceOption from './pages/ViewAttendanceOption'
import Sidebar from '../../GlobalFiles/Sidebar'
const ChooseAttendance = () => {
  return (
    <div className='container'>
      <Sidebar/>
        <div className="AfterSideBar">
          <h2 style={{marginBottom:20}}>Choose your option</h2>
            <div className='container-inner'>
          <MarkAttendanceOption/>
          <ViewAttendanceOption/>
        </div>
      </div>
    </div>
  )
}

export default ChooseAttendance;
