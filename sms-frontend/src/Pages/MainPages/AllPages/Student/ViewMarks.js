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
import Sidebar from '../../Common/layouts/Sidebar';
import { axioss } from '../../../../Redux/auth/action';
import { useSelector } from 'react-redux';

import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid } from '@mui/material';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    const generatePDF = async (term, details) => {
        const formattedDetails = details.map(detail => ({
            ...detail,
            formattedDate: new Date(detail.date).toLocaleDateString(),
        }));
        const blob = await pdf(<MarksPDF term={term} details={formattedDetails} />).toBlob();
        saveAs(blob, `${term}_Marks.pdf`);
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
                    {row.term}
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="download pdf"
                        size="small"
                        onClick={() => generatePDF(row.term, row.details)}
                    >
                        Download PDF
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Marks Details
                            </Typography>
                            <Table size="small" aria-label="marks">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Mark</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details && row.details.map((detailRow) => (
                                        <TableRow key={detailRow.subject}>
                                            <TableCell component="th" scope="row">
                                                {detailRow.subject}
                                            </TableCell>
                                            <TableCell>{detailRow.mark + "/100"}</TableCell>
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
        term: PropTypes.string.isRequired,
        details: PropTypes.arrayOf(
            PropTypes.shape({
                subject: PropTypes.string.isRequired,
                mark: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

const MarksPDF = ({ term, details }) => (
    <Document>
        <Page size="A4">
            <View style={styles.container}>
                <Text>{`Term Marks Report - ${term}`}</Text>
                {details.map((detail) => (
                    <Text key={detail.subject}>{`${detail.subject}: ${detail.mark + "/100"}`}</Text>
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

export default function ViewMarks() {
    const data = useSelector((data) => data.auth);
    const userId = data?.data?.user?.studentID;
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        axioss.post("/students/marks", { id: userId }).then((res) => {
            const marksData = res.data.marks;
            const processedMarks = Object.keys(marksData).map((term) => {
                const termDetails = Object.entries(marksData[term]).map(([subject, mark]) => ({
                    subject,
                    mark: parseInt(mark),
                }));

                const totalMarks = termDetails.reduce((total, detail) => total + detail.mark, 0);

                return {
                    term,
                    details: termDetails,
                    totalMarks,
                };
            });

            setMarks(processedMarks);
        });
    }, []);

    return (
        <>
            <Grid container spacing={5}>
                <Grid item xs={4} sm={2} md={2} lg={1}>
                    <Sidebar></Sidebar>
                </Grid>
                <Grid xs={8} sm={9} md={9} lg={10} sx={{ mt: 2 ,pr:1 }}>
                    <h1 style={{ marginTop: "3rem", marginBottom: "2rem", marginLeft: '2rem' }}>
                        View Marks
                    </h1>
                    {marks.length === 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                            <Typography variant="body1">
                                No records found.
                            </Typography>
                        </div>
                    ) : (

                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12} md={6} lg={6} sx={{pr:4}}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="collapsible table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell />
                                                <TableCell>Term</TableCell>
                                                <TableCell>Total Marks</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {marks.map((row) => (
                                                <Row key={row.term} row={row} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6}>
                                <ResponsiveContainer height={300}>
                                    <BarChart data={marks} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="term" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="totalMarks" fill="#8884d8" name="Total Marks" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
