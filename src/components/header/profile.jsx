
import React, { useState } from 'react'
import "./profile.css"
import {FaUserAlt} from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import { Navigate, useNavigate } from 'react-router-dom'

const Profile = () => {
    const data=JSON.parse(localStorage.getItem("user"))
    const navigate =useNavigate()
    const [popup, setpopup] = useState(false)
   
  return (
    <>
    <div className="con-prof" onClick={()=>{
        popup?setpopup(false):setpopup(true)
    }}>
        <div className="prof-img">
            <FaUserAlt/>
        </div>
        <div className="h5">{data["name"]}</div>

       
    </div>
    {
        popup?<div className="drop-box" >
        <div className="row1">

    <FaUserAlt/>
    <strong>{data["name"]}</strong>
        </div>
        <div className="row2">
        <MdEmail/>
    <strong>{data["email"]}</strong>
        </div>

    <div className="log-out-btn" onClick={()=>{
         localStorage.removeItem("jwtToken")
         localStorage.removeItem("user");
       navigate("/login")
    }}>
       <a href="/login"> Log out</a>
    </div>

</div>:null
    }
    
    </>
  )
}

export default Profile