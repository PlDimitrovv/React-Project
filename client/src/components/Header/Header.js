import './Header.css';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export const Header = () => {

    const { user } = useContext(AuthContext)
    const isAuthenticated = user?._id ? true : false

    return (
        <div>
            <header className="header">
                <div className="nav-container">
                    <nav className="nav">
                        <h1 className='nav-title'>Cook<span>erie</span></h1>
                        <ul className="nav-links">
                            <li className="item">
                                <Link className='link' to="/">Home</Link>
                            </li>
                            <li className="item">
                                <Link className='link' to="/catalog">Catalog</Link>
                            </li>

                            {isAuthenticated && (
                                <>
                                    <li className="item">
                                        <Link className='link' to="/create">Add Recipe</Link>
                                    </li>

                                    <li className="item">
                                        <Link className='link' to="/profile">Profile</Link>
                                    </li>
                                    
                                    <li className="item">
                                        <Link className='link' to="/logout">Logout</Link>
                                    </li>
                                </>

                            )}

                            {!isAuthenticated && (
                                <>
                                    <li className="item">
                                        <Link className='link' to="/login">Login</Link>
                                    </li>
                                    <li className="item">
                                        <Link className='link' to="/register">Register</Link>
                                    </li>
                                </>
                            )}

                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}