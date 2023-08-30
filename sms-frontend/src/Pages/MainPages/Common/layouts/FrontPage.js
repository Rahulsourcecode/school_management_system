import { Table } from "antd";
import React, { useEffect } from "react";
import { BiNotepad } from "react-icons/bi";
import { FaChalkboardTeacher, FaUserAlt } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdPayment } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import ForumIcon from '@mui/icons-material/Forum';
import { GetNotices, GetAllData } from "../../../../Redux/Datas/action";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";

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
  const datas = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetNotices());
    dispatch(GetAllData());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={3} sm={3} md={3} lg={1}>
        <Sidebar />
      </Grid>
      <Grid item xs={9} sm={9} md={9} lg={11} paddingRight={3} paddingTop={3}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: "black" }}>Overview</h1>
          </div>
          <div>
            {datas.data.user.userType !== "admin" && <Link to={"/chat"}><ForumIcon fontSize="large" sx={{ marginRight: 5 }} /></Link>}
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <div className="one commondiv">
              <div>
                <h1>{data?.teacher}</h1>
                <p>Teachers</p>
              </div>
              <FaChalkboardTeacher className="overviewIcon" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <div className="two commondiv">
              {" "}
              <div>
                <h1>{data?.student}</h1>
                <p>Students</p>
              </div>
              <FaUserAlt className="overviewIcon" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <div className="six commondiv">
              {" "}
              <div>
                <h1>{data?.admin}</h1>
                <p>Admins</p>
              </div>
              <RiAdminLine className="overviewIcon" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <div className="four commondiv">
              {" "}
              <div>
                <h1>{data?.classes}</h1>
                <p>Classrooms</p>
              </div>
              <SiGoogleclassroom className="overviewIcon" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <div className="six commondiv">
              {" "}
              <div>
                <h1>{data?.notice}</h1>
                <p>Notices</p>
              </div>
              <BiNotepad className="overviewIcon" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <div className="six commondiv">
              {" "}
              <div>
                <h1>{data?.feedback}</h1>
                <p>Feedbacks</p>
              </div>
              <MdPayment className="overviewIcon" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <div className="six commondiv">
              {" "}
              <div>
                <h1>{data?.leave}</h1>
                <p>Leave requests</p>
              </div>
              <MdPayment className="overviewIcon" />
            </div>
          </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
            <h1 style={{ color: 'black' }}>School notices</h1>
              {notices ? <Table  columns={columns} dataSource={notices} /> : null}
        </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
};

export default FrontPage;