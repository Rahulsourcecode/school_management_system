import * as React from 'react';
import { Link } from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react'
import { axioss } from "../../../../../../Redux/auth/action";

export default function ViewAttendanceOption() {
  const [dateList, setDateList] = useState([])
  console.log(dateList)
  useEffect(() => {
    axioss.get('/teachers/datelist')
      .then((res) => setDateList(res.data))
  }, [])
  return (
    <Card sx={{ maxWidth: 500, borderRadius: 3 }}>
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
        <div style={{ marginTop: 100 }}>
          {dateList.map((data) =>
            <div key={data._id} style={{ textAlign: 'center', marginBottom: 10 }}>

              <Link to={`/editAttendance/${data._id}`}><Button sx={{ color: 'white', width: 300, backgroundColor: 'grey' }} variant="contained">{data._id.slice(0, 10)}</Button></Link>

            </div>
          )}
        </div>
      </CardContent>
      <CardActions>
        <Button ><Link to={"/markAttendance"}><ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon></Link></Button>
      </CardActions>
    </Card>
  );
} 