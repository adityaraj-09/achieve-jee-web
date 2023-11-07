import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decryptData, encryptData, encryptString } from '../encryption';
import "./veriftyotp.css"
function OTPVerificationPage() {

  const [otp, setOTP] = useState('');
  const [verified, setVerified] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
    const [spin,setspin]=useState(false)
    const navigate=useNavigate()
  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleVerifyOTP = () => {
    let jdata=decryptData(localStorage.getItem("user"))
    console.log(otp)
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
        console.log(error.message)
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
      
        <div className='box-verify'>
          <p>Enter OTP:</p>
          <input type="text" value={otp} onChange={handleOTPChange} id="ver-otp-input"/>
          
          <div onClick={handleResendOTP} disabled={resendDisabled}>
            Resend OTP
          </div>
          <button onClick={handleVerifyOTP}>{spin?<div className="spinner-cir"></div>:"Verify OTP"}</button>
        </div>
      
    </div>
  );
}

export default OTPVerificationPage;
