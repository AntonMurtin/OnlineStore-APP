import React from 'react'
import './Register.css';
import { useForm } from '../../hooks/useForm'

export const Register = () => {
    const onRegisterSubmit = (values) => {
        console.log(values);
    }
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: ''
    }, onRegisterSubmit)

    return (
        <div className='user-page'>



            <form method='POST' className='register__form' onSubmit={onSubmit}>

                <h3 className='registerTop'> Register Here</h3>

                <label htmlFor="email"></label>
                <input
                    type="text"
                    name='email'
                    placeholder="Email"
                    id="email"
                    value={values.email}
                    onChange={changeHandler}
                />

                <label htmlFor="username"></label>
                <input
                    type="text"
                    name="username"
                    placeholder="User name"
                    value={values.username}
                    onChange={changeHandler}
                />


                <label htmlFor="password"></label>
                <input
                    type="password"
                    name='password'
                    placeholder="Password"
                    value={values.password}
                    onChange={changeHandler}
                />

                <label htmlFor="confirmPassword"></label>
                <input
                    type="password"
                    name='confirmPassword'
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={changeHandler}
                />

                <label htmlFor="Name"></label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.Name}
                    onChange={changeHandler}
                />

                <label htmlFor="lastName"></label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    id="lastName"
                    value={values.lastName}
                    onChange={changeHandler}
                />

                <label htmlFor="lastName"></label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    id="lastName"
                    value={values.lastName}
                    onChange={changeHandler}
                />

                <label htmlFor="Name"></label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.Name}
                    onChange={changeHandler}
                />

                <label htmlFor="lastName"></label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    id="lastName"
                    value={values.lastName}
                    onChange={changeHandler}
                />

                <label htmlFor="lastName"></label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    id="lastName"
                    value={values.lastName}
                    onChange={changeHandler}
                />

                <button className='btn-log-reg'>Register</button>


            </form>


        </div>
    )
}
