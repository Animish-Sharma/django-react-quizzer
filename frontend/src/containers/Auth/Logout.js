import React from 'react'
import { Link,Redirect } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { useDispatch,useSelector } from 'react-redux';
import './Logout.scss';
import Head from '../../components/Header';
const Logout = () => {
    const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
    }
    if(!isAuthenticated){
        return <Redirect to="/"/>
    }
    return (
        
        <div className="logout">
            <Head title="Logout" />
            <h1>Logout ? </h1>
            <div className="logout--content">
                <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Questions_re_1fy7.svg" alt="" />
                <h2>Are you sure you want to log out?</h2>
                <div className="logout--content-links">
                    <button onClick={()=>onLogout()}>Logout</button>
                    <Link to="/">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Logout
