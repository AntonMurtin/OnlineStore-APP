import './forms.css';

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useForm } from '../../../hooks/useForm';
import { useAuthContext } from '../../../context/AuthContext';

import { errorMessage, inputValidtion } from '../../../config/constants/constants';
import { initialFocusregister, initialValuesRegister, } from '../../../config/constants/register'

const Register = () => {

    const initialValues = initialValuesRegister;
    const initialFocs = initialFocusregister;

    const { onRegister } = useAuthContext();
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    const { values, focus, changeHandler, onSubmit, changeFocus } = useForm(
        initialValues,
        initialFocs,
        onRegister)

    return (
        <div className='registerPage'>
            <form method='POST' className="registerForm" onSubmit={onSubmit}>
                <h3 className='registerTop'> Create an Account</h3>

                <div className='formDiv'>
                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.name.toString()}
                        pattern={inputValidtion.name}
                        type="text"
                        name='name'
                        placeholder="First Name"
                        value={values.name}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.name}</span>
                </div>

                <div className='formDiv'>
                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.lastname.toString()}
                        pattern={inputValidtion.name}
                        type="text"
                        name='lastname'
                        placeholder="Last Name"
                        value={values.lastname}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.lastname}</span>
                </div>

                <div className='formDiv'>
                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.email.toString()}
                        type="email"
                        name='email'
                        placeholder="Email"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.email}</span>
                </div>

                <div className='formDiv'>
                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.phone.toString()}
                        pattern={inputValidtion.phone}
                        type="text"
                        name='phone'
                        placeholder="Phone"
                        value={values.phone}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.phone}</span>
                </div>

                <div className='formDiv'>
                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.town.toString()}
                        pattern={inputValidtion.town}
                        type="text"
                        name='town'
                        placeholder="Town"
                        value={values.town}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.town}</span>
                </div>

                <div className='formDiv'>
                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.street.toString()}
                        pattern={inputValidtion.street}
                        type="text"
                        name='street'
                        placeholder="Street"
                        value={values.street}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.street}</span>
                </div>

                <div className='formDiv'>
                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.password.toString()}
                        pattern={inputValidtion.password}
                        type="password"
                        name='password'
                        placeholder="Password"
                        value={values.password}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.password}</span>
                </div>

                <div className='formDiv'>
                    <input
                        required
                        onBlur={changeFocus}
                        focused={focus.confirmPassword.toString()}
                        pattern={values.password}
                        type="password"
                        name='confirmPassword'
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={changeHandler}
                    />
                    <span>{errorMessage.confirmPassword}</span>
                </div>
                <button className='btn-log-reg'>Create</button>
            </form>
        </div>
    );
};

export default Register;