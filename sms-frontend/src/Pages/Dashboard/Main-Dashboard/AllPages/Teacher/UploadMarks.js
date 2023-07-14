import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CreateReport } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { axioss } from "../../../../../Redux/auth/action";
const notify = (text) => toast(text);

const UploadMarks = () => {
  const { data } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const initmark = {
    subject: "",
    score: "",
    total: "",
  };
  const [students, setStudents] = useState([])


  const [mark, setmark] = useState(initmark);

  const [marks, setmarks] = useState([]);

  useEffect(() => {
    // fetch teachers data from API or database
    axioss.post("/teachers/classStudnets", data.user)
      .then((res) => setStudents(res.data));

  }, []);

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
                  <select>
                    <option>First Term</option>
                    <option>Mid Term</option>
                    <option>Finals</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Student</label>
                <div className="inputdiv">
                  <select>
                    <option>choose One</option>
                    {students.map((list) => <option key={list._id } value={list._id}>{list.studentName}</option>)}
                  </select>
                </div>
              </div>


              {/* ******************************************** */}
              <div>
                <label>Enter Mark</label>
                <div className="inputdiv">
                  <div>
                    <span>subject:</span>
                    <input
                      type="number"
                      placeholder="mark obtained"
                      name="score"
                      value={mark.score}
                      onChange={HandlemarkChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label>Extra Info</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="details"
                    name="details"
                    value={ReportValue.details}
                    onChange={HandleReportChange}
                  />
                </div>
              </div>
              {/* *********************************** */}

              <button
                className="formsubmitbutton bookingbutton"
                onClick={HandleReportSubmit}
              >
                {loading ? "Loading..." : "Generate Report"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMarks;