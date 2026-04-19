import SocketIoClient from 'socket.io-client'
import React, {  createContext } from 'react'

const WS_Server = "http://localhost:5500"

export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server); // creating connection from react server to node server


interface Props {
    children: React.ReactNode
}

export const SocketProvider :React.FC<Props> = ({children})=>{
    return (
        <SocketContext.Provider value={{socket}}>
        {children}
        </SocketContext.Provider>
    )
}