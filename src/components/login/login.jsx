
import React, { useRef } from 'react'
import "./login.css"
import { ImUsers } from "react-icons/im"
import { AiFillEye } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import { AiFillEyeInvisible } from "react-icons/ai"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import FPDialog from './forgot_pass'
import { decryptData, decryptString, encryptData, encryptString } from '../encryption'
import AlertDialog from '../dashboard/alert'
import "../dashboard/veriftyotp.css"

const Login = () => {
  const [hidden, sethidden] = useState(0)
  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  const [cp, setcp] = useState("")
  const [error, seterror] = useState(false)
  const [errors, seterr] = useState({})
  const navigate = useNavigate();
  const auth = useAuth()
  const [spin, setspin] = useState(false)
  const [register, setregister] = useState(false)
  const [fpdialog, setfpdialog] = useState(false)
  const [errmsg, seterrmsg] = useState("")
  const [isv, setisv] = useState(false)
  const [color, setcolor] = useState("red")
  var [otp, setOTP] = useState(['','','','','','']);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [otpsending,setotpsending]=useState(false)
  const [otpSent,setOtpSent]=useState(false)
  const changeVisibility = (errmsg) => {

    setisv(true)
    seterrmsg(errmsg["errmsg"])
    setcolor(errmsg["color"])
  }

  function changeByAlertD() {
    setisv(false)
  }

  function dialogfgChange() {
    setfpdialog(false)
  }
  function validateForm() {
    const err = {}

    seterr({})

    if (!email.trim()) {
      err.email = 'Email is required';


    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = 'Invalid email address';
    }

    if (!password.trim()) {
      err.password = 'Password is required';
    }

    seterr(err)

  };
  function login() {
    setspin(true)
    const data = {
      email: email,
      password: password
    };

    fetch('https://achieve-jee-server.onrender.com/api/signin', {
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
        const token = encryptString(responseData["token"])
        localStorage.setItem("user", data)
        localStorage.setItem('jwtToken', token);

        navigate("/", { replace: true })


      })
      .catch((error) => {
        setisv(true)
        seterrmsg(error.message);
        setcolor("red")
        setspin(false)
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("user")
        seterror(true)
      });

  }




  function reg() {
    setspin(true)
    const data = {
      email: email,
      name: name,
      password: password
    }
    if (password === cp) {



      fetch("https://achieve-jee-server.onrender.com/api/signup", {
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
          setisv(true)
          setOtpSent(true)
          seterrmsg(`otp sent to ${email}`);
          setcolor("green")
          const data = encryptData(responseData)
          const token = encryptString(responseData["token"])
          localStorage.setItem("user", data)
          localStorage.setItem('jwtToken', token);
          
         


        })
        .catch((error) => {
          setisv(true)
          seterrmsg(error.message);
          setcolor("red")
          setspin(false)
          localStorage.removeItem("jwtToken")
          localStorage.removeItem("user")
          seterror(true)
        })
    }else{
      setisv(true)
      setspin(false)
          seterrmsg("password doesn't match");
          setcolor("red")
    }

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm()
  };

  
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
    const handleOTPChange = (event, idx) => {
      
      const newOTP = [...otp];
      newOTP[idx] = event.target.value;
      setOTP(newOTP);
  
      // Shift focus to the next input field if available
      if (idx < 5 && event.target.value !== '') {
        inputRefs.current[idx + 1].current.focus();
      }
    };

  const resendOtp = () => {
    setotpsending(true)
    seterrmsg(null)
    let token=decryptString(localStorage.getItem("jwtToken"))
   let jdata=decryptData(localStorage.getItem("user"))
    const data = {
     email:jdata["email"]
    };

    fetch('https://achieve-jee-server.onrender.com/api/send-otp', {
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
        setisv(true)
        setcolor("green")
        seterrmsg(`email sent to ${data.email}`)
      })
      .catch((error) => {
        setisv(true)
        setotpsending(false)
       console.log(error)
       setcolor("red")
       seterrmsg(error.message)
      });
  };

  const handleVerifyOTP = () => {
    seterrmsg(null)
    let jdata=decryptData(localStorage.getItem("user"))
    let fotp='';
    for (let i = 0; i < otp.length; i++) {
      fotp=fotp+otp[i];
      
    }
    setspin(true)
    console.log(fotp)
    const data = {
     otp:fotp,
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
        setisv(true)
        setcolor("red")
        console.log(error)
        seterrmsg(error.message)
        
        
        // setspin(false)
        // localStorage.removeItem("jwtToken")
        // localStorage.removeItem("user")
        // seterror(true)
      });
  };
var arr=[1,2,3,4,5,6]

  return (
    <section className="con-login">
      {/* {
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
      } */}
      {
        fpdialog && <div className="overlay"><FPDialog executeFunction={changeVisibility} exfg={dialogfgChange} /></div>
      }
      {
        isv && <AlertDialog isVisible={true} message={errmsg} color={color} executeFunction={changeByAlertD} left="50px" top="85vh"/>
      }
      {otpSent && <div className="overlay"><div className='box-verify'>
        <h2>You ‘ve Got Email</h2>
        <p className='otp-header'>We have sent the OTP verification code to your email address check your email and enter the code below. </p>
        <div className="otp-boxes">
        {
          arr.map((digit)=>{
            return(<input type="text"  key={digit} maxLength="1" value={otp[digit-1] || ''} className="ver-otp-input" ref={inputRefs.current[digit-1]} onChange={(e)=>handleOTPChange(e,digit-1)}/>)
          })
         }
        </div>
         
         {/* <input type="text" value={otp} onChange={handleOTPChange} id="ver-otp-input" placeholder="enter 6 digit otp" required/> */}
         
         <div onClick={resendOtp} disabled={resendDisabled} style={{cursor:"pointer"}} >

          {otpsending?<div className="spinner-cir"></div>: <strong >

           Resend OTP
           </strong>}
         </div>
         <button onClick={handleVerifyOTP}>{spin?<div className="spinner-cir"></div>:"Verify OTP"}</button>
       </div></div>}



      <div className="box-login">
        <div className="login-head">

          <strong>STUDENT LOGIN</strong>
        </div>
        <form action="" onSubmit={handleSubmit}>
          {
            register && <div className="box-e">

              <h4>Name</h4>

              <div className="ine">

                <input type="text" className='in-e' placeholder='Type name' id='e' onChange={(event) => {

                  setname(event.target.value)
                }} autoComplete="current-password" /><br />
              </div>
            </div>
          }

          <div className="box-e">

            <h4>Email</h4>

            <div className="ine">

              <input type="text" className='in-e' placeholder='Type email id' id='e' onChange={(event) => {

                setemail(event.target.value)
              }} autoComplete="current-email" /><br />
            </div>
          </div>
          <div className="box-p">

            <h4>Password</h4>
            <div className="ini">

              <input type={(hidden == 0) ? "password" : "text"} className='in-p' placeholder='Enter password' id='p' onChange={(event) => setpassword(event.target.value)} autoComplete="current-password" />
              {
                hidden == 0 ? <AiFillEye onClick={
                  () => hidden == 0 ? sethidden(1) : sethidden(0)
                } style={{ cursor: "pointer", scale: "2" }} className="eye" /> : <AiFillEyeInvisible onClick={
                  () => hidden == 0 ? sethidden(1) : sethidden(0)
                } style={{ cursor: "pointer", scale: "2" }} className="eye" />
              }

            </div>
          </div>
          {
            register && <div className="box-e">

              <h4>Confirm password</h4>

              <div className="ine">

                <input type="text" className='in-e' placeholder='confirm password' id='e' onChange={(event) => {

                  setcp(event.target.value)
                }} /><br />
              </div>
            </div>
          }


          {
            !register && <div className="forg-kpl">
              <div className="check-box">

                <input type="checkbox" id='ch' /><label htmlFor='ch'>keep me logged in</label>
              </div>
              <strong onClick={() => setfpdialog(true)}>FORGOT PASSWORD?</strong>
            </div>
          }


          <div className="btn-login" style={{ cursor: "pointer" }} onClick={!register ? login : reg} type="submit">{spin ? <div className="spinner-cir"></div> : <strong> {!register ? "Login" : "Register"}</strong>}</div>
          <div className='sign-link'>{register ? "Already registered?" : "not have account?"}<span onClick={() => !register ? setregister(true) : setregister(false)}> {!register ? "create an Account" : "Login"}</span></div>


        </form>

      </div>
    </section>
  )
}

export default Login