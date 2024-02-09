import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";


export const AdmiGuard=({
    children,
})=>{
    const { isAdmin } = useAuthContext();
    
    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children ? children : <Outlet />
};

