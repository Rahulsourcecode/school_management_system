import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreateReport } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  sidebar: {
    // Sidebar styles
  },
  content: {
    // Main content styles
  },
  form: {
    // Form styles
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const notify = (text) => toast(text);

const UploadMarks = () => {
  const { data } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const initmark = {
    subject: "",
    score: "",
    total: "",
  };
  const [mark, setmark] = useState(initmark);

  const [marks, setmarks] = useState([]);

  const HandlemarkChange = (e) => {
    setmark({ ...mark, [e.target.name]: e.target.value });
  };

  const InitData = {
    name: "",
    class: "",
    age: "",
    mobile: "",
    email: "",
    gender: "",
    details: "",
    date: "",
    marks: [],
  };

  const [ReportValue, setReportValue] = useState(InitData);

  const HandleReportChange = (e) => {
    setReportValue({ ...ReportValue, [e.target.name]: e.target.value });
  };

  const HandlemarkAdd = (e) => {
    e.preventDefault();
    setmarks([...marks, mark]);
    setmark(initmark);
  };

  const HandleReportSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...ReportValue,
      marks,
    };
    console.log(data);
    try {
      setLoading(true);
      dispatch(CreateReport(data)).then((res) => {
        console.log(res);
        if (res.message === "Report successfully created") {
          notify("Report Created Sucessfully");
          setLoading(false);
          setReportValue(InitData);
        } else {
          setLoading(false);
          notify("Something went Wrong");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "teacher") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className={classes.container}>
      <ToastContainer />
      <Sidebar className={classes.sidebar} />
      <div className={classes.content}>
        <div className={classes.form}>
          <Typography variant="h4">Create Report</Typography>
          <form>
            {/* Form fields */}
            <TextField
              type="text"
              label="Student Name"
              placeholder="Full Name"
              name="name"
              value={ReportValue.name}
              onChange={HandleReportChange}
              required
            />
            <TextField
              type="number"
              label="Mobile"
              placeholder="No"
              name="mobile"
              value={ReportValue.mobile}
              onChange={HandleReportChange}
            />
            <TextField
              type="number"
              label="Age"
              placeholder="Age"
              name="age"
              value={ReportValue.age}
              onChange={HandleReportChange}
              required
            />
            <TextField
              type="email"
              label="Email"
              placeholder="abc@abc"
              name="email"
              value={ReportValue.email}
              onChange={HandleReportChange}
              required
            />
            <FormControl>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={ReportValue.gender}
                onChange={HandleReportChange}
              >
                <MenuItem value="">Choose Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Class</InputLabel>
              <Select
                name="class"
                value={ReportValue.class}
                onChange={HandleReportChange}
                required
              >
                <MenuItem value="">Select Class</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="11">11</MenuItem>
                <MenuItem value="12">12</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="text"
              label="Extra Info"
              placeholder="Details"
              name="details"
              value={ReportValue.details}
              onChange={HandleReportChange}
            />
            <TextField
              type="text"
              label="Subject"
              placeholder="Subject"
              name="subject"
              value={mark.subject}
              onChange={HandlemarkChange}
            />
            <TextField
              type="number"
              label="Mark Obtained"
              placeholder="Mark Obtained"
              name="score"
              value={mark.score}
              onChange={HandlemarkChange}
            />
            <TextField
              type="number"
              label="Total Mark"
              placeholder="Total Mark"
              name="total"
              value={mark.total}
              onChange={HandlemarkChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={HandlemarkAdd}
            >
              Add Mark
            </Button>
            <TextField
              type="date"
              label="Date"
              placeholder="dd-mm-yyyy"
              name="date"
              value={ReportValue.date}
              onChange={HandleReportChange}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={HandleReportSubmit}
            >
              {loading ? "Loading..." : "Generate Report"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMarks;
