import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { Button, TextField, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import { askDoubt } from '../../../../../Redux/auth/action'
const notify = (text) => toast(text)
const Header = ({ setOpen, open }) => {
    const { data } = useSelector((store) => store.auth);
    const [doubtData, setDoubtData] = useState({
        id: "",
        title: "",
        description: "",
    })
    const dispatch = useDispatch()
    function handleOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    function handleChange(e) {
        setDoubtData({ ...doubtData, id: data.user._id, [e.target.name]: e.target.value })
    }
    function handleSubmit(data) {
        dispatch(askDoubt(data)).then((data) => data.data.message == 'success' ? notify(data.data.message) : notify("error"))

        setDoubtData({
            id: "",
            title: "",
            description: ""
        })
        setOpen(false)
    }
    return (
        <Box elevation={10} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <ToastContainer />
            <Typography sx={{ fontWeight: 600 }} variant='h4'>Clear your Doubts</Typography>
            <Button sx={{ bgcolor: 'darkblue' }} onClick={handleOpen} variant='contained'>ask?</Button>
            <Modal open={open} onClose={handleSubmit} aria-labelledby="modal-title">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        minWidth: 300,
                        maxWidth: 500,
                    }}
                >
                    <Typography variant="h6" id="modal-title">
                        Title
                    </Typography>
                    <TextField
                        onChange={handleChange}
                        name='title'
                        value={doubtData.title}
                        fullWidth label="Title" variant="outlined" sx={{ mt: 2 }} />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Description
                    </Typography>
                    <TextField
                        onChange={handleChange}
                        name='description'
                        value={doubtData.description}
                        fullWidth label="Description" variant="outlined" multiline rows={4} sx={{ mt: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
                        <Button sx={{ bgcolor: 'darkBlue' }}
                            variant="contained" onClick={handleClose}>
                            Cancel
                        </Button  >
                        <Button sx={{ bgcolor: 'darkBlue' }}
                            variant="contained" onClick={() => handleSubmit(doubtData)}>
                            Ask?
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default Header
