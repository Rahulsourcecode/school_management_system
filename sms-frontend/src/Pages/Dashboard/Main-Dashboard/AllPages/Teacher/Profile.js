import { Card, Button, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UpdateTeacher, axioss } from "../../../../../Redux/auth/action";
import { Navigate } from "react-router-dom";
import { Avatar } from "antd";

const useStyles = makeStyles((theme) => ({
    centeredContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
    },
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

    //   const [messageApi, contextHolder] = message.useMessage();

    //   const success = (text) => {
    //     messageApi.success(text);
    //   };

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

    //   const handleFormSubmit = () => {
    //     dispatch(UpdateTeacher(formData, data.user._id));
    //     success("user updated");
    //     handleOk();
    //   };

    if (data?.isAuthenticated === false) {
        return <Navigate to={"/"} />;
    }

    if (data?.user.userType !== "teacher") {
        return <Navigate to={"/dashboard"} />;
    }


    return (
        <div style={{ display: "flex" }}>
            {/* {contextHolder} */}
            <Sidebar />
            <Grid spacing={3} container style={{ backgroundColor: '#DBF5FF', padding: 100 }}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card sx={{ Width: 100, height: 400 }}>
                        <CardContent >
                            <Avatar size={200} alt="Remy Sharp" src={`http://localhost:3001/uploads/${imagePath}`} />
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card sx={{ Width: 100, height: 400 }}>
                        <CardContent>

                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card sx={{ Width: 100, height: 400 }}>
                        <CardContent>

                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

