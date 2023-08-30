import React, { useState } from "react";
import {useNavigate}  from "react-router-dom"
import "./DLogin.scss";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setpassword } from "../../Redux/auth/action";
import "react-toastify/dist/ReactToastify.css";
const notify = (text) => toast(text);

const Resetpassword = () => {

const navigate = useNavigate();
  // ************************************************
  const [Loading, setLoading] = useState(false);
  const [formvalue, setFormvalue] = useState({
    password1: "",
    password2:""
  });
  const dispatch = useDispatch();

  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if(formvalue.password1==formvalue.password2){
        dispatch(setpassword(formvalue)).then((res) => {
            console.log(res);
            if (res.message === "Password reset successful") {
                notify("Password reset successful");
                setLoading(false);
                navigate('/')
            }
            if (res.message === "No user found") {
                setLoading(false);
                notify("failed to reset password");
            }
            if(res.message ==="No user found"){
                setLoading(false);

                notify("something went wrong!")
            }
            }
        );
    }else{
        notify("password mismatch")
    }
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
              <h3>Enter new password</h3>
              <input
                type="password"
                name="password1"
                value={formvalue.password1}
                onChange={Handlechange}
                required
              />
               <input
                type="password"
                name="password2"
                value={formvalue.password2}
                onChange={Handlechange}
                required
              />
              { <button type="submit">{Loading ? "Loading..." : "Submit"}</button>}
             
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resetpassword;