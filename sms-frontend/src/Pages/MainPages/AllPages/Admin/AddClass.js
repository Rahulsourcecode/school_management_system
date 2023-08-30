import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { NewClass, axioss } from "../../../../Redux/auth/action";
import Sidebar from "../../../MainPages/Common/layouts/Sidebar";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../Redux/auth/action";
import './SCSS/AddClass.scss'
import { Grid } from "@mui/material";
const notify = (text) => toast(text)
const AddClass = () => {
  const initialState = {
    name: "",

  }
  const [className, setClassName] = useState(initialState);
  const [allclasses, setAllClasses] = useState([])
  const dispatch = useDispatch()
  const handleInputChange = (e) => {
    setClassName({
      ...initialState,
      [e.target.name]: e.target.value
    });
  };
  console.log(allclasses)

  const handleAddClass = (e) => {
    e.preventDefault();
    dispatch(NewClass(className)).then((error) => notify(error ? "added success" : "something went wrong"))
  };

  useEffect(() => {
    axioss.get(`${baseURL}admin/getclasses`)
      .then((res) => setAllClasses(res.data))
  }, [])

  return (
    <>
      <ToastContainer />
      <Grid container spacing={10}>
        <Grid item xs={2} sm={2} md={2} lg={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={10} sx={{ mt: 2 }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h3>Add Class</h3>
              <div className="inputContainer">
                <input
                  type="number"
                  name="name"
                  value={className.name}
                  onChange={handleInputChange}
                  placeholder="Enter class name"
                  className="inputField"
                />
                <button onClick={handleAddClass} className="addButton">
                  Add
                </button>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h3>List of classes</h3>
              <Table style={{ backgroundColor: "white" }} striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>sl no</th>
                    <th>Class</th>
                    <th>total Students</th>
                  </tr>
                </thead>
                <tbody>
                  {allclasses.length === 0 ? <h1>no data</h1> : allclasses.map((classes, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{classes.name}</td>
                      <td>{classes.strength}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddClass;
