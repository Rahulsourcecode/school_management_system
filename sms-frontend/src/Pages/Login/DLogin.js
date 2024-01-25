import React, { useState } from "react";
import { Button, Radio, Typography } from "antd";
import admin from "../../img/admin.jpg";
import "./DLogin.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  AdminLogin,
  StudentLogin,
  TeacherLogin,
  axioss,
} from "../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (text) => toast(text);

const DLogin = () => {

  // ************************************************
  const [Loading, setLoading] = useState(false);
  const [formvalue, setFormvalue] = useState({
    ID: "",
    password: "",
  });
  const [Logdata, SetLogdata] = useState("")
  const dispatch = useDispatch();
  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };
  const { data } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axioss
      .post('/general/login', formvalue)
      .then((response) => {
        SetLogdata(response.data.message);

        if (formvalue.ID !== "" && formvalue.password !== "") {
          if (response.data.message === "Student") {
            let data = {
              ...formvalue,
              studentID: formvalue.ID,
            };
            dispatch(StudentLogin(data)).then((res) => {
              if (res.message === "Successful") {
                notify("Login Successful");
                setLoading(false);
                return navigate("/dashboard");
              } else if (res.message === "Wrong credentials") {
                setLoading(false);
                notify("Wrong credentials");
              } else {
                setLoading(false);
                notify("Something went wrong. Please try again.");
              }
            });
          } else if (response.data.message === "Teacher") {
            let data = {
              ...formvalue,
              teacherID: formvalue.ID,
            };
            dispatch(TeacherLogin(data)).then((res) => {
              if (res.message === "Successful") {
                notify("Login Successful");
                setLoading(false);
                return navigate("/dashboard");
              } else if (res.message === "Wrong credentials") {
                setLoading(false);
                notify("Wrong credentials");
              } else {
                setLoading(false);
                notify("Something went wrong. Please try again.");
              }
            });
          } else if (response.data.message === "Admin") {
            let data = {
              ...formvalue,
              adminID: formvalue.ID,
            };
            dispatch(AdminLogin(data)).then((res) => {
              if (res.message === "Successful") {
                notify("Login Successful");
                setLoading(false);
                return navigate("/dashboard");
              } else if (res.message === "Wrong credentials") {
                setLoading(false);
                notify("Wrong credentials");
              } else {
                setLoading(false);
                notify("Something went wrong. Please try again.");
              }
            });
          } else if (response.data.message === "invalid") {
            setLoading(false);
            notify("Invalid login data");
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        notify("An error occurred. Please try again.");
      });
  };





  // if (data?.isAuthenticated === true) {
  //   return <Navigate to={"/dashboard"} />;
  // }

  return (
    <>
      <ToastContainer />
      <div className="mainLoginPage">
        <div className="leftside">
          <h1 className="animate-text">Manage Your School</h1>
        </div>
        <div className="rightside">
          <h1>Login</h1>
          <div className="Profileimg">
            <img src={admin} alt="profile" />
          </div>
          <div>
            <form onSubmit={HandleSubmit}>
              <h3>ID</h3>
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
              <Button onClick={() => navigate("instuction")}><Typography>click here to see login details</Typography></Button>
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
