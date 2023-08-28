import React from 'react'
import MarkAttendanceOption from './pages/MarkAttendanceOption'
import ViewAttendanceOption from './pages/ViewAttendanceOption'
import Sidebar from '../../GlobalFiles/Sidebar'
import { Grid } from '@mui/material'
const ChooseAttendance = () => {
  return (
    <Grid container spacing={5} >
      <Grid item xs={2} sm={2} md={2} lg={1}>
        <Sidebar />
      </Grid>
      <Grid item xs={9} sm={9} md={9} lg={10} sx={{ mt: 5 ,pr:5}}>
        <h2 style={{ marginBottom: 20 }}>Choose your option</h2>
        <Grid container >
          <Grid item md={6} lg={6}>
            <MarkAttendanceOption />
          </Grid>
          <Grid item md={6} lg={6}>
            <ViewAttendanceOption />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChooseAttendance;
