
import React from 'react'
import "./login.css"
import {ImUsers} from "react-icons/im"
import {AiFillEye} from "react-icons/ai"
import {AiFillEyeInvisible} from "react-icons/ai"
import { useState } from 'react'

const Login = () => {
    const [hidden, sethidden] = useState(0)
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
            <input type="text" className='in-e' placeholder='Type email id' name='e'/><br />
            </div>
            <div className="box-p">

            <label htmlFor="p">Password:</label>
            <div className="ini">

            <input type={(hidden==0)?"password":"text"} className='in-p' placeholder='Enter password' name='p'/>
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
                <div className="btn-login" style={{cursor:"pointer"}}><strong>Login</strong></div>
                <div className="btn-register" style={{cursor:"pointer"}}><strong>New Registration</strong></div>
            </div>

        </div>
    </section>
  )
}

export default Login