
import React from 'react'
import { useState } from 'react'
import {AiOutlineInfoCircle} from "react-icons/ai"
import {IoIosArrowBack} from "react-icons/io"
import {HiOutlineMail} from "react-icons/hi"
import "./fp.css"
import { useNavigate } from 'react-router-dom'
const FPDialog = (props) => {
    const [error,seterr]=useState(false)
    const [loading,setloading]=useState(false)
    const [email,setemail]=useState('')
    const [sent,setsent]=useState(false)
    const navigate=useNavigate()
    const handleButtonClick = (errmsg,color) => {
      const data = { errmsg: errmsg, color: color };
      props.executeFunction(data);
      
    };

    const changev=()=>{
      props.exfg()
    }
 

    const sendlink=()=>{
        setloading(true)
        const data={
            email:email
        }
        fetch('http://achieve-jee-server.onrender.com/api/sendlink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'AuthGuardPass' :process.env.REACT_APP_AUTHGUARD_PASS
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          
          if (response.ok) {
            // Handle successful response here
            return response.json(); // Parse the JSON response
        } else {
            // Handle error response
            return response.json().then(errorData => {
                throw new Error(`${errorData.msg}`);
            });
        }
        })
        .then((responseData) => {
            
            setloading(false)
            handleButtonClick(`email sent to ${email}`,"green")
            setsent(true)
            changev()
           
          
        })
        .catch((error) => {
          handleButtonClick(error.message,"red")
           console.log(error)
            setloading(false)
            
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
                <input type="text" autoComplete='true' required onChange={(event)=> setemail(event.target.value)} placeholder="enter email" />
            </div>
           
            <div className="send-link-btn" onClick={sendlink}>{loading?<div className="spinner-cir"></div>:<strong>Submit</strong>}</div>
           
             <div className="bck-login" onClick={()=>{changev()}}>
                <IoIosArrowBack/>
                back to login
            </div>
            
        </div>
    </div>
  )
  }
export default FPDialog