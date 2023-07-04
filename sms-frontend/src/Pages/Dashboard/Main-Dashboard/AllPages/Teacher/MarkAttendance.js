import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { DeleteReports, GetAllReport } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/lab";

const MarkAttendance = () => {
  const { data } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const AllAppointment = useSelector((state) => state.data.reports);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const DeleteReport = (id) => {
    dispatch(DeleteReports(id));
  };

  useEffect(() => {
    if (data?.user.userType === "student") {
      dispatch(GetAllReport(selectedDate));
    } else {
      dispatch(GetAllReport({ email: data?.user.email, selectedDate }));
    }
  }, [dispatch, data, selectedDate]);

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType === "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Attendance_Page">
            <div className="date-picker">
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                label="Select Date"
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="attendance-table">
              <h2>Attendance for {selectedDate.toLocaleDateString()}</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student Name</TableCell>
                      <TableCell>Attendance Status</TableCell>
                      <TableCell>present or abscent</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {AllAppointment.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          {student.present ? "Present" : "Absent"}
                        </TableCell>
                        <TableCell>
                       <input type="checkbox">
                       </input>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkAttendance;
