import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Common/layouts/Sidebar";
import { axioss, feedback } from "../../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
const notify = (text) => toast(text);
const AddFeedback = () => {
  const { data } = useSelector((store) => store.auth);
  const [teacherList, setTeacherList] = useState([])

  const InitData = {
    teacher: "",
    feedback: "",
    studentId: data?.user?._id
  };

  useEffect(() => {
    axioss.get("/students/listteachers")
      .then((res) => setTeacherList(res.data))
  }, [])
  const [feedbackData, setFeedbackData] = useState(InitData);

  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const HandleFeedbackChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(feedbackData)

  const HandleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log(feedbackData);
    setloading(true);
    dispatch(feedback(feedbackData));
    setloading(false);
    setFeedbackData(InitData);
    notify("added")
  };

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "student") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <Grid container spacing={10}>
        <Grid item  xs={2} sm={2} md={2} lg={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={10} sx={{ mt: 2 }}>
          <div className="mainAmbupance">
            <h1>feedbacks</h1>

            <form onSubmit={HandleFeedbackSubmit}>
              <div>
                <label>choose teacher</label>
                <div className="inputdiv">
                  <select
                    type="text"
                    name="teacher"
                    value={feedbackData.teacher}
                    onChange={HandleFeedbackChange}
                    required
                  >
                    <option value="">choose an option</option>
                    {teacherList.map((data) => {
                      return <option key={data._id} value={data._id}>{data.teacherName}</option>
                    })}
                  </select>
                </div>
              </div>
              <div>
                <label>Enter your feedback</label>
                <div className="inputdiv">
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    type="text"
                    name="feedback"
                    value={feedbackData.feedback}
                    onChange={HandleFeedbackChange}
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

export default AddFeedback;
