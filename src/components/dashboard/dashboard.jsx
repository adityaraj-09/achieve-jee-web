
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import "./dashboard.css"

import { FaPowerOff } from "react-icons/fa"
import { GiCancel } from "react-icons/gi"
import { useState } from 'react'
import Testpaper from './testpaper'
import Dashmain from './dash-main'
import { FaUserAlt } from "react-icons/fa"
import { IoMdNotifications } from "react-icons/io"
import { IoMdSettings } from "react-icons/io"
import { GiHamburgerMenu } from "react-icons/gi"
import Createpaper from './createpaper'
import AddQuestions from './addQuestions'
import Profile from '../header/profile'
import { MdCancel } from "react-icons/md"
import styled from 'styled-components';
const Dashboard = () => {

  const navigate = useNavigate()

  const li = ["Dashboard", "Profile", 'Add Question', "Analytics", 'Notifications', 'Test Papers', 'Settings']
  const ic = ['grid_view', 'account_circle', 'description', 'bar_chart', 'notifications', 'description', 'settings']
  const [popup, setPopup] = useState(false)
  const [di, setdi] = useState(0)
  const [sidemenuVis, setsidemenuVis] = useState(false)
  const [theme_popup, setthemepopup] = useState(false)
  const com_list = [<Dashmain />, <Testpaper />, <AddQuestions />]
  function logout() {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("user");
    navigate("/login")
  }
  const colors = ["#4318FF", "rgb(125,7,125)","#04CD00"]
  const classes=["light-theme","dark-theme","green-theme"]
  const StyledDiv = styled.div`
  background-color: ${props => colors[props.i]};
  border: 3px solid white;
  height: 40px;
  width: 40px;
  `;
  const changeTheme=(i)=>{
    const body = document.body;
    document.body.className = '';
    body.classList.add(classes[i]);
    setthemepopup(false)
  }



  return (
    <div className="con-dash ">
      {
        popup ? <div className='overlay'> <div className="logout-popup">
          <div className="logout-head">
            <strong>LOG OUT</strong>

          </div>
          <div className="confirmation">Are you sure you want to logout?</div>
          <div className="confirm-btns">
            <div className="no-btn" onClick={() => setPopup(false)}><GiCancel className='con-ic' /></div>
            <div className="yes-btn" onClick={logout}><FaPowerOff className='con-ic' /></div>
          </div>
        </div></div> : null
      }

      {
        theme_popup && <div className="overlay">
          <div className="theme-popup">
            <h3>Choose your theme</h3>
            
            <div className="themes">
              {
                colors.map((t, i) => {
                  return <div className="theme" key={i}><StyledDiv i={i} onClick={()=>changeTheme(i)} ></StyledDiv></div>;
                })}


            </div>
          </div>
        </div>
      }
      <div className="con-dash-prof">
        <div className="side-menu" onClick={() => setsidemenuVis(true)}><GiHamburgerMenu /></div>
        <div className="dash-prof">
          <div className="ic-noti"><IoMdNotifications className='io-noti' /> <div>8</div></div>
          <IoMdSettings className='io-set' onClick={()=> setthemepopup(true) }/>
          <div className="dp-cir" onClick={() => setdi(1)}><FaUserAlt /></div>
        </div>
      </div>


      <div className="box-dash">

        <aside className={sidemenuVis ? "vis-side" : "nvis"}>
          <div className="top">
            <div className="d-logo">
              <img src={logo} alt="" />
              <strong>ACHIEVE  <span className="danger">JEE</span></strong>
            </div>
            <div className="close" id="close-btn" onClick={() => setsidemenuVis(false)}>
              <MdCancel />
            </div>
          </div>
          <div className="sidebar">
            {
              li.map((t, i) => {
                return <a onClick={() => {
                  setdi(i)
                  setsidemenuVis(false)
                }} id={di === i ? "active" : "null"}>
                  <span class="material-icons-sharp">
                    {ic[i]}
                  </span>
                  <strong>{t}</strong>
                </a>
              })
            }


            <a onClick={() => setPopup(true)}><span class="material-icons-sharp">
              logout
            </span>
              <strong>Logout</strong>
            </a>


          </div>
        </aside>
        <main className='main-dash'>
          <div className="box-main">
            {
              com_list[di]
            }


          </div>

        </main>
        <section className="sec-right"></section>
      </div>
    </div>
  )
}

export default Dashboard