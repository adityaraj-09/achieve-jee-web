import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decryptData, decryptString, encryptData, encryptString } from '../encryption';
import AlertDialog from './alert';
import "./veriftyotp.css"
function OTPVerificationPage() {

  const [otp, setOTP] = useState('');
  const [verified, setVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [otpsending,setotpsending]=useState(false)
  const [msg, setmsg] = useState(null)
  const [color, setcolor] = useState("red")
    const [spin,setspin]=useState(false)
    const navigate=useNavigate()

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const resendOtp = () => {
    setotpsending(true)
    setmsg(null)
    let token=decryptString(localStorage.getItem("jwtToken"))
   let jdata=decryptData(localStorage.getItem("user"))
    const data = {
   
     email:jdata["email"]
    };

    fetch('http://achieve-jee-server.onrender.com/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AuthGuardPass': process.env.REACT_APP_AUTHGUARD_PASS,
        'x-auth-token': token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setotpsending(false)
        if (response.ok) {
         
          return response.json(); 
        } else {
          // Handle error response
          return response.json().then(errorData => {
            throw new Error(`${errorData.msg}`);
          });
        }
      })
      .then((responseData) => {
        setotpsending(false)
        setcolor("green")
        setmsg(`email sent to ${data.email}`)
      })
      .catch((error) => {
        setotpsending(false)
       console.log(error)
       setcolor("red")
       setmsg(error.message)
      });
  };

  const handleVerifyOTP = () => {
    setmsg(null)
    let jdata=decryptData(localStorage.getItem("user"))
  
    setspin(true)
    const data = {
     otp:otp,
     id:jdata["_id"],
     email:jdata["email"]
    };

    fetch('https://achieve-jee-server.onrender.com/api/verify-Otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AuthGuardPass': process.env.REACT_APP_AUTHGUARD_PASS
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
        setspin(false)
        const data = encryptData(responseData)
        localStorage.setItem("user", data)
        navigate("/", { replace: true })


      })
      .catch((error) => {
        setspin(false)
        setcolor("red")
        setmsg(error.message)
        
        
        // setspin(false)
        // localStorage.removeItem("jwtToken")
        // localStorage.removeItem("user")
        // seterror(true)
      });
  };

  const handleResendOTP = () => {
    
    setResendDisabled(true);
    setTimeout(() => {
      setOTP('');
      setResendDisabled(false);
    }, 180000);
  };

  return (
    <div className='container-vefify'>
      <h2>OTP VERIFICATION</h2>
      { msg && <AlertDialog isVisible={true} message={msg} color={color} executeFunction={()=>{}} right="50px" top="85px"/>}
        <div className='box-verify'>
         
          <input type="text" value={otp} onChange={handleOTPChange} id="ver-otp-input" placeholder="enter 6 digit otp" required/>
          
          <div onClick={resendOtp} disabled={resendDisabled} style={{cursor:"pointer"}} >

           {otpsending?<div className="spinner-cir"></div>: <strong >

            Resend OTP
            </strong>}
          </div>
          <button onClick={handleVerifyOTP}>{spin?<div className="spinner-cir"></div>:"Verify OTP"}</button>
        </div>
      
    </div>
  );
}

export default OTPVerificationPage;
