
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import "./dashboard.css"
import { GiProgression} from "react-icons/gi"
import { FaPowerOff} from "react-icons/fa"
import { GiCancel} from "react-icons/gi"
import { useState } from 'react'

const Dashboard = () => {
  
  const navigate=useNavigate()


  const [popup,setPopup]=useState(false)
  function logout(){
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("user");
    navigate("/login")
  }


  return (
    <div className="con-dash ">
      {
        popup? <div className="logout-popup">
        <div className="logout-head">
              <strong>LOG OUT</strong>
             
            </div>
            <div className="confirmation">Are you sure you want to logout?</div>
            <div className="confirm-btns">
                <div className="no-btn" onClick={()=>setPopup(false)}><GiCancel className='con-ic'/></div>
                <div className="yes-btn" onClick={logout}><FaPowerOff className='con-ic'/></div>
              </div>
              </div>:null
      }
      
            
      <div className="box-dash">
        
      <aside>
        <div className="top">
          <div className="d-logo">
            <img src={logo} alt="" />
            <strong>ACHIEVE  <span className="danger">JEE</span></strong>
          </div>
          <div className="close" id="close-btn" >
            <span className='material-icons-sharp'> close</span>
          </div>
        </div>
        <div className="sidebar">
          <a href="" id='active'>
            <span class="material-icons-sharp">
            grid_view
          </span>
            <strong>Dashboard</strong>
          </a>
          <a href=""><span class="material-icons-sharp">
account_circle
</span>
            <strong>Profile</strong>
          </a>
          <a href=""><span class="material-icons-sharp">
description
</span>
            <strong>Upcoming Tests</strong>
          </a>
          <a href=""><span class="material-icons-sharp">
            bar_chart
          </span>
            <strong>Analytics</strong>
          </a>
          <a href=""><span class="material-icons-sharp">
          notifications
          </span>
            <strong>Notifications</strong>
            
          </a>
          <a href=""><span class="material-icons-sharp">
description
</span>
            <strong>Test Papers</strong>
          </a>
          
          <a href=""><span class="material-icons-sharp">
          settings
          </span>
            <strong>Settings</strong>
          </a>
          <a onClick={()=>setPopup(true)}><span class="material-icons-sharp">
            logout
          </span>
            <strong>Logout</strong>
          </a>


        </div>
      </aside>
      <main className='main-dash'>
          <div className="box-main">
            <h2>DASHBOARD</h2>
              <section className='d-cards'>
                <div className="d-card">
                  <div className="d-card-left">

                  <div className="card-cir">
                    <GiProgression/>
                  </div>
                  <strong>Topics</strong>
                  <h3>Mechanics</h3>
                  </div>
                  <div className="d-card-right">
                    <div className="d-progress">
                      <svg>
                        <circle cx="38" cy="38" r='36'></circle>
                      </svg>
                      <div className="number">81%</div>
                    </div>
                  </div>
                </div>
                <div className="d-card">
                  <div className="d-card-left">

                  <div className="card-cir">
                    <GiProgression/>
                  </div>
                  <strong>Topics</strong>
                  <h3>Mechanics</h3>
                  </div>
                  <div className="d-card-right">
                    <div className="d-progress">
                      <svg>
                        <circle cx="38" cy="38" r='36'></circle>
                      </svg>
                      <div className="number">81%</div>
                    </div>
                  </div>
                </div>
                <div className="d-card">
                  <div className="d-card-left">

                  <div className="card-cir">
                    <GiProgression/>
                  </div>
                  <strong>Topics</strong>
                  <h3>Mechanics</h3>
                  </div>
                  <div className="d-card-right">
                    <div className="d-progress">
                      <svg>
                        <circle cx="38" cy="38" r='36'></circle>
                      </svg>
                      <div className="number">81%</div>
                    </div>
                  </div>
                </div>
               
               

              </section>

              
          </div>

      </main>
      <section className="sec-right"></section>
      </div>
    </div>
  )
}

export default Dashboard