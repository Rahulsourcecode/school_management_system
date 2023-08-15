import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import { host } from '../../../../../utils/APIRoutes'
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import { useSelector } from "react-redux";
import { getContacts } from "../../../../../Redux/auth/action";
import Sidebar from "../Sidebar";

export default function Chat() {

    const currentUser = useSelector((store) => store.auth.data.user);
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);

    useEffect(() => {

        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
            getContacts(currentUser.userType)().then((res) => setContacts(res))

        }
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <>
          <div className="container">
                <Sidebar />
                <div className="AfterSideBar">
                    <Containers>
                        <div className="contain">
                            {contacts && <Contacts contacts={contacts} changeChat={handleChatChange} />}
                            {currentChat === undefined ? (
                                <Welcome userName={currentUser?.name} />
                            ) : (
                                <ChatContainer currentChat={currentChat} socket={socket} />
                            )}
                        </div>
                    </Containers>
                </div>
            </div >
        </>
    );
}

const Containers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center; 
  border-width: 1px;
  .contain {
    height: 85vh;
    width: 85vw;
    background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;