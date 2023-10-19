
import React from 'react'
import { useState } from 'react'
import {AiOutlineInfoCircle} from "react-icons/ai"
import {IoIosArrowBack} from "react-icons/io"
import {HiOutlineMail} from "react-icons/hi"
import "./fp.css"
const FPDialog = () => {
    const [error,seterr]=useState(false)
    const [loading,setloading]=useState(false)
    const [email,setemail]=useState('')


    const sendlink=()=>{
        setloading(true)
        const data={
            email:email
        }
        fetch('https://achieve-jee-server.onrender.com/api/sendlink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            throw new Error('Network response was not ok');
          }
         return response.json()
        })
        .then((responseData) => {
            setloading(false)
          
        })
        .catch((error) => {
            setloading(false)
            seterr(true)
        });
    }
  return (
    <div className="con-fp">
        <div className="box-fp">
            <AiOutlineInfoCircle className='ic-info'/>
            <h3>FORGOT PASSWORD</h3>
            <p>Enter your email and we'll send you a link to reset your password</p>
            <div className="email-input-ic">
                <HiOutlineMail className="em-ic"/>
                <input type="text" autoComplete='true' required onChange={(event)=> setemail(event.target.value)} placeholder="enter email"/>
            </div>
            {
                error && <p id='err-fp'>email not found or try again after sometime</p>
            }
            <div className="send-link-btn" onClick={sendlink}>{loading?<div className="spinner-cir"></div>:<strong>Submit</strong>}</div>
            <div className="bck-login" onClick={()=>{}}>
                <IoIosArrowBack/>
                back to login
            </div>
        </div>
    </div>
  )
  }
export default FPDialog