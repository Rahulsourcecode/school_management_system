import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import DLogin from "../Pages/Login/DLogin";
import Error from "../Pages/404/Error";
import AddAdmin from "../Pages/MainPages/AllPages/Admin/AddAdmin";
import AddTeacher from "../Pages/MainPages/AllPages/Admin/AddTeacher";
import AddStudent from "../Pages/MainPages/AllPages/Admin/AddStudent";
import AllDoubts from "../Pages/MainPages/AllPages/Admin/AllDoubts";
import CheckReports from "../Pages/MainPages/AllPages/Teacher/CheckReports";
import TeacherProfile from "../Pages/MainPages/AllPages/Teacher/TeacherProfile";
import StudentProfile from "../Pages/MainPages/AllPages/Student/StudentProfile";
import FrontPage from "../Pages/MainPages/Common/layouts/FrontPage";
import TeachersList from "../Pages/MainPages/AllPages/Admin/TeacherLists";
import AddClass from "../Pages/MainPages/AllPages/Admin/AddClass";
import ForgetPassword from "../Pages/Login/ForgotPassword";
import Verifyotp from "../Pages/Login/Verifyotp";
import Resetpassword from "../Pages/Login/ResetPassword";
import StudentLists from "../Pages/MainPages/AllPages/Admin/StudentLists";
import AdminProfile from "../Pages/MainPages/AllPages/Admin/AdminProfile";
import MarkAttendance from "../Pages/MainPages/AllPages/Teacher/MarkAttendance";
import ChooseAttendance from "../Pages/MainPages/AllPages/Teacher/ChooseAttendance";
import EditAttendance from "../Pages/MainPages/AllPages/Teacher/EditAttendance";
import AddSubjects from "../Pages/MainPages/AllPages/Admin/AddSubjects";
import AddNotices from "../Pages/MainPages/AllPages/Admin/AddNotice";
import UploadMarks from "../Pages/MainPages/AllPages/Teacher/UploadMarks";
import ManageLeave from "../Pages/MainPages/AllPages/Admin/ManageLeave";
import MainDoubtPage from "../Pages/MainPages/Common/Doubts/MainDoubtPage";
import AddFeedback from "../Pages/MainPages/AllPages/Student/AddFeedback";
import FeedbackList from "../Pages/MainPages/AllPages/Admin/FeedbackList";
import Chat from "../Pages/MainPages/Common/chat/Chat";
import ViewAttendance from "../Pages/MainPages/AllPages/Student/ViewAttendance";
import { axioss } from "../Redux/auth/action";
import PrivateRoute from "./PrivateRoute";
import ViewMarks from "../Pages/MainPages/AllPages/Student/ViewMarks";
import LoginInstructions from "../Pages/Login/LoginInstructions";
let state
axioss.interceptors.response.use(function (response) {
  try {
    console.log('calling');
    console.log(document.cookie)
    const cookies = {};
    document?.cookie?.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      cookies[name] = value;
    })
    console.log(cookies.token);
    if (cookies?.token) {
      console.log('get token');
      const serializedStore = localStorage.getItem("token");
      console.log(typeof (serializedStore));
      state = true
      console.log('state', state)
      // if (serializedStore!==null) {
      //   const st = serializedStore
      //   console.log(st)
      //   state = st === cookies.token ? true : false
      // }
    } else {
      state = false
      console.log('state', state)
    }
    return response
  } catch (error) {
    console.log(error)
  }
}, function (error) {
  return Promise.reject(error);
});
axioss.interceptors.request.use(function (config) {
  try {
    console.log('comming');
    console.log(config);
    console.log(document.cookie)
    const cookies = {};
    document?.cookie?.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      cookies[name] = value;
    })
    if (cookies?.token) {
      console.log('get token');
      const serializedStore = localStorage.getItem("token");
      console.log(typeof (serializedStore));
      state = true
      console.log('state', state)
      // if (serializedStore!==null) {
      //   const st = serializedStore
      //   console.log(st)
      //   state = st === cookies.token ? true : false
      //   console.log('state',state)
      // }
    } else {
      state = false
      console.log('state', state)
    }
    return config;
  } catch (error) {
    console.log(error)
  }
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
const RoleBasedRoutes = () => {
  const { data } = useSelector((store) => store.auth);
  // Helper function to check if the user's role matches any of the given roles
  const isUserRole = (roles) => roles.includes(data.user.userType);

  return (
    <>
      <Routes>
        <Route path="/" element={data.isAuthenticated ? <FrontPage /> : <DLogin />} />
        {/* <Route element={<PrivateRoute state={state}/>} > */}
        <>
          <Route path="/instuction" element={<LoginInstructions />} />
          <Route path="/fogotpassword" element={<ForgetPassword />} />
          <Route path="/verifyotp" element={<Verifyotp />} />
          <Route path="/resetpassword" element={<Resetpassword />} />

          {/* Public routes accessible to all */}
          {data.isAuthenticated && isUserRole(["teacher", "student"]) && (
            <>
              <Route path="/chat" element={<Chat />} />
            </>
          )}

          {/* Admin routes */}
          {data.isAuthenticated && isUserRole(["admin"]) && (
            <>
              <Route path="/dashboard" element={<FrontPage />} />
              <Route path="/adminprofile" element={<AdminProfile />} />
              <Route path="/addteacher" element={<AddTeacher />} />
              <Route path="/viewteacher" element={<TeachersList />} />
              <Route path="/addstudent" element={<AddStudent />} />
              <Route path="/viewstudent" element={<StudentLists />} />
              <Route path="/admin" element={<AddAdmin />} />
              <Route path="/addnotice" element={<AddNotices />} />
              <Route path="/addclass" element={<AddClass />} />
              <Route path="/addsubjects" element={<AddSubjects />} />
              <Route path="/manageleave" element={<ManageLeave />} />
              <Route path="/viewfeedbacks" element={<FeedbackList />} />
            </>
          )}

          {/* Teacher routes */}
          {data.isAuthenticated && isUserRole(["teacher"]) && (
            <>
              <Route path="/dashboard" element={<FrontPage />} />
              <Route path="/doubts" element={<AllDoubts />} />
              <Route path="/teacherprofile" element={<TeacherProfile />} />
              <Route path="/attendance" element={<ChooseAttendance />} />
              <Route path="/markattendance" element={<MarkAttendance />} />
              <Route path="/editattendance/:date" element={<EditAttendance />} />
              <Route path="/uploadmark" element={<UploadMarks />} />
              <Route path="/adddoubt" element={<MainDoubtPage />} />
            </>
          )}

          {data.isAuthenticated && isUserRole(["student"]) && (
            <>
              <Route path="/addfeedback" element={<AddFeedback />} />
              <Route path="/dashboard" element={<FrontPage />} />
              <Route path="/doubts" element={<AllDoubts />} />
              <Route path="/checkreports" element={<CheckReports />} />
              <Route path="/studentprofile" element={<StudentProfile />} />
              <Route path="/adddoubt" element={<MainDoubtPage />} />
              <Route path="/viewattendance" element={<ViewAttendance />} />
              <Route path="/viewmarks" element={<ViewMarks />} />
            </>
          )}
        </>
        {/* </Route> */}

        {/* Catch-all route for unknown routes */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default RoleBasedRoutes;
