import { createContext, useContext, useState } from "react"

import { authServiceFactoty } from "../sevices/authService";
import { useNavigate } from "react-router-dom";
import { admin } from "../config/constants";
import {useLocalStorage} from '../hooks/useLocalStorage'
import { useNotification } from "./NotificationContext";


export const AuthContext = createContext();

 export const AuthProvider = ({
    children
}) => {
    const [error,setEroor]=useState(false)
 const [auth, setAuth] = useLocalStorage('auth', {});

    const authService = authServiceFactoty(auth.accessToken);
    const navigate = useNavigate();
    const dispatch=useNotification();

    const onLogin = async (data) => {

        try {
            
            const user = await authService.login(data);
            setAuth(user);
            setEroor(false)
            
        } catch (error) {
            setEroor(true)
            error.message.map(x => {
                dispatch({
                    type: 'ERROR',
                    message: x,
                })
            })
        }
    };

    const onRegister=async(data)=>{
        try {
            const user=await authService.register(data);
            setAuth(user);
            navigate('/');
            
        } catch (error) {
            error.message.map(x => {
                dispatch({
                    type: 'ERROR',
                    message: x,
                })
            })
            navigate('/register');
        }
    }
    const onLogout = async () => {

        setAuth({});
        navigate('/');
    };


    const contextValues={
        onLogin,
        onRegister,
        onLogout,
        username: auth.username,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
        isAdmin: admin === auth.email,
        error,
    }

    return(
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    )
}

export const  useAuthContext=()=>{
    const context=useContext(AuthContext);

    return context;
}