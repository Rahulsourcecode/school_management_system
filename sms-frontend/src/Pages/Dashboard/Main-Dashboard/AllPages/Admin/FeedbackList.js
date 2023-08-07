import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Sidebar from '../../GlobalFiles/Sidebar';
import { ToastContainer } from 'react-toastify';
import { axioss } from '../../../../../Redux/auth/action';

export default function FeedbackList() {
    const [feedback, setFeedback] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // fetch feedback data from API or database
        axioss.get('/admin/getfeedback').then((res) => setFeedback(res.data));
    }, []);

    const handleView = (feedback) => {
        setSelectedFeedback(feedback);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const renderViewButton = (params) => (
        <Button variant="text" color="primary" size="small" onClick={() => handleView(params.row)}>
            View
        </Button>
    );

    const columns = [
        { field: 'id', headerName: 'id', width: 10 },
        { field: 'studentName', headerName: 'Student name', width: 300 },
        { field: 'teacherName', headerName: 'Teacher name', width: 250 },
        { field: 'feedback', headerName: 'Feedback', width: 200 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'view', headerName: 'View', width: 100, renderCell: renderViewButton },
    ];

    const rows = feedback.map((feedback, index) => ({
        id: feedback._id,
        studentName: feedback.studentId.studentName,
        teacherName: feedback.teacher.teacherName,
        feedback: feedback.feedback,
        date: feedback.date.slice(0, 10),
    }));

    return (
        <div>
            <ToastContainer />
            <div className="container">
                <Sidebar />
                <div className="AfterSideBar">
                    <h2>All feedbacks</h2>

                    <div style={{ height: 550, width: '100%' }}>
                        <DataGrid
                            style={{ backgroundColor: 'white', borderRadius: 20 }}
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                        />
                    </div>
                </div>
            </div>
            <Dialog open={showModal} onClose={handleCloseModal}>
                <DialogTitle>Feedback Details</DialogTitle>
                <DialogContent>
                    <p>Submitted by Student: {selectedFeedback?.studentName}</p>
                    <p>About Teacher Name: {selectedFeedback?.teacherName}</p>
                    <p>Feedback: {selectedFeedback?.feedback}</p>
                    <p>Date: {selectedFeedback?.date}</p>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" sx={{ background: 'darkblue' }} onClick={handleCloseModal} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
