import React, { useState } from "react";
import {useNavigate}  from "react-router-dom"
import "./DLogin.scss";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { VerifyOtp } from "../../../Redux/auth/action";
import "react-toastify/dist/ReactToastify.css";
const notify = (text) => toast(text);

const Verifyotp = () => {

const navigate = useNavigate();
  // ************************************************
  const [Loading, setLoading] = useState(false);
  const [formvalue, setFormvalue] = useState({
    otp: "",
  });
  const dispatch = useDispatch();

  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(VerifyOtp(formvalue)).then((res) => {
        console.log(res);
        if (res.message === "Success") {
            notify("success !! set new password");
            setLoading(false);
            navigate('/resetpassword')
        }
        if (res.message === "invalid OTP!") {
            setLoading(false);
    
            notify("otp verification failed");
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
              <h3>Verify Otp</h3>
              <input
                type="text"
                name="otp"
                value={formvalue.otp}
                onChange={Handlechange}
                required
              />
              <button type="submit">{Loading ? "Loading..." : "Submit"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verifyotp;