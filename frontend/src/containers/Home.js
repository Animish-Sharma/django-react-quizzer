import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import Head from '../components/Header';
import './Home.scss';
const Home = () => {
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
    const user = useSelector(state=>state.auth.user)
    const alert = useSelector(state=> state.alert);
    const guest = (
        <div className="home--guest">
            <h1>Welcome User</h1>
            <p>This is a Quiz WebApp where you can participate in quizzes
                .It is a responsive website which means it will adjust it self accoding 
                to the size of your device.To participate in these quizzes, first you have to login,
                 if you have an account if not then you have to register</p>
            <div className="home--guest-links">
                <Link className="home--guest-links-login" to="/login">Login</Link>
                <Link className="home--guest-links-register" to="/register">Register</Link>
            </div>
        </div>
    )
    const auth=(
        <div className='home--auth'>
            <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Mobile_application_mr4r.svg" alt="" />
            <h1>Welcome, {user ? user.first_name: null} {user ? user.last_name : null}</h1>
            <p>You have now logged into your account and now you can participate in the quizzes.The links are below.</p>
            <div className='home--auth-links'>
                <Link className="home--auth-links-test" to="/tests">Tests</Link>
                <Link className="home--auth-links-profile" to="/profile">Profile</Link>
            </div>
        </div>
    )
    return (
        <div className="home">
            <Head title="Home Page"/>
            <div className="message">
                <Alert className="alertMessage"/>
            </div>
            { isAuthenticated ? auth : guest }
            <h5>Made By Animish Sharma</h5>
        </div>
    )
}

export default Home
