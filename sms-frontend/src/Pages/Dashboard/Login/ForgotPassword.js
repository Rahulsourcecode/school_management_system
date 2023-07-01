import React, { useState } from "react";
import {useNavigate,Link}  from "react-router-dom"
import "./DLogin.scss";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgetPassword } from "../../../Redux/auth/action";
const notify = (text) => toast(text);

const ForgetPassword = () => {

const navigate = useNavigate();
  // ************************************************
  const [Loading, setLoading] = useState(false);
  const [formvalue, setFormvalue] = useState({
    email: "",
  });
  const dispatch = useDispatch();

  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(forgetPassword(formvalue)).then((res) => {
        console.log(res);
        if (res.message === "OTP sent successfully") {
            setLoading(false);
            navigate('/verifyotp')
            notify("OTP sent successfully");
        }
        if (res.message === "Wrong credentials") {
            setLoading(false);
    
            notify("Wrong credentials");
        }
        }
    );
  };


  return (
    <>
      <ToastContainer />
      <div className="mainLoginPage">
        <div className="leftside">
        <h1 className="animate-text">Manage Your School</h1>

        </div>
        <div className="rightside">
          <h1>Authenticate Yourself</h1>
          {/* <div className="Profileimg">
            <img src={admin} alt="profile" />
          </div> */}
          <div>
            <form onSubmit={HandleSubmit}>
              <h3>enter you email</h3>
              <input
                type="email"
                name="email"
                value={formvalue.email}
                onChange={Handlechange}
                required
              />
              <button type="submit">{Loading ? "Loading..." : "Submit"}</button>
            </form>
            <Link style={{textDecoration:"none"}} to={"/"}>remember password?</Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
