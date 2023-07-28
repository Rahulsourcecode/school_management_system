import React, { useState } from 'react'
import Doubts from './Doubts'
import Sidebar from '../Sidebar'
import Header from './Header'

const MainDoubtPage = () => {
    const [isOpen,setIsOpen] = useState(false)
    return (
        <div className='container'>
                <Sidebar />
            <div className='AfterSideBar'>
                <Header onIsOpen={setIsOpen}/>
                <Doubts />
            </div>
        </div>

    )
}

export default MainDoubtPage
