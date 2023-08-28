import { Card, Button, CardActions, CardContent, Grid, Typography, ButtonBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UpdateTeacher, axioss } from "../../../../../Redux/auth/action";
import { Navigate } from "react-router-dom";
import { Avatar, Modal, message } from "antd";
import { GiMeditation } from "react-icons/gi";
import { MdBloodtype, MdBook, MdEmail, MdNote, MdOutlineCastForEducation } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { BsFillTelephoneFill, BsGenderAmbiguous, BsHouseFill } from "react-icons/bs";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import LeaveComponent from "./LeaveComponent";

const useStyles = makeStyles((theme) => ({
    centeredContent: {

    },
    button: {
        backgroundColor: 'blue'
    }
}));


export default function Teacher_Profile() {
    const classes = useStyles();
    const { data } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const [imagePath, setImagePath] = useState("");
    useEffect(() => {
        const id = data.user._id;
        console.log(id);
        const fetchImage = async () => {
            try {
                const response = await axioss.post("/teachers/fetchimage", { id });
                const imagePath = response.data.imagePath;
                console.log(imagePath);
                setImagePath(imagePath);
            } catch (error) {
                console.error(error);
            }
        };
        fetchImage();
    }, []);

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

    const [formData, setFormData] = useState({
        teacherName: data.user.teacherName,
        age: data.user.age,
        gender: data.user.gender,
        subject: data.user.subject,
        education: data.user.education,
        mobile: data.user.mobile,
        DOB: data.user.DOB,
    });

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = () => {
        dispatch(UpdateTeacher(formData, data.user._id));
        success("user updated");
        handleOk();
    };

    if (data?.isAuthenticated === false) {
        return <Navigate to={"/"} />;
    }

    if (data?.user.userType !== "teacher") {
        return <Navigate to={"/dashboard"} />;
    }


    return (
        <div>
            {contextHolder}
            <Grid container spacing={10}>
                <Grid item xs={2} sm={2} md={2} lg={1}>
                    <Sidebar />
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={10} sx={{ mt: 5 }}>
                    <Grid container spacing={4} >
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <Card sx={{ height: 450, borderRadius: 10 }}>
                                <CardContent >
                                    <Avatar size={100} alt="Remy Sharp" src={`http://localhost:3001/uploads/${imagePath}`} />
                                    <div className="singleitemdiv">
                                        <GiMeditation className="singledivicons" />
                                        <p>name:{data?.user?.teacherName}</p>
                                    </div>
                                    <div className="singleitemdiv">
                                        <MdBloodtype className="singledivicons" />
                                        <p>position:{data?.user?.userType}</p>
                                    </div>
                                    <div className="singleitemdiv">
                                        <FaBirthdayCake className="singledivicons" />
                                        <p>DOB:{data?.user?.DOB}</p>
                                    </div>
                                    <div className="singleitemdiv">
                                        <BsFillTelephoneFill className="singledivicons" />
                                        <p>phone:{data?.user?.mobile}</p>
                                    </div>
                                    <div className="singleitemdiv">
                                        <Button style={{ backgroundColor: "#172BAB", color: 'white', padding: 1 }} onClick={showModal}>
                                            <AiFillEdit />
                                            Edit
                                        </Button>
                                    </div>
                                    {/* modal */}
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
                                                name="teacherName"
                                                value={formData.teacherName}
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
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleFormChange}
                                                type="text"
                                                placeholder="subject"
                                            />
                                            <input
                                                name="education"
                                                value={formData.education}
                                                onChange={handleFormChange}
                                                type="text"
                                                placeholder="education"
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
                                </CardContent>
                                <CardActions>
                                    <Button size="small"></Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                            <Card sx={{ height: 450, borderRadius: 10 }}>
                                <CardContent>
                                    <div className="singleitemdiv">
                                        <BsGenderAmbiguous className="singledivicons" />
                                        <p>{data?.user?.gender}</p>
                                    </div>
                                    <div className="singleitemdiv">
                                        <AiFillCalendar className="singledivicons" />
                                        <p>{data?.user?.age}</p>
                                    </div>

                                    <div className="singleitemdiv">
                                        <MdOutlineCastForEducation className="singledivicons" />
                                        <p>{data?.user?.education}</p>
                                    </div>
                                    <div className="singleitemdiv">
                                        <BsHouseFill className="singledivicons" />
                                        <p>{data?.user?.address}</p>
                                    </div>
                                    <div className="singleitemdiv">
                                        <MdEmail className="singledivicons" />
                                        <p>{data?.user?.email}</p>
                                    </div>
                                    <div className="singleitemdiv">
                                        <MdNote className="singledivicons" />
                                        <p>{data?.user?.subject}</p>
                                    </div>
                                </CardContent>
                                <CardActions>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Card sx={{ height: 450, borderRadius: 10 }}>
                                <CardContent>
                                    <LeaveComponent />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

