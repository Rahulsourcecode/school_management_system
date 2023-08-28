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
        <>
            <ToastContainer />
            <Grid container spacing={10}>
                <Grid item xs={2} sm={2} md={2} lg={1}>
                    <Sidebar />
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={10} sx={{ mt: 2 }}>
                    <Grid container>
                        <Header onIsOpen={setIsOpen} setOpen={setOpen} open={open} />
                        <Grid>
                            <Doubts onNotify={notify} setOpen={setOpen} open={open} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>

    )
}

export default MainDoubtPage
