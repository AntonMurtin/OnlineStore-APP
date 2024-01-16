import { createContext, useContext } from "react"

import { authServiceFactoty } from "../sevices/authService";
import { useNavigate } from "react-router-dom";
import { admin } from "../config/constants";
import {useLocalStorage} from '../hooks/useLocalStorage'


export const AuthContext = createContext();

 export const AuthProvider = ({
    children
}) => {
 const [auth, setAuth] = useLocalStorage('auth', {});

    const authService = authServiceFactoty(auth.accessToken);
    const navigate = useNavigate()

    const onLogin = async (data) => {

        try {
            const user = await authService.login(data);
            setAuth(user);
            
        } catch (error) {
            console.log(error.message);
        }
    };

    const onRegister=async(data)=>{
        console.log(data);
        try {
            const user=await authService.register(data);
            setAuth(user);
            navigate('/');
            
        } catch (error) {
            console.log(error.message);
        }
    }
    const onLogout = async () => {
        // dispatch({
        //     type: 'SUCCESS',
        //     message: 'You have successfully signed out.',
        // })

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