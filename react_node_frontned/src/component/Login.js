import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    },[])
const collectData= async()=>{
    console.log(email,password);
     let result =await fetch('http://localhost:3001/login',{
        method : 'post',
        body: JSON.stringify({email,password}),
        headers:{
            'Content-Type':'application/json'
        },
    });
    result = await result.json();
    console.warn(result);

    if(result.name){
        localStorage.setItem("user",JSON.stringify(result));
        navigate('/');
    }else{
        alert("Please enter connect details")
    }
}

    return (
        <div className='register'>
            <div className="form-group">
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>  
            <button type="submit" className="btn btn-primary" onClick={collectData}>Submit</button>
        
        </div>
    )
}

export default Login
