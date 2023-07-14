import Sidebar from "../../GlobalFiles/Sidebar";
import { axioss } from "../../../../../Redux/auth/action";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from "react-toastify";
import { useParams } from 'react-router-dom';
const notify = (text) => toast(text);

export default function MarkAttendance() {
  const { data } = useSelector((store) => store.auth);
  const [Students, setStudents] = useState([]);
  const [AttendanceData, setAttendanceData] = useState([]);
  const formattedDate = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${(new Date().getDate()).toString().padStart(2, '0')}`;
  const currentdate = new Date().toLocaleDateString('en-CA').split('/').reverse().join('/')

  const [change, setChange] = useState(false)
  const handleAttendanceChange = (id, attendance) => {
    setChange((s) => !s)
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.studentID === id) {
          student = { ...student, attendance: attendance };
          axioss.post('/teachers/markattendance', { ...student, formattedDate })
            .then((res) => {
              notify(res.data.message);
              console.log(res.data);
            });
        }
        return student;
      })
    );
  };
  useEffect(() => {
    // fetch teachers data from API or database
    axioss.post("/teachers/classStudnets", data.user)
      .then((res) => setStudents(res.data));

    axioss.post("/teachers/attendancedata", data.user)
      .then((res) => {
        const data = res.data.filter(x => x.date.substring(0, 10) === formattedDate)
        setAttendanceData(data)
      });
  }, [change]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'firstName', headerName: 'First name', width: 300 },
    { field: 'email', headerName: 'Email ID', width: 300 },
    {
      field: 'attendance',
      headerName: 'Present/Absent',
      width: 300,
      renderCell: (params) => (
        <Button
          variant={params.value ? "contained" : "outlined"}
          onClick={() => handleAttendanceChange(params.row.id, !params.value)}
        >
          {console.log(params.value)}
          {params.value ? "Present" : "Absent"}
        </Button>
      )
    },
  ];
  const getAttendance = (id) => {
    const attendance = AttendanceData.filter(x => x.student == id)
    return attendance[0]?.state === 'true' ? true : false
  }
  const rows = Students.map((student, index) => ({
    id: student.studentID,
    firstName: student.studentName,
    className: student.classname,
    email: student.email,
    attendance: getAttendance(student.studentID)
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
