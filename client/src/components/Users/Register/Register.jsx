import React from 'react'
import './Register.css';
import { useForm } from '../../../hooks/useForm'

export const Register = () => {
    const onRegisterSubmit = (values) => {
        console.log(values);
    }
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: ''
    }, onRegisterSubmit)

    return (
        <div className='registerPage'>



            <form method='POST' className="registerForm" onSubmit={onSubmit}>

                <h3 className='registerTop'> Create an Account</h3>

                <div className='registerDiv'>
                    <input
                        type="text"
                        name='username'
                        placeholder="Uername"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <p> "Username shoud be 6-15 characters and  include at least 1 letter, 1 number and 1 special characters!"</p>
                </div>

                <div className='registerDiv'>
                    <input
                        type="text"
                        name='name'
                        placeholder="Name"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <p>dshfoisdhfoijds</p>
                </div>

                <div className='registerDiv'>
                    <input
                        type="email"
                        name='email'
                        placeholder="Email"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <p>dshfoisdhfoijds</p>
                </div>

                <div className='registerDiv'>
                    <input
                        type="text"
                        name='lastname'
                        placeholder="Last Name"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <p>dshfoisdhfoijds</p>
                </div>

                <div className='registerDiv'>
                    <input
                        type="password"
                        name='password'
                        placeholder="Password"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <p>dshfoisdhfoijds</p>
                </div>

                <div className='registerDiv'>
                    <input
                        type="text"
                        name='area'
                        placeholder="Area"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <p>dshfoisdhfoijds</p>
                </div>

                <div className='registerDiv'>
                    <input
                        type="password"
                        name='confirmPassword'
                        placeholder="Confirm Password"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <p>dshfoisdhfoijds</p>
                </div>

                <div className='registerDiv'>
                    <input
                        type="text"
                        name='town'
                        placeholder="Town"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <p>dshfoisdhfoijds</p>
                </div>

                <div className='registerDiv'>
                    <input
                        type="text"
                        name='phone'
                        placeholder="Phone"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <p>dshfoisdhfoijds</p>
                </div>

                <div className='registerDiv'>
                    <input
                        type="text"
                        name='address'
                        placeholder="Address"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <p>dshfoisdhfoijds</p>
                </div>
               
                
                
                <button className='btn-log-reg'>Create</button>


            </form>


        </div>
    )
}
