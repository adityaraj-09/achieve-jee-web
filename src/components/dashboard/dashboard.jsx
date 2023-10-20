
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import "./dashboard.css"

import { FaPowerOff } from "react-icons/fa"
import { MdNightlight } from "react-icons/md"
import { GiCancel } from "react-icons/gi"
import { useState } from 'react'
import Testpaper from './testpaper'
import Dashmain from './dash-main'
import { FaUserAlt } from "react-icons/fa"
import { IoMdNotificationsOutline } from "react-icons/io"
import { CiSearch } from "react-icons/ci"
import { GiHamburgerMenu } from "react-icons/gi"
import Createpaper from './createpaper'
import AddQuestions from './addQuestions'
import Profile from '../header/profile'
import { MdCancel } from "react-icons/md"
import styled from 'styled-components';
import ProfileDash from './profile'
const Dashboard = () => {

  const navigate = useNavigate()

  const li = ["Dashboard", "Test Papers", 'Add Question', "Analytics", 'Notifications', 'Profile', 'Settings']
  const ic = ['grid_view', 'description', 'description', 'bar_chart', 'notifications', 'account_circle', 'settings']
  const [popup, setPopup] = useState(false)
  const [di, setdi] = useState(0)
  const [sidemenuVis, setsidemenuVis] = useState(false)
  const [theme_popup, setthemepopup] = useState(false)
  const com_list = [<Dashmain />, <Testpaper />, <AddQuestions />,<ProfileDash/>]
  function logout() {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("user");
    navigate("/login")
  }
  const colors = ["#2B3674", "rgb(125,7,125)","#04CD00"]
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
    localStorage.setItem("theme",classes[i])
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
          <div className="search-bar">
            <CiSearch/>
            <input type="text" placeholder='search'/></div>
          <div className="ic-noti"><IoMdNotificationsOutline className='io-noti' /> <div>8</div></div>
          <MdNightlight className='io-set' onClick={()=> setthemepopup(true) }/>
          <div className="dp-cir" onClick={() => setdi(1)}><img src='https://firebasestorage.googleapis.com/v0/b/faceattendance-a1720.appspot.com/o/AgACAgUAAxkBAAICl2T18G6vBkEJLbW0dDn3SUy_GhzhAAIYuTEbP_ixV6Mpf3WB3ksqAQADAgADeAADMAQ.jpg?alt=media&token=d7769129-e9b1-44d1-8fc7-768d327ec67c'>
            </img></div>
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