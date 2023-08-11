import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import DLogin from "../Pages/Dashboard/Login/DLogin";
import Error from "../Pages/404/Error";
import AddAdmin from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddAdmin";
import AddTeacher from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddTeacher";
import AddStudent from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddStudent";
import AllDoubts from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AllDoubts";
import CheckReports from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/CheckReports";
import CreateReport from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/CreateReport";
import TeacherProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/TeacherProfile";
import StudentProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/Student/StudentProfile";
import FrontPage from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/FrontPage";
import TeachersList from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/TeacherLists";
import AddClass from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddClass";
import ForgetPassword from "../Pages/Dashboard/Login/ForgotPassword";
import Verifyotp from "../Pages/Dashboard/Login/Verifyotp";
import Resetpassword from "../Pages/Dashboard/Login/ResetPassword";
import StudentLists from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/StudentLists";
import AdminProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AdminProfile";
import MarkAttendance from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/MarkAttendance";
import ChooseAttendance from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/ChooseAttendance";
import EditAttendance from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/EditAttendance";
import AddSubjects from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddSubjects";
import AddNotices from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddNotice";
import UploadMarks from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/UploadMarks";
import ManageLeave from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/ManageLeave";
import MainDoubtPage from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/Doubts/MainDoubtPage";
import AddFeedback from "../Pages/Dashboard/Main-Dashboard/AllPages/Student/AddFeedback";
import FeedbackList from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/FeedbackList";
import Chat from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/chat/Chat";
import ViewAttendance from "../Pages/Dashboard/Main-Dashboard/AllPages/Student/ViewAttendance";

const RoleBasedRoutes = () => {
  const { data } = useSelector((store) => store.auth);
  // Helper function to check if the user's role matches any of the given roles
  const isUserRole = (roles) => roles.includes(data.user.userType);

  return (
    <>
      <Routes>
        <Route path="/" element={data.isAuthenticated ? <FrontPage /> : <DLogin />} />
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
            <Route path="/createreport" element={<CreateReport />} />
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
          </>
        )}

        {/* Catch-all route for unknown routes */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default RoleBasedRoutes;
