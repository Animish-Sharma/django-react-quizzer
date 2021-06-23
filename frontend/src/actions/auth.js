import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT
} from './types';

import axios from 'axios';
import { setAlert } from './alert';

export const login=(username,password)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    };
    const body = JSON.stringify({ username , password });
    try{
        const res = await axios.post("http://127.0.0.1:8000/accounts/login/",body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
        return res.data
    }catch(err){
        dispatch({
            type:LOGIN_FAIL
        });
        return err.response.data
    }
    
}
export const register=(first_name,last_name,username,email,password1,password2)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    };
    const body = JSON.stringify({ first_name,last_name,username,email,password1,password2 });
    console.log(body)
    try{
        const res = await axios.post("http://127.0.0.1:8000/accounts/signup/",body,config)
        dispatch({
            type:SIGNUP_SUCCESS,
            payload:res.data
        });
        dispatch(login(username,password1))
        return res
    }catch(err){
        dispatch({
            type:SIGNUP_FAIL
        });
        return (err.response)
    }
    
}

export const logout=()=>dispatch=>{
    dispatch({
        type:LOGOUT
    })
    dispatch(setAlert("Successfully logged out","success"))
};

export const update=(first_name, last_name, username, email, password, new_password,image)=>async dispatch=>{
    console.log({ first_name, last_name, username, email, password, new_password,image })
    let formData = new FormData()
    formData.append("first_name",first_name)
    formData.append("last_name",last_name)
    formData.append("username",username)
    formData.append("email",email)
    formData.append("password",password)
    formData.append("new_password",new_password)
    formData.append("image",image)
    const config={
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    }

    const res = await axios.post("http://localhost:8000/accounts/update/",formData,config)
    console.log(res.data)
    if(res.data.success){
        dispatch(setAlert("Successfully Updated your account","success"))
        dispatch(logout())
        dispatch(login(res.data.user.username,new_password ? new_password : password))
    }else{
        dispatch(setAlert(res.data.error,"error"))
    }

}

export const submit=(result,slug)=>async dispatch=>{
    const config={
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({ result,slug })
    const res = await axios.post("http://localhost:8000/api/submit/test/",body,config);
    console.log(res)
}