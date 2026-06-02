import { useAuth } from "@/context/AuthContext";   
import { Navigate } from "react-router-dom";

export const Protected = ({children})=>{
    const {currentUser} = useAuth()
    if (!currentUser) {
        return <Navigate to={"/login"}/>
    }
    return children
}