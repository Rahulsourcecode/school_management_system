import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Doubts from './Doubts'
import Sidebar from '../Sidebar'
import Header from './Header'
const notify = (text) => toast(text)
const MainDoubtPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = useState(false)



    return (
        <div className='container'>
            <Sidebar />
            <div className='AfterSideBar'>
                <ToastContainer />
                <Header onIsOpen={setIsOpen} setOpen={setOpen} open={open} />
                <Doubts onNotify={notify} setOpen={setOpen} open={open} />
            </div>
        </div>

    )
}

export default MainDoubtPage
