import React,{ useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom'
import Alert from '../../components/Alert';
import Head from '../../components/Header';
import "./Register.scss";
const Register = () => {
    const alert = useSelector(state=> state.alert)
    const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const [data,setData] = useState({
        first_name:'',
        last_name:'',
        username:'',
        email:'',
        password1:'',
        password2:''
    });
    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    const { first_name, last_name, username, email, password1, password2} = data;
    const onChange= e=> setData({...data,[e.target.name]:e.target.value});

    const onSubmit= e=>{
        e.preventDefault();
        dispatch(register(first_name, last_name, username, email, password1, password2))
        .then(res=>{
            if(res.status === 500){
                dispatch(setAlert(res.statusText,"error"))
            }else{
                setAlert("Successfully registered","success")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="register">
            <Head title="Register"/>
            <h1>Register</h1>
            { alert !== null && alert.length > 0 ?
            <div>
                <Alert className="alertMessage"/>
            </div>
            :<p>Create your own account</p>    
        }
            <div className="register--content">
                <div className="register--content-image">
                    <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Terms_re_6ak4.svg" alt="" />
                </div>
                <form onSubmit={e=>onSubmit(e)} className="register--content-fields">
                    <label htmlFor="first_name">First Name:- </label>
                    <input onChange={e=>onChange(e)} type="text" name="first_name" placeholder="First Name" id="first_name" className="register--content-fields-name-first-name"/>
                    
                    <label htmlFor="last_name">Last Name:- </label>
                    <input onChange={e=>onChange(e)} type="text" name="last_name" placeholder="Last Name" id="last_name" className="register--content-fields-name-last-name"/>
                    
                    <label htmlFor="username">Username:-</label>
                    <input onChange={e=>onChange(e)} type="text" name="username" placeholder="Username" id="username" className="register--content-fields-username"/>
                    
                    <label htmlFor="password">Email:-</label>
                    <input onChange={e=>onChange(e)} type="email" name="email" placeholder="Email" id="email" className="register--content-fields-email"/>
                    
                    <label htmlFor="password">Password:-</label>
                    <input onChange={e=>onChange(e)} type="password" name="password1" placeholder="Password" id="password" className="register--content-fields-password"/>
                    
                    <label htmlFor="re-password">Confirm Password:-</label>
                    <input onChange={e=>onChange(e)} type="password" name="password2" placeholder="Confirm Password" id="re-password" className="register--content-fields-re-password"/>

                    <button className="register--content-fields-button">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register
