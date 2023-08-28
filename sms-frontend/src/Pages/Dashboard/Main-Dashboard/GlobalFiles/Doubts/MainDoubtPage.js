import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Doubts from './Doubts'
import Sidebar from '../Sidebar'
import Header from './Header'
import { Grid } from '@mui/material'
const notify = (text) => toast(text)
const MainDoubtPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = useState(false)



    return (
        <Grid container>
            <ToastContainer />
            <Grid item xs={3} lg={2} md={3} position={'sticky'}>
                <Sidebar />
            </Grid>
            <Grid item xs={9} sm={9} lg={9} md={9}>
                <Grid container>
                        <Header onIsOpen={setIsOpen} setOpen={setOpen} open={open} />
                    <Grid>
                        <Doubts onNotify={notify} setOpen={setOpen} open={open} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default MainDoubtPage
