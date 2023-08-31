import Sidebar from "../../Common/layouts/Sidebar";
import { ToastContainer } from "react-toastify";
import { axioss } from "../../../../Redux/auth/action";
import { DataGrid } from '@mui/x-data-grid';



import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";

const columns = [
  { field: 'firstName', headerName: 'name', width: 200 },
  { field: 'studentid', headerName: 'id', width: 200 },
  { field: 'className', headerName: 'Class', width: 100 },
  { field: 'divisionName', headerName: 'Division', width: 100 },
  { field: 'email', headerName: 'email ID', width: 300 },
  { field: 'gender', headerName: 'Gender', width: 100 },
  { field: 'phone', headerName: 'phone', width: 100 }
];

export default function StudentLists() {

  const [Students, setStudents] = useState([]);

  useEffect(() => {
    // fetch teachers data from API or database
    axioss.get("/admin/allstudents")
      .then((res) => setStudents(res.data))
  }, []);
  console.log(Students);

  const rows = Students.map((student, index) => ({
    id: index + 1,
    firstName: student.studentName,
    studentid:student.studentID,
    className: student.classname.name,
    divisionName: student.division,
    email: student.email,
    gender:student.gender,
    phone:student.mobile
  }));
  return (
    <div>
      <ToastContainer />
      <Grid container spacing={10} >
        <Grid item xs={2} sm={2} md={2} lg={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={10} sx={{ mt: 5}} >
          <h2>Student List</h2>

          <div style={{ height: 550, width: '100%' }}>
            <DataGrid
              style={{ backgroundColor: "white", borderRadius: 20 }}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
