import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Sidebar from '../../GlobalFiles/Sidebar';
import { axioss } from '../../../../../Redux/auth/action';
import { useSelector } from 'react-redux';

import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Grid } from '@mui/material';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    const generatePDF = async (month, details) => {
        const formattedDetails = details.map(detail => ({
            ...detail,
            formattedDate: new Date(detail.date).toLocaleDateString(),
        }));
        const blob = await pdf(<AttendancePDF month={month} details={formattedDetails} />).toBlob();
        saveAs(blob, `${month}_Attendance.pdf`);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.month}
                </TableCell>
                <TableCell align="right">{row.totalAbsences}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="download pdf"
                        size="small"
                        onClick={() => generatePDF(row.month, row.details)}
                    >
                        Download PDF
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details && row.details.map((detailRow) => (
                                        <TableRow key={detailRow.date}>
                                            <TableCell component="th" scope="row">
                                                {detailRow.formattedDate}
                                            </TableCell>
                                            <TableCell>{detailRow.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        month: PropTypes.string.isRequired,
        totalAbsences: PropTypes.number.isRequired,
        details: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired,
                formattedDate: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

const AttendancePDF = ({ month, details }) => (
    <Document>
        <Page size="A4">
            <View style={styles.container}>
                <Text>{`Monthly Attendance Report - ${month}`}</Text>
                {details.map((detail) => (
                    <Text key={detail.date}>{`${detail.formattedDate}: ${detail.status}`}</Text>
                ))}
            </View>
        </Page>
    </Document>
);

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

export default function ViewAttendance() {
    const data = useSelector((data) => data.auth);
    const userId = data?.data?.user?.studentID;
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        axioss.post("/students/attendance", { id: userId }).then((res) => {
            const attendanceByMonth = {};
            res.data.forEach((attendanceItem) => {
                const date = new Date(attendanceItem.date);
                const month = date.toLocaleString('default', { month: 'long' });
                const isAbsent = attendanceItem.state === 'false'; // 'false' indicates absence
                if (!attendanceByMonth[month]) {
                    attendanceByMonth[month] = {
                        month,
                        totalAttendance: 0,
                        totalAbsences: 0,
                        totalWorkingDays: 0,
                        details: [],
                    };
                }
                attendanceByMonth[month].totalAttendance++;
                if (isAbsent) {
                    attendanceByMonth[month].totalAbsences++;
                }
                attendanceByMonth[month].totalWorkingDays++;
                attendanceByMonth[month].details.push({
                    date: attendanceItem.date,
                    status: isAbsent ? 'Absent' : 'Present',
                    formattedDate: date.toLocaleDateString(),
                });
            });
            const processedAttendance = Object.values(attendanceByMonth).map((monthData) => ({
                ...monthData,
                absenceRatio: (monthData.totalAbsences / monthData.totalWorkingDays) * 100, // Calculate absence ratio out of 100
            }));
            setAttendance(processedAttendance);
        });
    }, []);

    return (
        <>
            <Grid container>
                <Grid item xs={2} sm={2} md={2} lg={1}>
                <Sidebar></Sidebar>
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10}>
                <h1 style={{ marginTop: "3rem", marginBottom: "2rem" }}>
                    View Attendance History
                </h1>
                {attendance.length === 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                        <Typography variant="body1">
                            No records found.
                        </Typography>
                    </div>
                ) : (
                    <div>
                        <Grid container spacing={6}>
                            <Grid item  xs={12} sm={12} md={6} lg={6}>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Month</TableCell>
                                            <TableCell align="right">Number of Absences</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {attendance.map((row) => (
                                            <Row key={row.month} row={row} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <ResponsiveContainer height={300}>
                                <BarChart data={attendance}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={[0, 100]} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="absenceRatio" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Grid>
                 </Grid>
                    </div>
                )}
                </Grid>
            </Grid>
        </>
    );
}
