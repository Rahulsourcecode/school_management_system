import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreateReport } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { axioss } from "../../../../../Redux/auth/action";
import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from "@mui/material";
const notify = (text) => toast(text);

const UploadMarks = () => {
  const { data } = useSelector((store) => store.auth);
  const subject = data.user.subject
  const [currClass, setCurrClass] = useState(data.user.assignClass[0])
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState([])
  const dispatch = useDispatch();
  const [students, setStudents] = useState([])
  const [marks, setmarks] = useState([]);
  const [term , setTerm] = useState('term1')
  useEffect(() => {
    // fetch teachers data from API or database
    axioss.post("/teachers/classStudnets", data.user)
      .then((res) => setStudents(res.data));

  }, []);

  const HandlemarkChange = (e,index) => {
    console.log(term);
    const mark = e.target.value
    student[index].marks[term] = {...student.marks,[subject]:mark}

    console.log(student)
    setStudent(student)
    axioss.post('/teachers/setMarks',{id:student[index]._id,mark,subject,term}).then(res=>notify(res.data))

  };

  const handleClassChange = (e, value) => {
    console.log(value);
    setCurrClass(value)
    axioss.post('/teachers/findStudents', { value }).then(x => setStudent(x.data)).catch(err => console.log(err.message))
    console.log(student);
  }
  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "teacher") {
    return <Navigate to={"/dashboard"} />; 
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Upload Mark</h1>
            <form>
              <div>
                <label>Choose Term</label>
                <div className="inputdiv">
                  <select value={term} onChange={e=>setTerm(e.target.value)}>
                    <option value='term1'>First Term</option>
                    <option value='term2'>Mid Term</option>
                    <option value='term3'>Finals</option>
                  </select>
                </div>
              </div>
              {/* <div>
                <label>class</label>
                <div className="inputdiv">
                  <select>
                    <option>choose One</option>
                    {data.user.assignClass.map((list) => <option key={list} value={list}>{list}</option>)}
                  </select>
                </div>
              </div> */}

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {(<Tabs value={currClass} onChange={handleClassChange} aria-label="basic tabs example">
                  {data.user.assignClass.map((list) => <Tab key={list} label={`Class ${list}`} value={list} />)}
                </Tabs>)}
              </Box>

              {student.length && (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Student ID</b></TableCell>
                        <TableCell><b>Student Name</b></TableCell>
                        <TableCell align="right"><b>{data.user.subject} </b>Marks</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {student.map((row,index) => (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.studentID}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.studentName}
                          </TableCell>
                          <TableCell align="right"><input value={row?.marks?.[term]?.[subject]} onChange={(e)=>HandlemarkChange(e,index)}></input></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMarks;

