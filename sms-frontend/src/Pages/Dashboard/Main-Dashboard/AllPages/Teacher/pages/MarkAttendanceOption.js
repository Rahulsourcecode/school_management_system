import * as React from 'react';
import {Link} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Calander from './Calander';


export default function MarkAttendanceOption() {
  return (
    <Card sx={{ maxWidth: 330,maxHeight:600 ,borderRadius:3}}>
      <CardContent>
        <Typography variant="h5" component="div">
            <div>
            <h3>Todays attendance</h3>
            </div>
            <div>
            <AssignmentTurnedInIcon fontSize='large'/>
            </div>
        </Typography>
        <Typography sx={{maxWidth:300}} variant="body2">
          click this button to mark todays attendance for students
          <br />
        </Typography>
        <Calander/>
      </CardContent>
      <CardActions>
        <Button ><Link to={"/markAttendance"}><ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon></Link></Button>
      </CardActions>
    </Card>
  );
}