import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";

export const PrivateRoutes = ({ children }) => {
    const {user, loading} = useAuth()
    if (loading) {
        return <div>Loading...</div>
    }
    return user ? children : <Navigate to="/" />
}