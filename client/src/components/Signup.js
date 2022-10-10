import React, { useState } from "react";
import "../css/Signup.css"


export default function Signup(){


    const [signupForm,setSignUpForm] = useState({
        username:'',password:''
    });

    // console.log(signupForm);


    function handleChange(e){
        setSignUpForm(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    async function logIn(e){
        
        // fetch("https://localhost:3443/users/protected",{
        //     method:"POST",
        //     body:JSON.stringify({
        //         username:"Savi",
        //         password:"password"
        //     }),
        //     headers:{
        //         "Content-Type":"application/json"
        //     }
            
        // })
        // .then((response)=>console.log(response))

        fetch("http://localhost:8005/users/login",{
            method:"POST",
            body:JSON.stringify(
                signupForm
            ),
            headers:{
                "Content-Type":"application/json"
            }
            
        })
        .then((response)=>{
            console.log(response);
            return response.json();
        })
        .then((data)=>{
            console.log(data.token);
            if(data.token){
                localStorage.setItem("token",data.token);
                localStorage.setItem("user",data.username);
            }
            window.location.reload();
        })
        .catch((err)=>{alert(err)})


        
        // e.preventDefault();
        // console.log(result);
        
    }

    function signUp(){

        var token =localStorage.getItem("token");

        var authToken = 'bearer '+token
        console.log(authToken);

        fetch("http://localhost:8005/users/signup",{
            method:"POST",
            body:JSON.stringify({
                signupForm
            })
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }


    return(
        <div className="sign">
        <div className="sign-header">
            <h1>BILL</h1>
        </div>
            <form className="signup-form">
                <label>Enter Username</label>
                <input name="username" value={signupForm.username} onChange={handleChange}></input>
                <label>Enter Password</label>
                <input type="password" name="password" value={signupForm.password} onChange={handleChange}></input>
                <button type="button" onClick={logIn}>Log In</button>
                <button type="button" onClick={signUp}>Sign Up</button>
            </form>
        </div>
    )
}