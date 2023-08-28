import React, { useState, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreateReport } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { axioss } from "../../../../../Redux/auth/action";
import { Box, Grid, Paper, Skeleton, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from "@mui/material";
const notify = (text) => toast(text);

const UploadMarks = () => {
  const { data } = useSelector((store) => store.auth);
  const subject = data.user.subject
  const [currClass, setCurrClass] = useState(data.user.assignClass[0])
  const [student, setStudent] = useState([])
  const [term, setTerm] = useState('term1')
  lazy(() => axioss.post('/teachers/findStudents', { currClass }).then(x => setStudent(x.data)).catch(err => console.log(err.message)))
  useEffect(() => {
    handleClassChange('', currClass)
  }, []);

  const HandlemarkChange = (e, index) => {

    const mark = e.target.value
    const curr = student[index]
    curr.marks = {
      ...curr.marks,
      [term]: { ...curr.marks?.[term], [subject]: mark }
    };
    student[index] = curr
    console.log([...student])
    setStudent([...student])

    axioss.post('/teachers/setMarks', { id: student[index]._id, mark, subject, term }).then(res => notify(res.data))

  };

  const handleClassChange = (e, value) => {
    console.log(value);
    setCurrClass(value)
    axioss.post('/teachers/findStudents', { value }).then(x => setStudent(x.data)).catch(err => console.log(err.message))

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
      <Grid container spacing={10}>
        <Grid item xs={2} sm={2} md={2} lg={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={10} sx={{ mt: 2 }} >
          <div className="Main_Add_Doctor_div">
            <h1>Upload Mark</h1>
            <form>
              <div>
                <label>Choose Term</label>
                <div className="inputdiv">
                  <select value={term} onChange={e => setTerm(e.target.value)}>
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
              {/* {student} */}
              {student.length ? (
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
                      {student.map((row, index) => (
                        <TableRow
                          key={row._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.studentID}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.studentName}
                          </TableCell>
                          <TableCell align="right"><input
                            value={row?.marks?.[term]?.[subject] || ''} // Initialize with an empty string if the value is undefined
                            onChange={(e) => HandlemarkChange(e, index)}
                          /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                // Display skeletons while data is loading
                [1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={'80%'}
                    height={20}
                    sx={{ marginBottom: 5, marginLeft: 10 }}
                  />
                ))
              )}
            </form>
          </div>
          </Grid>
          </Grid>
    </>
  );
};

export default UploadMarks;

