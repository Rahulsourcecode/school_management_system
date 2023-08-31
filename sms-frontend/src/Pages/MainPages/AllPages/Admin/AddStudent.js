import React, { useEffect, useState } from "react";
import "./CSS/AddTeacher.scss";
import { axioss } from "../../../../Redux/auth/action";
import { useDispatch, useSelector } from "react-redux";
import {
  SendPassword,
  StudentRegister,
} from "../../../../Redux/auth/action";
import Sidebar from "../../Common/layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { Grid } from "@mui/material";
const notify = (text) => toast(text);

const AddStudent = () => {
  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [classList, setclassList] = useState([])
  const [loading, setLoading] = useState(false);

  const InitData = {
    studentName: "",
    age: "",
    mobile: "",
    email: "",
    gender: "",
    DOB: "",
    address: "",
    classname: "",
    studentID: Date.now(),
    password: "",
    details: "",
    file: ""
  };
  const [StudentValue, setStudentValue] = useState(InitData);

  const HandlestudentChange = (e) => {
    setStudentValue({ ...StudentValue, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files)
    setStudentValue({ ...StudentValue, image: e.target.files[0] })
  }
  useEffect(() => {
    console.log("hello")
    axioss.get("/admin/getclasses").then((res) => {
      setclassList(res.data);
    })
  }, []);
  const HandlestudentSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('form')
    const doc = new FormData(form);
    doc.append('file', StudentValue.file);
    setLoading(true);
    console.log(StudentValue);
    dispatch(StudentRegister(doc)).then((res) => {
      console.log(res);
      if (res.message === "Student already exists") {
        setLoading(false);
        return notify("Student Already Exist");
      }
      if (res.message === "error") {
        setLoading(false);
        return notify("error");
      }
      notify("Student Added");
      let data = {
        email: res.data.email,
        password: StudentValue.password,
        userId: res.data.studentID,
      };
      dispatch(SendPassword(data)).then((res) =>
        notify("Account Details Sent")
      );
      setLoading(false);
      setStudentValue(InitData);
    });
  };

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <Grid container spacing={10}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <div className="Main_Add_Doctor_div">
            <h1>Add student</h1>
            <form id="form" onSubmit={HandlestudentSubmit}>
              <div>
                <label> Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="studentName"
                    value={StudentValue.studentName}
                    onChange={HandlestudentChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Age</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={StudentValue.age}
                    onChange={HandlestudentChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Contact Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Emergency Number"
                    name="mobile"
                    value={StudentValue.mobile}
                    onChange={HandlestudentChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="email"
                    placeholder="abc@abc.com"
                    name="email"
                    value={StudentValue.email}
                    onChange={HandlestudentChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={StudentValue.gender}
                    onChange={HandlestudentChange}
                    required
                  >
                    <option value="Choose Gender">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Birthdate</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="dd-mm-yy"
                    name="DOB"
                    value={StudentValue.DOB}
                    onChange={HandlestudentChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Address</label>
                <div className="inputdiv adressdiv">
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={StudentValue.address}
                    onChange={HandlestudentChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Class</label>
                <div className="inputdiv">
                  <select
                    name="classname"
                    value={StudentValue.classname}
                    onChange={HandlestudentChange}
                    required
                  >
                    <option value="">select</option>
                    {classList.map((data) => {
                      return (<option value={data._id} key={data._id}>{data.name}</option>)
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label>Password</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={StudentValue.password}
                    onChange={HandlestudentChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Other Info</label>
                <div className="inputdiv">
                  <textarea
                    type="text"
                    placeholder="Extra Info"
                    rows="4"
                    cols="50"
                    name="details"
                    value={StudentValue.details}
                    onChange={HandlestudentChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>upload image</label>
                <div className="inputdiv">
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </Grid>
      </Grid>

    </>
  );
};

export default AddStudent;
