import { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { authRegister } from '../../services/authService'

import "./Register.css"

export const Register = () => {


    const [registerFormData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        repass: ""
    })

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false,
        repass: false,
        errorFromServer: false
    })


    const navigate = useNavigate();
    const { setUserSession } = useContext(AuthContext)

    const registerHandler = async (e) => {
        e.preventDefault()

        const response = await authRegister(registerFormData)

        if (response?.message) {
            return setErrors({ ...errors, errorFromServer: response.message })
        }

        if (response?._id) {
            setUserSession(response)
            navigate("/")
        }

        setUserSession(response)
        navigate("/")

        setRegisterData({
            username: "",
            email: "",
            password: "",
            repass: ""
        })
    }

    const onErrorHandler = (e) => {
        if (e.target.name === 'email') {
            const mailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
            if (!e.target.value.match(mailRegex)) {
                setErrors(state => ({ ...state, [e.target.name]: true }))
            }
        } else if (e.target.name === 'password' && (e.target.value.length < 3 || e.target.value.length > 15)) {
            setErrors(state => ({ ...state, [e.target.name]: true }))

        } else if (e.target.name === 'username' && (e.target.value.length < 3 || e.target.value.length > 15)) {
            setErrors(state => ({ ...state, [e.target.name]: true }))
        } else if (e.target.name === "repass" && (e.target.value.length < 3 || e.target.value.length > 15)) {
            setErrors(state => ({ ...state, [e.target.name]: true }))
        } else if (e.target.name === "repass" && (registerFormData.password !== e.target.value)) {
            setErrors(state => ({ ...state, [e.target.name]: true }))
        }
    }


    const addRegisterData = (e) => {
        setRegisterData({ ...registerFormData, [e.target.name]: e.target.value })
        setErrors(state => ({ ...state, [e.target.name]: false}));
    }

    return (
        <div className="register-wrapper">
            <h1 className="register-title">Register</h1>
            {errors && (
                < h2 className="error"> {errors.errorFromServer}</h2>
            )}

            <form className="form" onSubmit={registerHandler}>
                <label htmlFor="" className="form-label">Username</label>
                <input
                    type="text"
                    className="username"
                    name="username"
                    placeholder="Username"
                    value={registerFormData.username}
                    onChange={addRegisterData}
                    onBlur={onErrorHandler}
                />

                {errors.username && (
                    <p className='error-message'>
                        Username must be between 3 and 15 characters!
                    </p>
                )}

                <label htmlFor="" className="form-label">E-mail</label>
                <input type="text"
                    className="email"
                    name="email"
                    placeholder="E-mail"
                    value={registerFormData.email}
                    onChange={addRegisterData}
                    onBlur={onErrorHandler}
                />

                {errors.email && (
                    <p className='error-message'>
                        Email is invalid!
                    </p>
                )}

                <label htmlFor="" className="form-label">Password</label>
                <input
                    type="password"
                    className="password"
                    name="password"
                    placeholder="Enter your password"
                    value={registerFormData.password}
                    onChange={addRegisterData}
                    onBlur={onErrorHandler}

                />
                {errors.password && (
                    <p className='error-message'>
                        Password must be between 3 and 15 characters!
                    </p>
                )}


                <label htmlFor="" className="form-label">Repeat Password</label>
                <input
                    type="password"
                    className="repass"
                    name="repass"
                    placeholder="Repeat your Password"
                    value={registerFormData.repass}
                    onChange={addRegisterData}
                    onBlur={onErrorHandler}
                />
                   {errors.repass && (
                    <p className='error-message'>
                       Passwords do not match!
                    </p>
                )}

                <input type="submit" className="login-sbt" value="Register" />
            </form>
            <div className="redirect">
                <p>Already have an Account? <Link className='login-link' to="/login">Login</Link></p>
            </div>
        </div >
    )
}