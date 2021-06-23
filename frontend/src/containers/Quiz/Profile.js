import React,{ useState } from 'react'
import "./Profile.scss";
import User from '../../components/Quiz/User';
import NonChose from '../../components/Quiz/NonChose';
import Update from '../../components/Quiz/Update';
import { useSelector,useDispatch } from 'react-redux';
import Result from '../../components/Quiz/Result';
import { setAlert } from '../../actions/alert';
import { Redirect } from 'react-router-dom'
const Profile = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)
    const [user,setUser] = useState(false);
    const [update,setUpdate] = useState(false);
    const [result,setResult] = useState(false);

    if(!isAuthenticated){
        dispatch(setAlert("You have to login or register first for this action","message",7000))
        return <Redirect to='/'/>
    }

    const onContentChange = (name) =>{
        if(name==="user"){
            setUser(true);
            setUpdate(false);
            setResult(false)
        }else if(name==="update"){
            setUser(false);
            setUpdate(true);
            setResult(false);
        }else if(name==="result"){
            setUser(false);
            setUpdate(false);
            setResult(true);
        }else{
            setUser(false);
            setUpdate(false);
            setResult(false)
        }
    }
    const isActive=title=>{
        if(title === "user" && user === true){
            return "active";
        }
        if(title === "update" && update === true){
            return "active";
        }
        if(title === "result" && result === true){
            return "active";
        }
        return null;
    }
    return (
        <div className="profile">
            <div className="profile--sidebar">
                <button className={isActive("user")} onClick={()=>onContentChange("user") }>Profile</button>
                <button className={isActive("update")} onClick={()=>onContentChange("update")}>Update Profile</button>
                <button className={isActive("result")} onClick={()=>onContentChange("result")}>Results</button>
            </div>
            <hr/>
            <div className="profile--content">
                {user ? <User /> : update ? <Update /> : result ? <Result /> : <NonChose />}
            </div>
        </div>
    )
};

export default Profile;
