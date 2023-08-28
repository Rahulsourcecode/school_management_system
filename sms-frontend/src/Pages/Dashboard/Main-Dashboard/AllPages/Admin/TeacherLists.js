import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer } from "react-toastify";
import { axioss } from "../../../../../Redux/auth/action";
import { DataGrid } from '@mui/x-data-grid';



import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";

const columns = [
  { field: 'id', headerName: 'Teacher ID', width: 180 },
  { field: 'TeacherName', headerName: 'First name', width: 180 },
  { field: 'className', headerName: 'Class', width: 180 },
  { field: 'divisionName', headerName: 'Division Handled', width: 180 },
  { field: 'email', headerName: 'email ID', width: 500 }
];



export default function TeacherLists() {

  const [Teachers, setTeachers] = useState([]);

  useEffect(() => {
    // fetch teachers data from API or database
    axioss.get("/admin/teachers/all")
      .then((res) => setTeachers(res.data)).then((res) => console.log(res)).catch(error => console.log(error))
  }, []);
  console.log(Teachers);

  const rows = Teachers.map((Teacher, index) => ({
    id: Teacher.teacherID,
    TeacherName: Teacher.teacherName,
    className: Teacher.classname,
    divisionName: Teacher.division,
    email: Teacher.email
  }));
  return (
    <div>
      <ToastContainer />
      <Grid container >
        <Grid item xs={2} sm={2} md={2} lg={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={11} sx={{mt:5,pr:5}} >


          <h2>Teacher List</h2>

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
              checkboxSelection
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
