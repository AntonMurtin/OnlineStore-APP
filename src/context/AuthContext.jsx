import { createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";

import { useNotification } from "./NotificationContext";
import { authServiceFactoty } from "../sevices/authService";
import { admin } from "../config/constants/constants";
import {useLocalStorage} from '../hooks/useLocalStorage'

export const AuthContext = createContext();

 export const AuthProvider = ({
    children
}) => {
 const [auth, setAuth] = useLocalStorage('auth', {});

    const authService = authServiceFactoty(auth.accessToken);
    const navigate = useNavigate();
    const dispatch=useNotification();

    const onLogin = async (data) => {
        try {
            const user = await authService.login(data);
            setAuth(user);
        } catch (error) {
            dispatch({
                type: 'ERROR',
                message: error
            });
        };
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
                });
            });
            navigate('/register');
        };
    };

    const onLogout = async () => {
        setAuth({});
        navigate('/');
        dispatch({
            type:'SUCCESS',
            message:'You succsessful leve'
        });
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
    }

    return(
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const  useAuthContext=()=>{
    const context=useContext(AuthContext);

    return context;
};