
import React from 'react'

const VerifyOtp = () => {
  return (
    <div className='box-verify'>
         
    <input type="text" value={otp} onChange={handleOTPChange} id="ver-otp-input" placeholder="enter 6 digit otp" required/>
    
    <div onClick={resendOtp} disabled={resendDisabled} style={{cursor:"pointer"}} >

     {otpsending?<div className="spinner-cir"></div>: <strong >

      Resend OTP
      </strong>}
    </div>
    <button onClick={handleVerifyOTP}>{spin?<div className="spinner-cir"></div>:"Verify OTP"}</button>
  </div>
  )
}

export default VerifyOtp