import { useAuth } from "@/hooks/useAuth";
import { Navigate, type To } from "react-router";

export const PrivateRoutes = ({ children, route }: { children: React.ReactNode, route: string }) => {
    const { user, loading } = useAuth()
    console.log(user)
    if (loading) {
        return <div>Loading...</div>
    }
    return user ? children : <Navigate to={route} />
}