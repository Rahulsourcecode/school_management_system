import React, { useState } from "react";
import { Radio } from "antd";
import admin from "../../../img/admin.jpg";
import "./DLogin.scss";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AdminLogin,
  forgetPassword,
  StudentLogin,
  TeacherLogin,
} from "../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Drawer } from "antd";
const notify = (text) => toast(text);

const DLogin = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // ************************************************
  const [Loading, setLoading] = useState(false);
  const [placement, SetPlacement] = useState("Student");
  const [formvalue, setFormvalue] = useState({
    ID: "",
    password: "",
  });
  const dispatch = useDispatch();

  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };
  const { data } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (formvalue.ID !== "" && formvalue.password !== "") {
      if (placement === "Student") {
        let data = {
          ...formvalue,
          studentID: formvalue.ID,
        };
        dispatch(StudentLogin(data)).then((res) => {
          if (res.message === "Successful") {
            notify("Login Successful");
            setLoading(false);
            return navigate("/dashboard");
          }
          if (res.message === "Wrong credentials") {
            setLoading(false);

            notify("Wrong credentials");
          }
          if (res.message === "Error") {
            setLoading(false);

            notify("Something went Wrong, Please Try Again");
          }
        });
      } else if (placement === "Teacher") {
        let data = {
          ...formvalue,
          teacherID: formvalue.ID,
        };
        console.log(data, placement);
        dispatch(TeacherLogin(data)).then((res) => {
          if (res.message === "Successful") {
            notify("Login Successful");
            setLoading(false);
            return navigate("/dashboard");
          }
          if (res.message === "Wrong credentials") {
            setLoading(false);
            notify("Wrong credentials");
          }
          if (res.message === "Error") {
            setLoading(false);
            notify("Something went Wrong, Please Try Again");
          }
        });
      } else if (placement === "Admin") {
        let data = {
          ...formvalue,
          adminID: formvalue.ID,
        };
        dispatch(AdminLogin(data)).then((res) => {
          if (res.message === "Successful") {
            notify("Login Successful");
            setLoading(false);

            return navigate("/dashboard");
          }
          if (res.message === "Wrong credentials") {
            setLoading(false);

            notify("Wrong credentials");
          }
          if (res.message === "Error") {
            setLoading(false);

            notify("Something went Wrong, Please Try Again");
          }
        });
      }
    }
  };

  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };


  if (data?.isAuthenticated === true) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="mainLoginPage">
        <div className="leftside">
        <h1 className="animate-text">Manage Your School</h1>
        </div>
        <div className="rightside">
          <h1>Login</h1>
          <div>
            <Radio.Group
              value={placement}
              onChange={placementChange}
              className={"radiogroup"}
            >
              <Radio.Button value="Student" className={"radiobutton"}>
                Student
              </Radio.Button>
              <Radio.Button value="Teacher" className={"radiobutton"}>
                Teacher
              </Radio.Button>
              <Radio.Button value="Admin" className={"radiobutton"}>
                Admin
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="Profileimg">
            <img src={admin} alt="profile" />
          </div>
          <div>
            <form onSubmit={HandleSubmit}>
              <h3>{placement} ID</h3>
              <input
                type="number"
                name="ID"
                value={formvalue.ID}
                onChange={Handlechange}
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={formvalue.password}
                onChange={Handlechange}
                required
              />
              <button type="submit">{Loading ? "Loading..." : "Submit"}</button>
              <p style={{ marginTop: "10px" }}>
                Forget Password?
                <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("fogotpassword")}
        >
          click here
        </span>
              </p>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DLogin;
