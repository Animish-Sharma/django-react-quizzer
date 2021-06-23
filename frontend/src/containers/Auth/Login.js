import React,{ useState } from 'react';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Head from '../../components/Header';
import './Login.scss';
import Alert from '../../components/Alert';
const Login = () => {
    const alert = useSelector(state=> state.alert);
    const isAuthenticated = useSelector(state=> state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [form,setForm] = useState({
        username:'',
        password:'',
    });

    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    const { username, password } = form;

    const onChange= e=> setForm({...form,[e.target.name]:e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        try {
            dispatch(login(username,password))
            .then(res=>{
                console.log(res)
                if(res.detail){
                    dispatch(setAlert(res.detail,"error"))
                }else if(res.password || res.username){
                    dispatch(setAlert("Either the username or password field is empty","message"))
                }else{
                    dispatch(setAlert("Successfully logged in","success"))
                }
            })
        } catch (e) {
            console.log(e)
            throw e;
        }
    }
    return (
        <div className="login">
            <Head title="Login" />
            <h1>Login</h1>
            { alert!== null && alert.length > 0 ?
             <div id="message">
                <Alert className="alertMessage" />
            </div> 
            : <p>Log into your account</p>}
            <div>
                <div className="login--image">
                    <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Social_bio_re_0t9u.svg" alt="" />
                </div>
                <form onSubmit={e=>onSubmit(e)} className="login--content">
                    <label htmlFor="username">Username:-</label>
                    <input onChange={e=>onChange(e)} placeholder="Username" type="text" id="username" className="login--content-email" name="username" />
                    <label htmlFor="password">Password:-</label>
                    <input onChange={e=>onChange(e)} placeholder="Password" type="password" id="password" className="login--content-password" name="password" />
                    <button onClick={onSubmit} className="login--content-button">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
