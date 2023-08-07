import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { axioss, feedback } from "../../../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { TextField } from "@mui/material";
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
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
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
        </div>
      </div>
    </>
  );
};

export default AddFeedback;
