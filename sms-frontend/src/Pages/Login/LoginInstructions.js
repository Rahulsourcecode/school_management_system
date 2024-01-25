import { Typography } from '@mui/material'
import React from 'react'
import './LoginInstructions.scss'
import { Grid } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const LoginInstructions = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="maininstruction">
                <div className="box">
                    <Typography variant='h5' fontWeight={'bold'}>Login instructions</Typography>
                    <Typography variant='h7' fontWeight={'medium'}>please note: This is an internal management application so a person from outside cannot create an account, sample users listed below</Typography>

                    <Grid container>
                        <Grid item xs={12} mb={3}>
                            <Typography variant='h6'>Admin Credentials</Typography>
                            <Typography>id:  1687757848546</Typography>
                            <Typography>password:  Rahul@831</Typography>
                            <Typography>(note that admin can add new staffs and students and the id will be created automatically and it will be send along with the password to the registering individuals email id )</Typography>
                        </Grid>
                        <Grid item xs={12} mb={3}>
                        <Typography variant='h6'>Staff Credentials</Typography>
                            <Typography>id:  1689504354955</Typography>
                            <Typography>password:  teacher@2</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography variant='h6'>Student credentials</Typography>
                            <Typography>id:  1687957739822</Typography>
                            <Typography>password:  student@22</Typography>
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                            <button class="button" onClick={()=>navigate("/")}>Go back to login</button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default LoginInstructions