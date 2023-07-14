import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import DLogin from "../Pages/Dashboard/Login/DLogin";
import Error from "../Pages/404/Error";
import AddNotice from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddNotice";
import AddAdmin from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddAdmin";
import AddTeacher from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddTeacher";
import AddStudent from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddStudent";
import AllDoubts from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AllDoubts";
import CheckReports from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/CheckReports";
import CreateReport from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/CreateReport";
import TeacherProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/Teacher/TeacherProfile";
import AddDoubt from "../Pages/Dashboard/Main-Dashboard/AllPages/Student/AddDoubt";
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
const AllRoutes = () => {
  const { data } = useSelector((store) => store.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<DLogin />} />
        <Route path="*" element={<Error />} />
        <Route path="/adminprofile" element={data.isAuthenticated ? <AdminProfile /> : <DLogin />} />
        <Route path="/fogotpassword" element={<ForgetPassword />} />
        <Route path="/verifyotp" element={<Verifyotp />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/dashboard" element={data.isAuthenticated ? <FrontPage /> : <DLogin />} />
        <Route path="/attendance" element={data.isAuthenticated ? <ChooseAttendance /> : <DLogin />} />
        <Route path="/markattendance" element={data.isAuthenticated ? <MarkAttendance /> : <DLogin />} />
        <Route path="/editattendance/:date" element={data.isAuthenticated ? <EditAttendance /> : <DLogin />} />
        <Route path="/addteacher" element={data.isAuthenticated ? <AddTeacher /> : <DLogin />} />
        <Route path="/viewteacher" element={data.isAuthenticated ? <TeachersList /> : <DLogin />} />
        <Route path="/addstudent" element={data.isAuthenticated ? <AddStudent /> : <DLogin />} />
        <Route path="/viewstudent" element={data.isAuthenticated ? <StudentLists /> : <DLogin />} />
        <Route path="/doubts" element={data.isAuthenticated ? <AllDoubts /> : <DLogin />} />
        <Route path="/admin" element={data.isAuthenticated ? <AddAdmin /> : <DLogin />} />
        <Route path="/addnotice" element={data.isAuthenticated ? <AddNotices /> : <DLogin />} />
        <Route path="/checkreports" element={data.isAuthenticated ? <CheckReports /> : <DLogin />} />
        <Route path="/createreport" element={data.isAuthenticated ? <CreateReport /> : <DLogin />} />
        <Route path="/teacherprofile" element={data.isAuthenticated ? <TeacherProfile /> : <DLogin />} />
        <Route path="/adddoubt" element={data.isAuthenticated ? <AddDoubt /> : <DLogin />} />
        <Route path="/studentprofile" element={data.isAuthenticated ? <StudentProfile /> : <DLogin />} />
        <Route path="/addclass" element={data.isAuthenticated ? <AddClass /> : <DLogin />} />
        <Route path="/addsubjects" element={data.isAuthenticated ? <AddSubjects /> : <DLogin />} />
        <Route path="/uploadmark" element={data.isAuthenticated ? <UploadMarks /> : <DLogin />} />



      </Routes>
    </>
  );
};

export default AllRoutes;
