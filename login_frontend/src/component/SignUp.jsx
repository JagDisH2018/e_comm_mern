import React, { useState } from 'react'

function SignUp() {
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");

const collectData= async()=>{
    console.log(name,password);
     let result =await fetch('http://localhost:5000/register',{
        method : 'post',
        body: JSON.stringify({name,password}),
        headers:{
            'Content-Type':'application/json'
        },
    });
    result = await result.json();
    console.warn(result); 
}

    return (
        <div className='register'>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>  
            <button type="submit" className="btn btn-primary" onClick={collectData}>Submit</button>
        
        </div>
    )
}

export default SignUp
