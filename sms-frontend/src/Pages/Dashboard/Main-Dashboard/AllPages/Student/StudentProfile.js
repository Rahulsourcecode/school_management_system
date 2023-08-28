import React, { useState, useEffect } from "react";
import "../SCSS/Profile.scss";
import { BiTime } from "react-icons/bi";
import { GiMeditation } from "react-icons/gi";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { MdMeetingRoom } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsHouseFill, BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaRegHospital, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { UpdateStudent, axioss } from "../../../../../Redux/auth/action";
import "./CSS/Profiles.scss";
import { Navigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";

const Nurse_Profile = () => {
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const [imagePath, setImagePath] = useState("");
  useEffect(() => {
    const id = data.user._id;
    console.log(id);
    const fetchImage = async () => {
      try {
        const response = await axioss.post("/students/fetchimage", { id });
        const imagePath = response.data.imagePath;
        console.log(imagePath);
        setImagePath(imagePath);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
  }, []);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    studentName: user.studentName,
    age: user.age,
    gender: user.gender,
    address: user.address,
    class: user.class,
    mobile: user.mobile,
    DOB: user.DOB,
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.success(text);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    dispatch(UpdateStudent(formData, user._id));
    success("user updated");
    handleOk();
  };
  const { data } = useSelector((store) => store.auth);

  return (
    <>
      {contextHolder}
      <Grid container>
        <Grid item lg={2} md={3} sm={2} xs={2} position={"sticky"}>
          <Sidebar />
        </Grid>
        <Grid item lg={9} md={9} sm={8} xs={8} sx={{mt:5}}>
          <Grid container spacing={4}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper sx={{ borderRadius: 10 }}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img style={{maxWidth:'100%',maxHeight:350}} src={`http://localhost:3001/uploads/${imagePath}`} alt="img" />
                </div>
                <hr />
                <div className="singleitemdiv">
                  <GiMeditation className="singledivicons" />
                  <p>{user?.studentName}</p>
                </div>
                <div className="singleitemdiv">
                  <MdMeetingRoom className="singledivicons" />
                  <p>{user?.userType}</p>
                </div>
                <div className="singleitemdiv">
                  <FaBirthdayCake className="singledivicons" />
                  <p>{user?.DOB}</p>
                </div>
                <div className="singleitemdiv">
                  <BsFillTelephoneFill className="singledivicons" />
                  <p>{user?.mobile}</p>
                </div>
                <div className="singleitemdiv">
                  <button onClick={showModal}>
                    {" "}
                    <AiFillEdit />
                    Edit profile
                  </button>
                </div>

                <Modal
                  title="Edit details"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" onClick={handleFormSubmit}>
                      Edit
                    </Button>,
                  ]}
                >
                  <form className="inputForm">
                    <input
                      name="adminName"
                      value={formData.studentName}
                      onChange={handleFormChange}
                      type="text"
                      placeholder="Full name"
                    />
                    <input
                      name="age"
                      value={formData.age}
                      onChange={handleFormChange}
                     type="number"
                      placeholder="Age"
                    />
                    <select name="gender" onChange={handleFormChange}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Others</option>
                    </select>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      type="text"
                      placeholder="Address"
                    />

                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleFormChange}
                      type="number"
                      placeholder="mobile"
                    />
                    <input
                      name="DOB"
                      value={formData.DOB}
                      onChange={handleFormChange}
                      type="date"
                      placeholder="Date of birth"
                    />
                  </form>
                </Modal>
              </Paper>
            </Grid>
            {/* ***********  Second Div ******************** */}
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div className="SecondBox">
                <div className="subfirstbox">
                  <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                    Other Info
                  </h2>
                  <div className="singleitemdiv">
                    <BsGenderAmbiguous className="singledivicons" />
                    <p>{user?.gender}</p>
                  </div>
                  <div className="singleitemdiv">
                    <AiFillCalendar className="singledivicons" />
                    <p>{user?.age}</p>
                  </div>

                  <div className="singleitemdiv">
                    <MdOutlineCastForEducation className="singledivicons" />
                    <p>{user?.email}</p>
                  </div>
                  <div className="singleitemdiv">
                    <BsHouseFill className="singledivicons" />
                    <p>{user?.address}</p>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Nurse_Profile;
