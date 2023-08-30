import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import { host } from '../../../../utils/APIRoutes'
import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import { useSelector } from "react-redux";
import { getContacts } from "../../../../Redux/auth/action";
import Sidebar from "../../Common/layouts/Sidebar";
import { Grid } from "@mui/material";

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
            <Grid container spacing={11}>
                <Grid item  xs={2} sm={2} md={2} lg={1}>
                <Sidebar />
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={10} sx={{ mt: 2}}>

                <Containers >
                    <div className="contain">
                        {contacts && <Contacts contacts={contacts} changeChat={handleChatChange} />}
                        {currentChat === undefined ? (
                            <Welcome userName={currentUser?.name} />
                        ) : (
                            <ChatContainer currentChat={currentChat} socket={socket} />
                        )}
                    </div>
                </Containers>
                </Grid>

            </Grid>
        </>
    );
}

const Containers = styled.div`
  display: flex;
  box-shadow: 5px 5px 5px 8px lightblue;
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