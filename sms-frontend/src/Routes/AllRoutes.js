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
const AllRoutes = () => {
  const { data } = useSelector((store) => store.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<DLogin />} />
        <Route path="*" element={<Error/>} />
        <Route path="/adminprofile" element={<AdminProfile/>} />
        <Route path="/fogotpassword" element={<ForgetPassword/>} />
        <Route path="/verifyotp" element={<Verifyotp/>}/>
        <Route path="/resetpassword" element={<Resetpassword/>}/>
        <Route path="/dashboard" element={data.user?<FrontPage />:<Error/>}/>
        <Route path="/addteacher" element={<AddTeacher />} />
        <Route path="/viewteacher" element={<TeachersList />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/viewstudent" element={<StudentLists/>}/>
        <Route path="/doubts" element={<AllDoubts />} />
        <Route path="/admin" element={<AddAdmin />} />
        <Route path="/addnotice" element={<AddNotice />} />
        <Route path="/checkreports" element={<CheckReports />} />
        <Route path="/createreport" element={<CreateReport />} />
        <Route path="/teacherprofile" element={<TeacherProfile />} />
        <Route path="/adddoubt" element={<AddDoubt />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
        <Route path="/addclass" element={<AddClass />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
