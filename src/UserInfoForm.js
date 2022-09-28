import React, { useEffect, useState } from "react";
import axios from 'axios';

function UserInfoForm(){
    var objectArray = [];
    const[formData, setFormData] = useState([
        {
        first_name: "",
        last_name: "",
        email: "",
        avatar: ""
        }
    ]);
    const[userData, setData] = useState([]);
    const[postedData, setPostData] = useState([]);
    const[formErrors, setFormErrors] = useState({});
    const[isSubmit, setIsSubmit] = useState(false);

    const handleInput = (e) => {
        const postData = {...formData}
        postData[e.target.name] = e.target.value
        setFormData(postData)
        console.log(postData)
    }

    const handleSubmit = (e) => {
       e.preventDefault();
       setFormErrors(validate(formData))
       setIsSubmit(true)
    }

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            axios.post('https://reqres.in/api/users', formData
            )
            .then(res => {
                objectArray.push(...objectArray,res.data)
                setPostData([...postedData, res.data])
                console.log(res.data)
                console.log(objectArray)
            })
            .catch(error=> {
                console.log(error)
            })
        }
    },[formErrors])

    const validate = (values) => {
        const errors = {}
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        if(!values.first_name){
            errors.first_name = "First Name is required."
        }
        if(!values.last_name){
            errors.last_name = "Last Name is required."
        }
        if(!values.email){
            errors.email = "Email address is required."
        }
        else if(!regex.test(values.email))
        {
            errors.email = "This is not a valid email address."
        }

        return errors;
    }

    useEffect(()=> {
        axios.get('https://reqres.in/api/users')
        .then(res=>{
            console.log(res);
            setData(res.data.data)
        })
        .catch(error=>{
            console.log(error);
        })
    },[])
    return(
        <>
        
        <form className="user-form" action="" onSubmit = {handleSubmit}>
            <h1>User Information</h1>
            <div className="input-area">
                <label className="label-element">First Name: </label>
                <input name= "first_name" className="input-element"placeholder="Type First name.." onChange={handleInput} autoComplete="Off" value={formData.first_name}></input>
            </div>
            <p>{formErrors.first_name}</p>
            <div className="input-area">
                <label className="label-element">Last Name: </label>
                <input name= "last_name" className="input-element"placeholder="Type Last name.." onChange={handleInput} autoComplete="Off" value={formData.last_name}></input>
            </div>
            <p>{formErrors.last_name}</p>
            <div className="input-area">
                <label className="label-element">Email Address: </label>
                <input name= "email" className="input-element"placeholder="Email id.." onChange={handleInput} autoComplete="Off" value={formData.email}></input>
            </div>
            <p>{formErrors.email}</p>
            <div className="input-area">
                <label className="label-element">Image URL: </label>
                <input name= "avatar" className="input-element"placeholder="Enter Image URL.." onChange={handleInput} autoComplete="Off" value={formData.avatar}></input>
            </div>
            <button className="btn-Save">Save User</button>
        </form>
        <table>
            <thead className="table-Head">Fetched Data</thead>
            <thead>
                <tr>
                    <td className="column-head">Id</td>
                    <td className="column-head">User Name</td>
                    <td className="column-head">Email Address</td>
                    <td className="column-head">Image</td>
                </tr>
            </thead>
            <tbody>
                {userData.map(userdata => (
                    <tr key={userdata.id}>
                        <td>{userdata.id}</td>
                        <td>{userdata.first_name} {userdata.last_name}</td>
                        <td>{userdata.email}</td>
                        <td><img src={userdata.avatar}></img></td>
                    </tr>
                ))
                }
                </tbody>
        </table>
        <table>
            <thead className="table-Head">Posted Data</thead>
            <thead>
                <tr>
                    <td className="column-head">Id</td>
                    <td className="column-head">User Name</td>
                    <td className="column-head">Email Address</td>
                    <td className="column-head">Image</td>
                </tr>
            </thead>
            <tbody>
                {postedData.map(userdata => (
                    <tr key={userdata.id}>
                        <td>{userdata.id}</td>
                        <td>{userdata.first_name} {userdata.last_name}</td>
                        <td>{userdata.email}</td>
                        <td><img src={userdata.avatar}></img></td>
                    </tr>
                ))
                }
            </tbody>
        </table>
        </>
    )
}

export default UserInfoForm