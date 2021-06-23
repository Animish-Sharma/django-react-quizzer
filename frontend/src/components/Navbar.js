import React, { Fragment } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
const Navbar = () => {
    const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)
    const user = useSelector(state=> state.auth.user)
    const guestLinks = (
        <div className="nav--guest-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
    const authLinks = (
        <div className="nav--auth-links">
            <Link to="/logout">Logout</Link>
            <Link className="user-link" to="/profile">{user ? user.first_name :null} {user ? user.last_name : null}</Link>
        </div>
    )
    return (
        <div className="nav">
            <Link to="/" className="nav--header">Quizzer</Link>
            {!isAuthenticated ? guestLinks : authLinks}
        </div>
    )
}

export default Navbar
