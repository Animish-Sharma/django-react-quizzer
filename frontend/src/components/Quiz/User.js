import React from 'react';
import "./User.scss";
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
const User = () => {
    const user = useSelector(state=> state.auth.user)
    return (
        <div className="user">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <h1>Your Profile</h1>
            <div className="user--content">
                <div className="user--content-image">
                    <img src={`http://localhost:8000${user.image}`} alt="" />
                </div>
                <div className="user--content-table">
                    <table>
                        <tbody>

                        <tr>
                            <th>First Name</th>
                            <th>{user.first_name}</th>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{user.last_name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <td>Unique ID</td>
                            <td>{user.slug}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default User
