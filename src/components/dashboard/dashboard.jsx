
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import "./dashboard.css"

import { FaPowerOff} from "react-icons/fa"
import { GiCancel} from "react-icons/gi"
import { useState } from 'react'
import Testpaper from './testpaper'
import Dashmain from './dash-main'

const Dashboard = () => {
  
  const navigate=useNavigate()

  const li=["Dashboard","Profile",'Upcoming Tests',"Analytics",'Notifications','Test Papers','Settings']
  const ic=['grid_view','account_circle','description','bar_chart','notifications','description','settings']
  const [popup,setPopup]=useState(false)
  const [di, setdi] = useState(0)
  const com_list=[<Dashmain/>,<Testpaper/>]
  function logout(){
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("user");
    navigate("/login")
  }


  return (
    <div className="con-dash ">
      {
        popup?<div className='overlay'> <div className="logout-popup">
        <div className="logout-head">
              <strong>LOG OUT</strong>
             
            </div>
            <div className="confirmation">Are you sure you want to logout?</div>
            <div className="confirm-btns">
                <div className="no-btn" onClick={()=>setPopup(false)}><GiCancel className='con-ic'/></div>
                <div className="yes-btn" onClick={logout}><FaPowerOff className='con-ic'/></div>
              </div>
              </div></div>:null
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
          {
            li.map((t,i)=>{
              return  <a onClick={()=>setdi(i)}  id={di===i?"active":"null"}>
              <span class="material-icons-sharp">
              {ic[i]}
            </span>
              <strong>{t}</strong>
            </a>
            })
          }
         
           
          <a onClick={()=>setPopup(true)}><span class="material-icons-sharp">
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