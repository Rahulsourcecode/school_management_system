import React from 'react'
import MarkAttendanceOption from './pages/MarkAttendanceOption'
import ViewAttendanceOption from './pages/ViewAttendanceOption'
import Sidebar from '../../GlobalFiles/Sidebar'
import { Grid } from '@mui/material'
const ChooseAttendance = () => {
  return (
    <Grid container>
      <Grid  item xs={2} sm={2} md={2} lg={2} position={'sticky'} >
        <Sidebar />
        </Grid>
        <Grid item xs={9} sm={9}  md={9} lg={9}>
          <h2 style={{ marginBottom: 20 }}>Choose your option</h2>
          <Grid container sx={{display:'flex',justifyContent:'space-around' ,maxHeight:'200'}}>
            <Grid item   md={9} lg={6}>
            <MarkAttendanceOption />
            </Grid>
            <Grid item  md={9} lg={6}>
            <ViewAttendanceOption />
            </Grid>
          </Grid>
          </Grid>
    </Grid>
  )
}

export default ChooseAttendance;
