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
    const [errors, setErrors] = useState('')

    const { setUserSession } = useContext(AuthContext)
    const navigate = useNavigate()

    const loginHandler = async (e) => {
        e.preventDefault()
        const response = await authLogin(loginFormData);

        if(response.message){
            return setErrors(response.message)
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

        //Error Handling
    }


    const loginData = (e) => {
        setLoginData({ ...loginFormData, [e.target.name]: e.target.value })
    }

    return (
        <div className="login-wrapper">
            <h1 className="login-title">Login</h1>
            {errors && (
                <h2 className="error">{errors}</h2>
            )}
            <form className="form" onSubmit={loginHandler}>
                <label htmlFor="" className="form-label">E-mail</label>
                <input
                    type="text"
                    className="email"
                    name="email"
                    placeholder="E-mail"
                    value={loginFormData.email}
                    onChange={loginData} />

                <label htmlFor="" className="form-label">Password</label>
                <input
                    type="password"
                    className="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginFormData.password}
                    onChange={loginData} />

                <input type="submit" className="login-sbt" value="Login" />
            </form>
            <div className="redirect">
                <p>Do not have an account? <Link className='register-link' to="/register">Register</Link></p>
            </div>
        </div>
    )
}