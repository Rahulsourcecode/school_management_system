import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer } from "react-toastify";
import { axioss } from "../../../../../Redux/auth/action";
import { DataGrid } from '@mui/x-data-grid';



import {useEffect,useState} from 'react';

const columns = [
  {field:'id',headerName:'Teacher ID',width :180},
  {field: 'TeacherName', headerName: 'First name', width:180},
  {field: 'className', headerName: 'Class',width:180},
  {field: 'divisionName', headerName:'Division Handled' ,width:180},
  {field: 'email', headerName:'email ID' ,width:500}
];



export default function TeacherLists() {

    const [Teachers,setTeachers] = useState([]);

  useEffect(() => {
    // fetch teachers data from API or database
   axioss.get("/admin/teachers/all")
   .then((res)=>setTeachers(res.data))
  },[]);
  console.log(Teachers);

  const rows = Teachers.map((Teacher, index) => ({
    id: Teacher.teacherID,
    TeacherName: Teacher.teacherName,
    className:Teacher.classname,
    divisionName: Teacher.division,
    email:Teacher.email
  }));
  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <h2>Teacher List</h2>

          <div style={{ height: 550, width: '100%' }}>
            <DataGrid
            style={{backgroundColor:"white",borderRadius:20}}
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
        </div>
      </div>
    </div>
  );
}
