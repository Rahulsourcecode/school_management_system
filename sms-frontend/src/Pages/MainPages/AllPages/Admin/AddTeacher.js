import React, { useState, useEffect } from "react";
import "./CSS/AddTeacher.scss";
import "./CSS/AddBed.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  SendPassword,
  TeacherRegister,
  axioss,
} from "../../../../Redux/auth/action";
import Sidebar from "../../Common/layouts/Sidebar";

import { ToastContainer, toast } from "react-toastify";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { Grid } from "@mui/material";

const notify = (text) => toast(text);

const AddDoctor = () => {

  const [classes, setClasses] = useState([])

  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const initData = {
    teacherName: "",
    assignClass: [],
    age: "",
    mobile: "",
    email: "",
    gender: "",
    DOB: "",
    address: "",
    education: "",
    subject: "",
    teacherID: Date.now(),
    password: "",
    details: "",
    image: "",
    classname: "",
    division: "",
  };
  const [TeacherValue, setTeacherValue] = useState(initData);
  const [classList, setclassList] = useState([])
  const [divisionList, setdivisionList] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  // console.log(subjectData)
  console.log(classes)
  const HandleDoctorChange = (e) => {
    setTeacherValue({ ...TeacherValue, [e.target.name]: e.target.value });
    console.log(TeacherValue);
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setTeacherValue({ ...TeacherValue, image: e.target.files[0] });
  };
  useEffect(() => {
    console.log("hello")
    axioss.get("/admin/getclasses").then((res) => {
      setclassList(res.data);
    })

    axioss.get("/admin/allstudents").then((res) => {
      setdivisionList(res.data)
    })

    axioss.get("/admin/getsubjects").then((res) => {
      setSubjectData(res.data)
      divisionCombos()
    })
  }, []);

  function divisionCombos() {
    let array = []
    classList.map((data) => {
      const division = []
      for (let i = 65; i <= data.division.charCodeAt(0); i++) {
        division.push(String.fromCharCode(i));
      }
      division.map((x, i) => division[i] = data.name + x)

      array = [...array, ...division]
      return true
    })
    setClasses(array)

  }

  const uniqueDivisions = new Set();
  divisionList.forEach((division) => {
    uniqueDivisions.add(division.division)
  })
  // console.log(uniqueDivisions)
  const HandleDoctorSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("form")
    const doc = new FormData(form);
    doc.append('file', TeacherValue.file);
    setLoading(true);
    dispatch(TeacherRegister(doc)).then((res) => {
      console.log(res);
      if (res.message === "Teacher already exists") {
        setLoading(false);
        return notify("Teacher Already Exist");
      }
      if (res.message === "Error") {
        setLoading(false);
        return notify("Something went wrong, Please try Again");
      }
      let data = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.user,
      };
      console.log(data);
      dispatch(SendPassword(data)).then(() => notify("Account Details Sent"));
      setLoading(false);
    });
  };
  const addClasses = (e) => {
    const state = TeacherValue.assignClass.filter(x => x === e.target.value)
    if (state.length === 0) {
      const classes = [...TeacherValue.assignClass, e.target.value]
      setTeacherValue({ ...TeacherValue, assignClass: classes })
    }
  }
  function handleDelete(x) {
    setTeacherValue({ ...TeacherValue, assignClass: TeacherValue.assignClass.filter(c => c !== x) })
  }
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
        <Grid item  xs={9}>
          <div className="Main_Add_Doctor_div">
            <h1>Add Teacher</h1>
            <form encType="multipart/form-data" id="form" onSubmit={HandleDoctorSubmit}>
              <div>
                <label>Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="teacherName"
                    value={TeacherValue.teacherName}
                    onChange={HandleDoctorChange}
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
                    value={TeacherValue.age}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Emergency Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Emergency Number"
                    name="mobile"
                    value={TeacherValue.mobile}
                    onChange={HandleDoctorChange}
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
                    value={TeacherValue.email}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={TeacherValue.gender}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </  div>
              <div>
                <label>Subject</label>
                <div className="inputdiv">
                  <select
                    name="subject"
                    value={TeacherValue.subject}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="">Select subject</option>
                    <option value="maths">Maths</option>
                    <option value="science">Science</option>
                    <option value="social science">Social Science</option>
                    <option value="biology">biology</option>
                    <option value="physics">physics</option>
                    <option value="english">chemistry</option>
                    <option value="general">General</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Birth date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="dd-mm-yy"
                    name="DOB"
                    value={TeacherValue.DOB}
                    onChange={HandleDoctorChange}
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
                    value={TeacherValue.address}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Education</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="eg.MBBS"
                    name="education"
                    value={TeacherValue.education}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Password</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={TeacherValue.password}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Other Details</label>
                <div className="inputdiv">
                  <textarea
                    type="text"
                    placeholder="Extra Info"
                    rows="4"
                    cols="50"
                    name="details"
                    value={TeacherValue.details}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Assign to</label>
                <div className="inputdiv">
                  <select
                    name="assignClass"
                    value={TeacherValue.assignClass}
                    onChange={addClasses}
                    multiple

                  >

                    {classes.map((data) => {

                      return (<option value={data} key={data}>{data}</option>)
                    })}
                  </select>
                </div>
              </div>
              <div style={{ maxWidth: 200, display: 'flex', flexDirection: 'end' }}>
                {TeacherValue.assignClass && TeacherValue.assignClass.map(x => (
                  <>

                    <Stack sx={{ flex: 'wrap' }} direction="row" spacing={3}>
                      <Chip label={x} onDelete={() => handleDelete(x)}>
                      </Chip>
                    </Stack>

                  </>
                ))}
              </div>
              <div>
                <label>class charge</label>
                <div className="inputdiv">
                  <select
                    name="classname"
                    value={TeacherValue.classname}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="">choose class</option>
                    {classList.map((data) => {
                      return (<option value={data._id} key={data._id}>{data.name}</option>)
                    })}
                  </select>
                </div>
              </div>
              <div>
                <label>Division</label>
                <div className="inputdiv">
                  <select
                    name="division"
                    value={TeacherValue.division}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="">Choose division</option>
                    {[...uniqueDivisions].map((division) => (
                      <option value={division} key={division}>
                        {division}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <label>upload picture</label>
              <div >
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  required
                />
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

export default AddDoctor;
