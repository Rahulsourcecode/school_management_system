import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer } from "react-toastify";
import { axioss } from "../../../../../Redux/auth/action";
import { DataGrid } from '@mui/x-data-grid';



import {useEffect,useState} from 'react';

const columns = [
  {field: 'firstName', headerName: 'First name', width:100},
  {field: 'className', headerName: 'Class',width:100},
  {field: 'divisionName', headerName:'Division' ,width:100},
  {field: 'email', headerName:'email ID' ,width:100}
];



export default function StudentLists() {

    const [Students, setStudents] = useState([]);

  useEffect(() => {
    // fetch teachers data from API or database
   axioss.get("/admin/allstudents")
   .then((res)=>setStudents(res.data))
  },[]);
  console.log(Students);

  const rows = Students.map((student, index) => ({
    id: index + 1,
    firstName: student.studentName,
    className:student.classname,
    divisionName: student.division,
    email:student.email
  }));
  return (
    <div>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <h2>Student List</h2>

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
