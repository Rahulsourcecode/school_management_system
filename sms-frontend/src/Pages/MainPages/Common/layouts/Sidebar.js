import React, { useState } from "react";
import "./Sidebar.scss";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiNotepad } from "react-icons/bi";
import { SlUserFollow } from "react-icons/sl";
import {
  BsPatchQuestionFill,
  BsFillBookmarkCheckFill,
  BsFillCameraVideoFill,
} from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaChalkboardTeacher } from "react-icons/fa";
import SubjectIcon from "@mui/icons-material/Subject";
import { Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { MdDashboardCustomize, MdQuiz } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HelpIcon from "@mui/icons-material/Help";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import RuleIcon from '@mui/icons-material/Rule';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import FeedbackIcon from '@mui/icons-material/Feedback';
import TryIcon from '@mui/icons-material/Try';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ViewListIcon from '@mui/icons-material/ViewList';
import "./CommonCSS.scss";
import { axioss } from "../../../../Redux/auth/action";
import { Typography } from "@mui/material";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    data: { user },
  } = useSelector((state) => state.auth);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div  className="app-container">
        <div style={{ width: isOpen ? "200px" : "70px" }} className={`sidebar ${isOpen ? "open" : ""}`}>
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              SCHOOL
            </h1>
            <div
              style={{ marginLeft: isOpen ? "30px" : "0px" }}
              className="bars"
            >
              <ImMenu onClick={toggle} style={{ cursor: "pointer" }} />
            </div>
          </div>
          <div
            className="bottomSection"
            style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}
          >
            {user?.userType === "admin" && (
              <div className="user_profile">
                <div className="user_avatar">
                  {user?.image ? (
                    <Avatar sx={{ ml: 2.5 }}  src={`${process.env.REACT_APP_IMG_URL}${user.image}`} className="avatar_icon" />
                  ) : (
                    <Avatar className="avatar_icon" />
                  )}
                </div>
                <Typography  sx={{ ml: 2.5 }} className="user_name">{user?.adminName} </Typography>
              </div>
            )}

            {user?.userType === "student" && (
              <div className="user_profile">
                <div className="user_avatar">
                  {user?.image ? (
                    <Stack direction="row">
                      <Avatar sx={{ marginLeft: 1 }} alt="Remy Sharp" src={`${process.env.REACT_APP_IMG_URL}${user.image}`} />
                    </Stack>
                  ) : (
                    <FaUserCircle className="avatar_icon" />
                  )}
                </div>
                <div className="user_name">{user?.studentName}</div>
              </div>
            )}

            {user?.userType === "teacher" && (
              <div className="user_profile">
                <div style={{ marginLeft: 10 }} className="user_avatar">
                  {user?.image ? (
                    <Stack direction="row">
                      <Avatar alt="Remy Sharp" src={`${process.env.REACT_APP_IMG_URL}${user.image}`} />
                    </Stack>
                  ) : (
                    <FaUserCircle className="avatar_icon" />
                  )}
                </div>
                <div className="user_name">{user?.teacherName}</div>
              </div>
            )}

            <Link className="link" activeclassname="active" to={"/dashboard"}>
              <div className="icon">
                <DashboardIcon fontSize="large" className="mainIcon" />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                DashBoard
              </div>
            </Link>

            {user?.userType === "student" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/studentprofile"}
              >
                <div className="icon">
                  <CgProfile className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Profile
                </div>
              </Link>
            )}

            {user?.userType === "student" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/viewattendance"}
              >
                <div className="icon">
                  <AssignmentLateIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  attendance
                </div>
              </Link>
            )}

            {user?.userType === "student" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/viewmarks"}
              >
                <div className="icon">
                  <ViewListIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  marks
                </div>
              </Link>
            )}

            {user?.userType === "student" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/addfeedback"}
              >
                <div className="icon">
                  <FeedbackIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  feedback
                </div>
              </Link>
            )}

            {(user?.userType === "teacher" || user?.userType === "student") && (
              <Link className="link" activeclassname="active" to={"/adddoubt"}>
                <div className="icon">
                  <BsPatchQuestionFill className="mainIcon" />
                </div>
                <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
                  {user?.userType === "teacher" ? "view Doubts" : "Ask Doubt"}
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/adminprofile"}
              >
                <div className="icon">
                  <AccountCircleIcon fontSize="large" className="mainIcon" />{" "}
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  profile
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/addteacher"}
              >
                <div className="icon">
                  <PersonAddIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Add Teacher
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/viewteacher"}
              >
                <div className="icon">
                  <VisibilityIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  teachers
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/manageleave"}
              >
                <div className="icon">
                  <ManageAccountsSharpIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  leaves
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/addstudent"}
              >
                <div className="icon">
                  <PersonAddIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Add Student
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/viewstudent"}
              >
                <div className="icon">
                  <VisibilityIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Students
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link className="link" activeclassname="active" to={"/addclass"}>
                <div className="icon">
                  <BiDetail className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  add class
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/addsubjects"}
              >
                <div className="icon">
                  <SubjectIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  add subjects
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link className="link" activeclassname="active" to={"/admin"}>
                <div className="icon">
                  <RiAdminLine
                    className="mainIcon"
                    style={{ color: "white" }}
                  />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Add Admin
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link className="link" activeclassname="active" to={"/addnotice"}>
                <div className="icon">
                  <BiNotepad className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Add Notice
                </div>
              </Link>
            )}

            {user?.userType === "admin" && (
              <Link className="link" activeclassname="active" to={"/viewfeedbacks"}>
                <div className="icon">
                  <TryIcon className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  view feedbacks
                </div>
              </Link>
            )}

            {user?.userType === "teacher" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/teacherprofile"}
              >
                <div className="icon">
                  <AccountCircleIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Profile
                </div>
              </Link>
            )}

            {user?.userType === "teacher" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/attendance"}
              >
                <div className="icon">
                  <HowToRegIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Attendance
                </div>
              </Link>
            )}


            {user?.userType === "teacher" && (
              <Link
                className="link"
                activeclassname="active"
                to={"/uploadmark"}
              >
                <div className="icon">
                  <RuleIcon fontSize="large" className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Upload Marks
                </div>
              </Link>
            )}

            <Link
              className="LogOutPath link"
              onClick={() => {
                axioss.get("general/logout")
                dispatch({ type: "AUTH_LOGOUT" });
              }}
              to={"/"}
            >
              <div className="icon">
                <ExitToAppTwoToneIcon fontSize="large" />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
