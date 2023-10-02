
import React from 'react'
import "./login.css"
import {ImUsers} from "react-icons/im"
import {AiFillEye} from "react-icons/ai"
import {ImCross} from "react-icons/im"
import {AiFillEyeInvisible} from "react-icons/ai"
import { useState } from 'react'
import { Navigation, useNavigate, useNavigation } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

const Login = () => {
    const [hidden, sethidden] = useState(0)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [error,seterror]=useState(false)
    const [errors,seterr]=useState({})
    const navigate=useNavigate();
    const auth=useAuth()

  function  validateForm() {
     const err={}
    
      seterr({})
    
      if (!email.trim()) {
        err.email = 'Email is required';


      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err.email = 'Invalid email address';
      }
    
      if (!password.trim()) {
        err.password = 'Password is required';
      }
      // if(password.length<6 && password.length>0){
      //   err.password = 'Password must be 6 characters long';
      // }
    
      seterr(err)
      
    };
   function login(){
    const data = {
        email: email,
       password:password
      };
  
      fetch('https://achieve-jee-server.onrender.com/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
         
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
         return response.json()
        })
        .then((responseData) => {
          localStorage.setItem("user",JSON.stringify(responseData))
          localStorage.setItem('jwtToken', responseData["token"]);
          
          navigate("/",{replace:true})
          console.log(responseData)
       
        })
        .catch((error) => {
          localStorage.removeItem("jwtToken")
          localStorage.removeItem("user")

          seterror(true)
        });
    
    }
  const  handleSubmit = (event) => {
      event.preventDefault();
     validateForm()
    };

    const t=errors.email+" & "+errors.password
  return (
    <section className="con-login">
       {
        (error || Object.keys(errors).length > 0)? <div className='error'>
          <div className="error-head">
            <strong>Error</strong>
           
          </div>
          <div className="main-err">
            <ImCross/>
             {
              Object.keys(errors).length===0?<h5>ENTER CORRECT CREDENTIALS</h5>: (<h5>{(errors.email && errors.password)?t:
              (errors.email || errors.password)
              }</h5>)
             }
             
          </div>
          </div>:null
      }

        <div className="box-login">
            <div className="login-head">

            <strong>STUDENT LOGIN-SIGNUP</strong>
            </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="box-e">

          
            <label htmlFor="e">
                Email:
            </label>
            <input type="text"  className='in-e' placeholder='Type email id' id='e' onChange={(event)=>{
                 
              setemail(event.target.value)
              }} autoComplete="current-password"/><br />
            </div>
            <div className="box-p">

            <label htmlFor="p" >Password:</label>
            <div className="ini">

            <input  type={(hidden==0)?"password":"text"} className='in-p' placeholder='Enter password' id='p' onChange={(event)=>setpassword(event.target.value)} autoComplete="current-password"/>
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
                <button className="btn-login" style={{cursor:"pointer"}} onClick={login} type="submit"><strong>Login</strong></button>
                <div className="btn-register" style={{cursor:"pointer"}} onClick={()=>console.log(localStorage.getItem("jwtToken"))}><strong>New Registration</strong></div>
            </div>
            </form>

        </div>
    </section>
  )
}

export default Login