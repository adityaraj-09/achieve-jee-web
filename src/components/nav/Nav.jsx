import React from 'react'
import './nav.css'
import {AiFillHome} from "react-icons/ai"
import {FaUser} from "react-icons/fa"
import {BiBook} from "react-icons/bi"
import {RiServiceLine} from "react-icons/ri"
import {AiFillContacts} from "react-icons/ai"
import { useState } from 'react'


const Nav = () => {
  const [activeNav,setActiveNav]=useState('#');
  return (
    <nav className='res_nav'>
      <a href="#"onClick={()=>setActiveNav('#')} className={activeNav==='#'?'active':''}><AiFillHome/></a>
      <a href="#overall" onClick={()=>setActiveNav('#overall')} className={activeNav==='#overall'?'active':''}><FaUser/></a>
      <a href="#subject" onClick={()=>setActiveNav('#subject')} className={activeNav==='#subject'?'active':''}><BiBook/></a>
      <a href="#chapter" onClick={()=>setActiveNav('#chapter')} className={activeNav==='#chapter'?'active':''}><RiServiceLine/></a>
      <a href="#strweak" onClick={()=>setActiveNav('#strweak')} className={activeNav==='#strweak'?'active':''}><AiFillContacts/></a>
    </nav>
  )
}

export default Nav