
import React from 'react'
import "./login.css"
import {ImUsers} from "react-icons/im"
import {AiFillEye} from "react-icons/ai"
import {AiFillEyeInvisible} from "react-icons/ai"
import { useState } from 'react'
import { Navigation, useNavigate, useNavigation } from 'react-router-dom'

const Login = () => {
    
    const [hidden, sethidden] = useState(0)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error,seterror]=useState("")
    const navigate=useNavigate();

   function login(){
    const data = {
        email: email,
       password:password
      };
  
      fetch('http://localhost:8000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          //'x-auth-token':localStorage.getItem("jwtToken")
          
        },
        body: JSON.stringify(data), // Convert data to JSON string
      })
        .then((response) => {
          if (!response.ok) {
            
            console.log(response)
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the response JSON
        })
        .then((responseData) => {
         navigate("/q")
        localStorage.setItem('jwtToken', responseData["token"]);
          console.log('Response Data:' , responseData);
        })
        .catch((error) => {
          // Handle errors here
          seterror(error)
          console.error('Error:', error);
        });
    
    }
  return (
    
    <section className="con-login">
      
        <div className="box-login">
            <div className="login-head">

            <strong>STUDENT LOGIN-SIGNUP</strong>
            </div>
            <div className="box-e">

            <label htmlFor="e">
                Email:
            </label>
            <input type="text" className='in-e' placeholder='Type email id' name='e' onChange={(event)=>setemail(event.target.value)}/><br />
            </div>
            <div className="box-p">

            <label htmlFor="p">Password:</label>
            <div className="ini">

            <input type={(hidden==0)?"password":"text"} className='in-p' placeholder='Enter password' name='p' onChange={(event)=>setpassword(event.target.value)}/>
            {
                hidden==0?<AiFillEye onClick={
                    ()=> hidden==0?sethidden(1):sethidden(0)                
                } style={{cursor:"pointer",scale:"2"}}/>:<AiFillEyeInvisible onClick={
                    ()=> hidden==0?sethidden(1):sethidden(0)                
                } style={{cursor:"pointer",scale:"2"}}/>
            }
            
            </div>
            </div>
            <div className="login-btns">
                <div className="btn-login" style={{cursor:"pointer"}} onClick={login}><strong>Login</strong></div>
                <div className="btn-register" style={{cursor:"pointer"}} onClick={()=>console.log(localStorage.getItem("jwtToken"))}><strong>New Registration</strong></div>
            </div>

        </div>
    </section>
  )
}

export default Login