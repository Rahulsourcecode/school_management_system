import { Table } from "antd";
import React from "react";
import { RiEmpathizeLine } from "react-icons/ri";
import { BiNotepad, BiBus } from "react-icons/bi";
import { FaChalkboardTeacher, FaUserAlt } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdPayment } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ForumIcon from '@mui/icons-material/Forum';
import {
  GetNotices,
  GetAllData,
} from "../../../../Redux/Datas/action";
import { Link } from "react-router-dom";

const FrontPage = () => {
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Details", dataIndex: "details", key: "details" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const notices = useSelector((store) => store.data.notices);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);

  console.log(data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetNotices());
    dispatch(GetAllData());
  }, [dispatch]);

  return (
    <div className="container">
      <Sidebar />
      <div className="AfterSideBar">
        <Link to={"/chat"}> <ForumIcon sx={{ justifyContent: 'flex-end' }} /></Link>
        <h1 style={{ color: "black" }}>Overview</h1>
        <div className="maindiv">
          <div className="one commondiv">
            <div>
              <h1>{data?.teacher}</h1>
              <p>Teachers</p>
            </div>
            <FaChalkboardTeacher className="overviewIcon" />
          </div>
          <div className="two commondiv">
            {" "}
            <div>
              <h1>{data?.student}</h1>
              <p>Students</p>
            </div>
            <FaUserAlt className="overviewIcon" />
          </div>

          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.admin}</h1>
              <p>Admins</p>
            </div>
            <RiAdminLine className="overviewIcon" />
          </div>
          <div className="four commondiv">
            {" "}
            <div>
              <h1>25</h1>
              <p>Class rooms</p>
            </div>
            <SiGoogleclassroom className="overviewIcon" />
          </div>

          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.notice}</h1>
              <p>Notices</p>
            </div>
            <BiNotepad className="overviewIcon" />
          </div>
          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.report}</h1>
              <p>Reports</p>
            </div>
            <MdPayment className="overviewIcon" />
          </div>
          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.report}</h1>
              <p>Reports</p>
            </div>
            <MdPayment className="overviewIcon" />
          </div>
          <div className="six commondiv">
            {" "}
            <div>
              <h1>{data?.report}</h1>
              <p>Reports</p>
            </div>
            <MdPayment className="overviewIcon" />
          </div>
        </div>
        {/* ************************************* */}
        <div className="patientDetails">
          <h1 style={{ color: 'black' }}>School notices</h1>
          <div className="patientBox">
            {notices ? <Table columns={columns} dataSource={notices} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
