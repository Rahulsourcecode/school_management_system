import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { axioss } from "../../../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './SCSS/AddSubject.scss'
const notify = (text) => toast(text);

const AddSubjects = () => {
    const { data } = useSelector((store) => store.auth);

    const InitData = {
        class: "",
        subject: [''],

    };
    const [subjectData, setSubjectData] = useState(InitData);

    const [loading, setloading] = useState(false);

    const [classData, setClassData] = useState([])

    const [subject, setSubject] = useState([''])

    const dispatch = useDispatch();

    useState(() => {
        axioss.get(`/admin/getclasses`)
            .then((res) => setClassData(res.data))


        axioss.get(`/admin/getsubjects`)
            .then((res) => console.log(res.data))
    }, [])

    const HandleSubjectChange = (e) => {
        setSubjectData({
            ...subjectData,
            [e.target.name]: e.target.value
        });
    };

    const HandleSubjectSubmit = (e) => {
        e.preventDefault();
        setloading(true);
        setloading(false);
        setSubjectData({ ...subjectData, subject });
        console.log(subjectData)
        axioss.post('admin/createSubjects', { ...subjectData, subject })
            .then((res) => notify(res.data.message))
        setSubjectData([''])

    };


    const HandleAddSubject = (e) => {
        const index = Number(e.target.name);
        const updatedSubjects = [...subject];
        updatedSubjects[index] = e.target.value;
        setSubject(updatedSubjects);
    };
    if (data?.isAuthenticated === false) {
        return <Navigate to={"/"} />;
    }

    if (data?.user.userType !== "admin") {
        return <Navigate to={"/dashboard"} />;
    }

    return (
        <>
            <ToastContainer />
            <div className="container">
                <Sidebar />
                <div className="AfterSideBar">
                    <div className="mainAmbupance">
                        <h1>Add Subjects</h1>

                        <form onSubmit={HandleSubjectSubmit}>
                            <div>
                                <label>Choose class:</label>
                                <div className="inputdiv">
                                    <select name="class" onChange={HandleSubjectChange} required>
                                        <option ></option>
                                        {classData.map((c) => <option key={c.id} value={c._id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label>Add Subjects:</label>
                                <div className="inputdiv">
                                    {subject.map((item, index) => (
                                        <div key={index}>
                                            <input key={index}
                                                type="text"
                                                name={index}
                                                value={item}
                                                onChange={HandleAddSubject}
                                                required
                                            />
                                        </div>
                                    ))}
                                    <Button onClick={() => setSubject([...subject, ''])} sx={{ borderRadius: 20 }} variant="contained">+</Button>
                                </div>
                            </div>
                            <button type="submit" className="formsubmitbutton">
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddSubjects;
