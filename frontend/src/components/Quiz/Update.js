import React,{ useState } from 'react';
import { update } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import "./Update.scss";
import { Helmet } from 'react-helmet';
const Update = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [form,setForm] = useState({
        first_name:'',
        last_name:'',
        email: '',
        username: '',
        password: '',
        new_password: '',
    });
    const [check,setCheck] = useState(false)
    const [image,setImage] = useState("")
    const {first_name,last_name, username, email, password, new_password} = form
    const onChange = e =>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const onImageChange = e =>{
        console.log(e.target.files)
        setImage(
                 e.target.files[0]
        );
        
    }

    const onSubmit = e =>{
        e.preventDefault();
        if(image === null){
            setImage("")
        }
        dispatch(update(first_name, last_name, username, email, password, new_password,image))
        history.push("/profile")
    }
    return (
        <div className="update">
            <Helmet>
                <title>Update Profile</title>
            </Helmet>
            <h1>Update your Profile</h1>
            <p>All fields are optional except password. If want to update a field, you have to type your current password</p>
            <form onSubmit={e=>onSubmit(e)}>
                <input onChange={e=>onChange(e)} type="text" name="first_name" placeholder="First Name"/>

                <input onChange={e=>onChange(e)} type="text" name="last_name" placeholder="Last Name"/>

                <input onChange={e=>onChange(e)} type="text" placeholder="E-Mail" name="email"/>

                <input onChange={e=>onChange(e)} type="text" placeholder="Username" name="username"/>

                <input onChange={e=>onChange(e)} required type="password" placeholder="Password" name="password"/>

                <input onChange={e=>onChange(e)} type={`${check ? 'text' : 'password'}`} placeholder="New Password" name="new_password"/>

                <div className="image-div">
                    <label>Profile Image:-</label>
                    <input onChange={e=>onImageChange(e)} type="file" name="image"/>
                </div>
                <div className="checkbox-div">
                    <label>Show New Password:-</label><input onClick={()=>setCheck(!check)} type="checkbox"/>
                </div>
                <button>Update</button>
            </form>
        </div>
    )
};

export default Update;
