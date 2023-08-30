import React, { useState, useEffect } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup } from '@mui/material';
import Sidebar from '../../Common/layouts/Sidebar';
import { toast, ToastContainer } from 'react-toastify';
import { axioss } from '../../../../Redux/auth/action';
import { DataGrid } from '@mui/x-data-grid';
import TextArea from 'antd/es/input/TextArea';
const notify = (text) => toast(text);

export default function Manageleave() {
    const [open, setOpen] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    console.log(selectedRowData?.show);
    const [status, setStatus] = useState({
        option: "",
        remark: "",
        id: selectedRowData?.show

    });
    console.log(status);
    const columns = [
        { field: 'show', headerName: 'id', width: 1 },
        { field: 'firstName', headerName: 'name', width: 220 },
        { field: 'email', headerName: 'email ID', width: 300 },
        { field: 'from', headerName: 'from', width: 200 },
        { field: 'to', headerName: 'to', width: 300 },
        {
            field: 'view',
            headerName: 'view details',
            width: 200,
            renderCell: (params) => (
                <Button variant="text" onClick={() => handleOpenModal(params.row)}>
                    view
                </Button>
            )
        },

    ];

    useEffect(() => {
        // fetch teachers data from API or database
        axioss.get('/admin/getleaves').then((res) => setTeachers(res.data));
    }, []);
    useEffect(() => {
        setStatus((prevStatus) => ({ ...prevStatus, id: selectedRowData?.show }));
    }, [selectedRowData]);
    const handleOpenModal = (rowData) => {
        setOpen(true);
        setSelectedRowData(rowData);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };


    const handleRadioChange = (e) => {
        setStatus({ ...status, [e.target.name]: e.target.value })
    }

    const submitResponse = () => {
        axioss.post("/admin/leaveapprovel", status)
            .then((res) =>
                res.data.message === "success" ? notify(res.data.message) : "failed")
        setStatus({
            option: "",
            remark: "",
            id: selectedRowData?.show
        })
        setOpen(false)
    };
    const rows = teachers.map((teacher, index) => ({
        id: index + 1,
        firstName: teacher.staffData.teacherName,
        email: teacher.staffData.email,
        from: teacher.fromDate.slice(0, 10),
        to: teacher.toDate.slice(0, 10),
        reason: teacher.reason,
        show: teacher._id
    }));

    return (
        <div>
            <ToastContainer />
            <Grid container spacing={10} >
        <Grid item xs={2} sm={2} md={2} lg={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={10} sx={{mt:5}} >
                    <h2>leave request</h2>
                    <div style={{ height: 550, width: '100%' }}>
                        <DataGrid
                            style={{ backgroundColor: 'white', borderRadius: 20 }}
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 }
                                }
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>
                    </Grid>
                        </Grid>
            {/* Material-UI Modal */}
            <Modal open={open} onClose={handleCloseModal}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                    {selectedRowData && (
                        <>
                            <h2>Approve leave</h2>
                            <p>From: {selectedRowData.from}</p>
                            <p>To: {selectedRowData.to}</p>
                            <label>Reason:{selectedRowData.reason}</label>
                            <br />
                            <br />
                            <FormControl>
                                <FormLabel>status</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="option"
                                    value={status.option}
                                    onChange={handleRadioChange}
                                >
                                    <FormControlLabel value="reject" control={<Radio />} label="reject" />
                                    <FormControlLabel value="approve" control={<Radio />} label="approve" />
                                </RadioGroup>
                            </FormControl>
                            <br />
                            <label>Remarks:</label>
                            <TextArea
                                onChange={handleRadioChange}
                                name='remark'
                                value={status.remark}
                                placeholder="enter reason"></TextArea>
                            <br />
                            <br />
                            <Button onClick={handleCloseModal}>Cancel</Button>
                            <Button color='primary' variant='contained' onClick={submitResponse}>submit</Button>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}
