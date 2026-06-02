/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useAuth } from "./AuthContext"

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const { currentUser } = useAuth()

    useEffect(() => {
        if(!currentUser) return
        
        const newSocket = io(import.meta.env.VITE_API_URL, {
    withCredentials: true
})
        
        newSocket.on("connect", () => {
            setSocket(newSocket)
        })
        
        return () => {
            newSocket.disconnect()
        }
    }, [currentUser])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)