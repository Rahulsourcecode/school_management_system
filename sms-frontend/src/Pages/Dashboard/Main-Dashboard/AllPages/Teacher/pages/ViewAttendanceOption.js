import * as React from 'react';
import { Link } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from "react-toastify";

import { axioss } from "../../../../../../Redux/auth/action";
const notify = (text) => toast(text);

export default function ViewAttendanceOption() {
  const [dateList, setDateList] = useState([])
  const [selectedDate, setSelectedDate] = useState(false)
  useEffect(() => {
    axioss.get('/teachers/datelist')
      .then((res) => setDateList(res.data))
  }, [])

  function handleDateChange(date) {
    const selection = new Date(date?.$d).toLocaleDateString('en-CA').split('/').reverse().join('/')
    let state = false
    dateList.map(data => {
      if (data._id.slice(0, 10) === selection){
        setSelectedDate(selection)
        state = true
        return true
      }
      return false
    });

    if (!state) {
      console.log(selectedDate, selection);
      setSelectedDate(false)
      notify("no attendance found !")
    }
  }

  return (
    <>
      <ToastContainer />
      <Card sx={{ maxWidth: 400,maxHeight:600, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            <div>

              <h3>View Previous</h3>
            </div>
            <div>
              <VisibilityIcon fontSize='large' />
            </div>
          </Typography>
          <Typography sx={{ maxWidth: 300 }} variant="body2">
            click this button to view Previous attendances for students
            <br />
          </Typography>
          {/* <div style={{ marginTop: 100 }}>
          {dateList.map((data) =>
            <div key={data._id} style={{ textAlign: 'center', marginBottom: 10 }}>

              <Link to={`/editAttendance/${data._id}`}><Button sx={{ color: 'white', width: 300, backgroundColor: 'grey' }} variant="contained">{data._id.slice(0, 10)}</Button></Link>

              </div>
          )}
        </div> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar onChange={handleDateChange} />
          </LocalizationProvider>

        </CardContent>
        <CardActions>
          {selectedDate ? (<Button><Link to={`/editAttendance/${selectedDate}`}>
            <ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon></Link></Button>) : ""}
          {/* {selectedDate >= currentdate ? "" :
          (selectedDate ? <Button><Link to={`/editAttendance/${selectedDate}`}>
            <ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon></Link></Button> : "")} */}
        </CardActions>
      </Card>
    </>
  );
} 