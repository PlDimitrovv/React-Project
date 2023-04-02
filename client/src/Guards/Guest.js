import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"



export const Guest = () => {
    const { user } = useContext(AuthContext)
    if (!user?._id) {
        return <Navigate to='/login' />
    }
    return <Outlet />
}

