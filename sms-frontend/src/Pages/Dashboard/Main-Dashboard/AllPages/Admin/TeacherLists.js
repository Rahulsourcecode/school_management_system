import React, { useState, useEffect } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer } from "react-toastify";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../Redux/auth/action";
import "./SCSS/TeachersList.scss"; // Import the SCSS file

function TeachersList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // fetch teachers data from API or database
    fetch(`${baseURL}/admin/teachers/all`)
      .then((response) => response.json())
      .then((data) => setTeachers(data));
  }, []);

  console.log(teachers);

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <h2>Teachers List</h2>
          <div className="table-container">
            <Table striped bordered hover className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>mobile</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>{teacher._id}</td>
                    <td>{teacher.teacherName}</td>
                    <td>{teacher.mobile}</td>
                    <td>{teacher.email}</td>
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

export default TeachersList;
