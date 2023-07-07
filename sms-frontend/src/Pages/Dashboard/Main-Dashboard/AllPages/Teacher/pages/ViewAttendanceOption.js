import * as React from 'react';
import {Link} from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ViewAttendanceOption() {
  return (
    <Card sx={{ maxWidth: 500 ,borderRadius:3}}>
      <CardContent>
        <Typography variant="h5" component="div">
            <div>
            <h3>View Previous</h3>
            </div>
            <div>
            <VisibilityIcon fontSize='large'/>
            </div>
        </Typography>
        <Typography sx={{maxWidth:300}} variant="body2">
          click this button to view Previous attendances for students
          <br />
        </Typography>
      </CardContent>
      <CardActions>
      <Button ><Link to={"/markAttendance"}><ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon></Link></Button>
      </CardActions>
    </Card>
  );
}