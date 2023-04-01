import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import { useContext } from "react"

import { AuthContext } from "../../context/AuthContext"
import { authLogin } from "../../services/authService"

export const Login = () => {

    const [loginFormData, setLoginData] = useState({
        email: '',
        password: ""
    })

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        errorFromServer: false,
    })

    const { setUserSession } = useContext(AuthContext)
    const navigate = useNavigate()

    const loginHandler = async (e) => {
        e.preventDefault()
        const response = await authLogin(loginFormData);

        if (response?.message) {
            return setErrors({ ...errors, errorFromServer: response.message })
        }

        if (response?._id) {
            setUserSession(response)
            navigate('/')
        }
        setUserSession(response)

        setLoginData({
            email: "",
            password: ""
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

        }
    }


    const loginData = (e) => {
        setLoginData({ ...loginFormData, [e.target.name]: e.target.value })
        setErrors(state => ({ ...state, [e.target.name]: false }));
    }

    return (
        <div className="login-wrapper">
            <h1 className="login-title">Login</h1>
            {errors && (
                <h2 className="error">{errors.errorFromServer}</h2>
            )}
            <form className="form" onSubmit={loginHandler}>
                <label htmlFor="" className="form-label">E-mail</label>
                <input
                    type="text"
                    className="email"
                    name="email"
                    placeholder="E-mail"
                    value={loginFormData.email}
                    onChange={loginData}
                    onBlur={onErrorHandler} />

                {errors.email && (
                    <p className='error-message'>
                        Invalid E-mail
                    </p>
                )}

                <label htmlFor="" className="form-label">Password</label>
                <input
                    type="password"
                    className="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginFormData.password}
                    onChange={loginData}
                    onBlur={onErrorHandler} />

                {errors.password && (
                    <p className='error-message'>
                        Password must be between 3 and 15 characters!
                    </p>
                )}

                <input type="submit" className="login-sbt" value="Login" />
            </form>
            <div className="redirect">
                <p>Do not have an account? <Link className='register-link' to="/register">Register</Link></p>
            </div>
        </div>
    )
}
