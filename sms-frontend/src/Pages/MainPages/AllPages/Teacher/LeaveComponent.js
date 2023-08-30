import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { applyLeave, axioss } from "../../../../Redux/auth/action";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Modal } from "antd";

export default function LeaveComponent() {
    const [datalist, setDatalist] = useState([])
    console.log(datalist)

    const { data } = useSelector((store) => store.auth);
    const dispatch = useDispatch()
    const [leaveModalVisible, setLeaveModalVisible] = useState(false);
    const [leaveStatus, setLeaveStatus] = useState(false)
    const [formData1, setFormData1] = useState({
        staffID: data.user._id,
        fromDate: "",
        toDate: "",
        reason: "",
    })
    console.log(formData1)
    useEffect(() => {
        axioss.post("teachers/leaveStatus", { id: data.user._id })
            .then((res) => setDatalist(res.data))
    }, [leaveModalVisible])
    const handleFormChange1 = (e) => {
        setFormData1({ ...formData1, [e.target.name]: e.target.value })
    }


    const handleApplyLeaveClick = () => {
        setLeaveModalVisible(true);
    };

    const handleLeaveCancel = () => {
        setLeaveModalVisible(false);
        setLeaveStatus(false);
    };

    const handleLeaveSubmit = () => {
        dispatch(applyLeave(formData1, data.user._id));
        setLeaveModalVisible(false);
    };

    const viewLeaveStatus = () => {
        setLeaveStatus(true)
    }
    return (
        <>
            <div className="SecondBox" style={{ marginBottom: '40px' }}>
                <div className="subfirstbox">
                    <div className="singleitemdiv">
                        <h3 style={{ textAlign: 'center' }}>Leave details</h3>
                    </div>
                    <div style={{ alignContent: 'center' }}>
                        <Buttons onhandle={handleApplyLeaveClick} onClick={handleApplyLeaveClick}>Apply </Buttons>
                        <Buttons onhandle={viewLeaveStatus}>view </Buttons>
                        <Modal
                            title="Apply Leave"
                            visible={leaveModalVisible}
                            onCancel={handleLeaveCancel}
                            footer={[
                                <Buttons onhandle={handleLeaveCancel} key="back" onClick={handleLeaveCancel}>
                                    Cancel
                                </Buttons>,
                                <Buttons onhandle={handleLeaveSubmit} key="submit" onClick={handleLeaveSubmit}>
                                    Apply
                                </Buttons>,
                            ]}
                        >
                            <form onSubmit={handleLeaveSubmit}>
                                <label>From:</label>
                                <br />
                                <input type="date"
                                    name="fromDate"
                                    value={formData1.fromDate}
                                    onChange={handleFormChange1} />
                                <br />
                                <label>To:</label>
                                <br />
                                <input type="date"
                                    name="toDate"
                                    value={formData1.toDate}
                                    onChange={handleFormChange1} />
                                <br />
                                <label>Reason:</label>
                                <br />
                                <textarea
                                    name="reason" rows="4" cols="50"
                                    value={formData1.reason}
                                    onChange={handleFormChange1}></textarea>
                            </form>
                        </Modal>
                        <Modal
                            title="Leave status"
                            visible={leaveStatus}
                            onCancel={handleLeaveCancel}
                            footer={[
                                <Buttons onhandle={handleLeaveCancel} key="back" onClick={handleLeaveCancel}>
                                    close
                                </Buttons>,

                            ]}
                        >
                            {datalist.map((data, index) => {
                                return <>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '100%', flexShrink: 0 }}>
                                                {`${data.fromDate.slice(0, 10)}  TO  ${data.fromDate.slice(0, 10)} `}
                                                <h5 style={{ color: data.isApproved ? "Green" : "red" }}> {`${data.entered ? data.isApproved ? "Approved" : "Rejected" : "pending..."}`}</h5  >
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="h6">
                                                {data.remarks}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </>
                            })}


                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}

function Buttons({ onhandle, children }) {
    return <Button style={{ marginLeft: 10, backgroundColor: "#172BAB" }} onClick={onhandle} variant="contained">{children}</Button>
}