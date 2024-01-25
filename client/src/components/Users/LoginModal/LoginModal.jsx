import './LoginModal.css'

import { Link, } from 'react-router-dom'
import { errorMessageInput, initialFocusLogin, initialValuesLogin, inputValidtion } from '../../../config/constants'
import { useForm } from '../../../hooks/useForm'
import { useAuthContext } from '../../../context/AuthContext'

export const LoginModal = ({
    onOpen,
    onClose,
}) => {
    if (!onOpen) return null;
    const {onLogin}=useAuthContext()
    const onLoginSubmit = (values) => {
        onClose();
        onLogin(values);
    }

    const initialValues = initialValuesLogin;
    const initialFocs = initialFocusLogin;
    const errorMessage = errorMessageInput;
    const { values, focus, onSubmit, changeHandler, changeFocus } = useForm(
        initialValues,
        initialFocs,
        onLoginSubmit)

 
    return (
        <div className='login__Modal'>

            <form
                method='POST'
                onSubmit={onSubmit}
                className='login_form'>
                <p onClick={onClose} className="closeLogin">X</p>
                <h2 className='loginTop'> Welcome</h2>

                <div className='loginDiv'>
                    <input className='loginDiv'
                        required
                        onBlur={changeFocus}
                        focused={focus.email.toString()}
                        type={inputValidtion.email}
                        name='email'
                        placeholder="Email"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <span >{errorMessage.username}</span>
                </div >

                <div className='loginDiv'>
                    <input className='loginDiv'
                        required
                        onBlur={changeFocus}
                        focused={focus.password.toString()}
                        pattern={inputValidtion.password}
                        type="Password"
                        placeholder="Password"
                        name='password'
                        value={values.password}
                        onChange={changeHandler}
                    />
                    <span >{errorMessage.password}</span>
                </div>

                <p onClick={onClose} className="message">
                    Not registered? <Link to="/register">Create an account.</Link>
                </p>
                <button  className='btnLog'>Log In</button>

            </form>
        </div>
    )
}

