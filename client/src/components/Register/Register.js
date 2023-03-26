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
        username: "",
        email: "",
        password: "",
        repass: "",
        serverError: ''
    })


    const navigate = useNavigate();
    const { setUserSession } = useContext(AuthContext)

    const registerHandler = async (e) => {
        e.preventDefault()

        const response = await authRegister(registerFormData)

        if (response?.message) {
            return setErrors({ ...errors, serverError: response.message })
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


    const addRegisterData = (e) => {
        setRegisterData({ ...registerFormData, [e.target.name]: e.target.value })
    }

    return (
        <div className="register-wrapper">
            <h1 className="register-title">Register</h1>
            {errors && (
                < h2 className="error"> {errors.serverError}</h2>
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
                />

                <label htmlFor="" className="form-label">E-mail</label>
                <input type="text"
                    className="email"
                    name="email"
                    placeholder="E-mail"
                    value={registerFormData.email}
                    onChange={addRegisterData}
                />

                <label htmlFor="" className="form-label">Password</label>
                <input
                    type="password"
                    className="password"
                    name="password"
                    placeholder="Enter your password"
                    value={registerFormData.password}
                    onChange={addRegisterData}
                />

                <label htmlFor="" className="form-label">Repeat Password</label>
                <input
                    type="password"
                    className="repass"
                    name="repass"
                    placeholder="Repeat your Password"
                    value={registerFormData.repass}
                    onChange={addRegisterData}
                />

                <input type="submit" className="login-sbt" value="Register" />
            </form>
            <div className="redirect">
                <p>Already have an Account? <Link className='login-link' to="/login">Login</Link></p>
            </div>
        </div >
    )
}