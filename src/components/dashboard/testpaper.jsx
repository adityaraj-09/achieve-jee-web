

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Testpaper = () => {
    const [qs,setqs] =useState([])
    const navigate =useNavigate()
    useEffect(() => {
        fetch('https://achieve-jee-server.onrender.com/api/papers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'x-auth-token':localStorage.getItem("jwtToken")
         
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
         return response.json()
        })
        .then((responseData) => {
        
            setqs(responseData)
        })
        .catch((error) => {
          
        });
    
      return () => {
        
      }
    }, [])
    
  return (
    <div className="con-test">
        <h2>Test Papers</h2>
        <div className="type-exams">
            <div className="type-exam">

            <strong>Upcoming</strong>
            <div className="under-line"></div>
            </div>
            <div className="type-exam">

            <strong>Attempted</strong>
            <div className="under-line"></div>
            </div>
            <div className="type-exam">

            <strong>Live</strong>
            <div className="under-line"></div>
            </div>
            
        </div>

        <div className="con-test-papers">
            <div className="test-papers">
            {
                            qs.map((data,i)=>{
                                const d=data._id
                                return <div className="test-paper">
                                <div className="test-details">
                                   
                                <strong>{data.title}</strong>
                                <p>180 min <span>created on {data.createdAt}</span></p>
                                </div>
                                <button className="start-btn" onClick={()=> navigate("/q",{state:d})}>start</button>
                                
                            </div>
                            })
                        }

                
                
            </div>
        </div>
    </div>
  )
}

export default Testpaper