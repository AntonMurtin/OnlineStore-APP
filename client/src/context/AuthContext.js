import { useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage";
import { authServiceFactoty } from "../sevices/authService";
import { useNavigate } from "react-router-dom";


const AuthContext = useContext();

const AuthProvider = ({
    children
}) => {

    const [auth, setAuth] = useLocalStorage('auth', {});

    const authService = authServiceFactoty();
    const navigate = useNavigate()

    const onLoginSubmit = async (data) => {
        //to do 

        try {
            const user = await authService.login(data);
            setAuth(user);
            navigate('/');
        } catch (error) {

        }
    };




    const contextValues={
        onLoginSubmit,
    }

    return(
        <AuthContext.AuthProvider>
            {children}
        </AuthContext.AuthProvider>
    )
}

export const  useAuthContext=()=>{
    const context=useContext(AuthContext);
    return context;
}