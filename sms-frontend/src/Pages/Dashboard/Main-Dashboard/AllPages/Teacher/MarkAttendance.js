import Sidebar from "../../GlobalFiles/Sidebar";
import { axioss } from "../../../../../Redux/auth/action";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { toast, ToastContainer } from "react-toastify";
const notify = (text) => toast(text);

export default function MarkAttendance() {
  const { data } = useSelector((store) => store.auth);
  const [Students, setStudents] = useState([]);
  const [AttendanceData,setAttendanceData] =useState([]);
  const currentdate = new Date().toLocaleDateString();

  const handleAttendanceChange = (id, checked) => {
    const currDate = new Date();
    const formattedDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`;  
    setStudents((prevStudents) =>
      prevStudents.map((student) =>{
        if(student.studentID === id){
          student = { ...student, attendance: checked? true:false } 
          axioss.post('/teachers/markattendance',{...student,formattedDate})
          .then((res)=>{
            notify(res.data.message)
            console.log(res.data)
          })
        } 
        return student
      }
      )
    );
     
  
  };

  
  useEffect(() => {
    // fetch teachers data from API or database
    axioss.post("/teachers/classStudnets", data.user)
    .then((res) => setStudents(res.data))

    axioss.post("/teachers/attendancedata",data.user)
    .then((res)=>setAttendanceData(res.data))
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'firstName', headerName: 'First name', width: 300 },
    { field: 'email', headerName: 'Email ID', width: 300 },
    {
      field: 'attendance',
      headerName: 'Present/Absent',
      width: 300,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={(event) =>
            handleAttendanceChange(params.row.id, event.target.checked)
          }
        />
      )
    },
  ];

  const rows = Students.map((student, index) => ({
    id: student.studentID,
    firstName: student.studentName,
    className: student.classname,
    divisionName: student.division,
    email: student.email,
    attendance: student.attendance || false
  }));
console.log(rows)
  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <h2>Mark Attendance Date: {currentdate}</h2>
          <h3>Student List</h3>
          <div style={{ height: 550, width: '100%' }}>
            <DataGrid
              style={{ backgroundColor: "white", borderRadius: 20 }}
              rows={rows}
              columns={columns}
              pageSize={10}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
