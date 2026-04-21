import SocketIoClient from 'socket.io-client'
import React, {  createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const WS_Server = "http://localhost:5500"

export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server); // creating connection from react server to node server


interface Props {
    children: React.ReactNode
}

export const SocketProvider :React.FC<Props> = ({children})=>{

    const navigate = useNavigate() //help to programatically handle navigation

    useEffect(()=>{

        const enterRoom = ({roomId} : {roomId: string})=>{
            navigate(`/room/${roomId}`);
        }

        //we will redirected to the new page when we collect an event of room-created from server
        socket.on("room-created",enterRoom);
    },[])


    return (
        <SocketContext.Provider value={{socket}}>
        {children}
        </SocketContext.Provider>
    )
}