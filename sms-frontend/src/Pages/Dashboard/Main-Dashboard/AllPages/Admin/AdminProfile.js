import React, { useState } from "react";
import "../Teacher/CSS/TeacherProfile.scss";
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
import { UpdateAdmin} from "../../../../../Redux/auth/action";
import "./CSS/AdminProfile.scss";
import { Navigate } from "react-router-dom";

const AdminProfile = () => {
  const {
    data: { user },
  } = useSelector((state) => state.auth);
console.log(user)
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    adminName: user.adminName,
    age: user.age,
    gender: user.gender,
    address: user.address,
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
    dispatch(UpdateAdmin(formData, user._id));
    success("user updated");
    handleOk();
  };
  const { data } = useSelector((store) => store.auth);

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {contextHolder}
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="maindoctorProfile">
            <div className="firstBox doctorfirstdiv">
              <div>
                <img src={user?.image} alt="img" />
              </div>
              <hr />
              <div className="singleitemdiv">
                <GiMeditation className="singledivicons" />
                <p>{user?.adminName}</p>
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
                    value={formData.adminName}
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
            </div>
            {/* ***********  Second Div ******************** */}
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
              {/* ***********  Third Div ******************** */}
              {/* <div className="subSecondBox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  School Details
                </h2>
                <div className="singleitemdiv">
                  <BiTime className="singledivicons" />
                  <p>09:00 AM - 20:00 PM (TIMING)</p>
                </div>
                <div className="singleitemdiv">
                  <FaRegHospital className="singledivicons" />
                  <p>Delhi Public School, CBSE</p>
                </div>
                <div className="singleitemdiv">
                  <FaMapMarkedAlt className="singledivicons" />
                  <p>
                    Sri Aurobindo Marg, Ansari Nagar, Ansari Nagar East, New
                    Delhi.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
