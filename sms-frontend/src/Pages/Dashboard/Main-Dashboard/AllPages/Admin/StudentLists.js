import React, { useState, useEffect } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer } from "react-toastify";
import { Table } from "react-bootstrap";
import { axioss, baseURL } from "../../../../../Redux/auth/action";
import "./SCSS/TeachersList.scss"; // Import the SCSS file

function StudentLists() {
  const [Students, setStudents] = useState([]);

  useEffect(() => {
    // fetch teachers data from API or database
   axioss.get("/admin/allstudents")
   .then((res)=>setStudents(res.data))
  },[]);


  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <h2>Student List</h2>
          <div className="table-container">
            <Table striped bordered hover className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Division</th>
                  <th>Email</th>
                  <th>mobile</th>
                </tr>
              </thead>
              <tbody>
                {Students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.studentName}</td>
                    <td>{student.classname.name}</td>
                    <td>{student.division}</td>
                    <td>{student.email}</td>
                    <td>{student.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentLists;
