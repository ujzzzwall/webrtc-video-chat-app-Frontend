import SocketIoClient from 'socket.io-client'
import React, {  createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import {v4 as UUIDv4 } from 'uuid';

const WS_Server = "http://localhost:5500"

export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server); // creating connection from react server to node server


interface Props {
    children: React.ReactNode
}

export const SocketProvider :React.FC<Props> = ({children})=>{

    const navigate = useNavigate() //help to programatically handle navigation

    const [user, setUser] = useState<Peer>(); // new peer user

    //fn to consume the dummmy logging 
    const fetchParticipantsList = ({roomId , participants} : {roomId:string , participants:string[]} )=>{
        console.log("Fetched room participants");
        console.log(roomId,participants)
    }

    useEffect(()=>{
        const userId = UUIDv4();
        const newPeer = new Peer(userId);

        setUser(newPeer);

        const enterRoom = ({roomId} : {roomId: string})=>{
            navigate(`/room/${roomId}`);
        }

        //we will redirected to the new page when we collect an event of room-created from server
        socket.on("room-created",enterRoom);

        socket.on("get-users", fetchParticipantsList)
    },[])


    return (
        <SocketContext.Provider value={{socket , user }}>
        {children}
        </SocketContext.Provider>
    )
}