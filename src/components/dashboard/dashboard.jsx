
import React, { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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
import { decryptData } from '../encryption'
import AlertDialog from './alert'

const Dashboard = () => {

  const navigate = useNavigate()

  const li = ["Dashboard", "Test Papers", 'Add Question', "Analytics", 'Notifications', 'Profile', 'Settings']
  const ic = ['grid_view', 'description', 'description', 'bar_chart', 'notifications', 'account_circle', 'settings']
  const [popup, setPopup] = useState(false)
  const [alert,setAlert]=useState(null)
  const [color, setcolor] = useState("red")
  const [di, setdi] = useState(0)
  const [sidemenuVis, setsidemenuVis] = useState(false)
  const [theme_popup, setthemepopup] = useState(false)
  const [msg,setmsg]=useState(null)
  const [notiV,setnotiV]=useState(false)
  useEffect(() => {
    fetch("https://achieve-jee-server.onrender.com/api/messages", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'AuthGuardPass': process.env.REACT_APP_AUTHGUARD_PASS
        },
       
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
        
          
         setmsg(responseData)


        })
        .catch((error) => {
          
        })
  
    
  }, [])
  
  const updateSearchParams = (state) => {
    // Create a new URLSearchParams object
   

    switch (state) {
      case "TestPapers":
        setdi(1)
        break;
      case "Dashboard":
       setdi(0)
        break;
      case "Analytics":
       setdi(3)
        break;
      case "AddQuestion":
       setdi(2)
        break;
      case "Notifications":
       setdi(4)
        break;
      case "Profile":
       setdi(5)
        break;
      case "Settings":
       setdi(6)
        break;
     
      default:
        setdi(0)
        break;
        // Code to be executed when no case matches the expression
    }
    
    const newSearchParams = new URLSearchParams(window.location.search);

    // Set new search parameters
    newSearchParams.set('state', state);
   

    // Update the URL with the new search parameters
    window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams.toString()}`);
  };
  const com_list = [<Dashmain />, <Testpaper alertFunction={(e)=>{
    updateSearchParams("Analytics") 
    setcolor("red")
    setAlert(e)}}/>, <AddQuestions />,<ProfileDash/>]
  const searchParams = new URLSearchParams(window.location.search);

    // Access specific query parameters
    const param1 = searchParams.get('state');
    useEffect(() => {
      if(!param1){
        updateSearchParams("Dashboard")
      }else{
        updateSearchParams(param1)
      }
    }, [])
  
    
  let jdata={}
  if(localStorage.getItem("user")){
    jdata=decryptData(localStorage.getItem("user"))
  }
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
      alert && <AlertDialog isVisible={true} right="20px" top="85vh" message={alert} color={color} executeFunction={()=>{setAlert(null)}}/>
    }
      {
        popup ? <div className='overlay' onClick={()=>setPopup(false)}> <div className="logout-popup">
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
        theme_popup && <div className="overlay" onClick={()=>setthemepopup(false)}>
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
      <div className="con-dash-prof" >
        <div className="side-menu" onClick={() => setsidemenuVis(true)}><GiHamburgerMenu /></div>
        <div className="dash-prof">
          <div className="search-bar">
            <CiSearch/>
            <input type="text" placeholder='search'/></div>
          <div className="ic-noti" onClick={()=>setnotiV(!notiV)}><IoMdNotificationsOutline className='io-noti' /> {msg && <div>{msg.length}</div>}</div>
          <MdNightlight className='io-set' onClick={()=> setthemepopup(true) }/>
          <div className="dp-cir" onClick={()=>updateSearchParams("Analytics")}><img src={jdata["image"]?jdata["image"]:"https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"}>
            </img></div>
        </div>
        {notiV && <div className="con-msgs">
          <div className="box-msgs">
            <h3> <IoMdNotificationsOutline/>Notifications</h3>
            <div className="messages" style={(msg && msg.length!=0)?{height: "100%",
    display: "flex",gap:"10px",flexDirection: "column"}:{height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   flexDirection: "column"}}>
              {
                msg? (msg.length!=0 ?<div className='message'>
                  {
                    msg.map((m,i)=>{
                      return <h4 style={{width:"100%",backgroundColor:i%2===0?"transparent":"rgb(204, 179, 179)",padding:"5px"}}>{`(${i+1})`}{m.body}</h4>
                    })
                }</div>:<p>No Notifications found</p>):<div className='spinner-cir'></div>
              }
            </div>
          </div>
        </div>}
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
                 updateSearchParams(t.replace(/\s+/g, ''))
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
        <main className='main-dash' onClick={()=>setsidemenuVis(false)}>
          
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