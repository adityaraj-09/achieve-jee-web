
import React, { useEffect, useState } from 'react'
import { getCachedData, cacheData ,getPid,pidData} from '../cached-api';
import "./testpaper.css"
import Spinner from '../spinner/spinner';
import { decryptData, decryptString } from '../encryption';
const Testpaper = () => {
    const [qs,setqs] =useState(null)
    const [tp,settp]=useState(0)
    const apiUrl='https://achieve-jee-server.onrender.com/api/papers'
    const token=decryptString(localStorage.getItem("jwtToken"))
    useEffect(() => {
      const cachedData =  getCachedData(apiUrl);

      if (cachedData) {
        
        setqs(cachedData);
      }else{

      
        fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'x-auth-token':token
         
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
            cacheData(apiUrl, responseData);
        })
        .catch((error) => {
          
        });}
    return ()=>{};
      
    }, [])
    const openNewWindow = (id) => {
      // pidData(id);
      // const i=getPid()
      // console.log(i)
      localStorage.setItem("pid",id);
     
      const url = '/q';
      const windowName = 'myNewWindow';
      const width = 800;
      const height = 800;
      const top=(window.innerHeight-800)/2
      const left=(window.innerWidth-800)/2

     
    
      
      const features = `width=${width},height=${height},top=${top},left=${left} scrollbars=no,resizable=yes,status=no,toolbar=no,location=no,menubar=no`;
      
      const win=window.open(url, windowName, features);
      if (win) {
        win.onload = () => {
          const data = { id: id };
          win.postMessage(data, window.location.origin);
        }; 
      }
    };
    
  return (
   !qs? <Spinner/>:<div className="con-test">
        <h2>Test Papers</h2>
        <div className="type-exams">
            <div className="type-exam">

            <strong onClick={()=>settp(0)}>Upcoming</strong>
            {
              tp===0?<div className="under-line"></div>:null
            }
            
            </div>
            <div className="type-exam">

            <strong onClick={()=>settp(1)}>Attempted</strong>
            {
              tp===1?<div className="under-line"></div>:null
            }
            </div>
            <div className="type-exam">

            <strong onClick={()=>settp(2)}>Live</strong>
            {
              tp===2?<div className="under-line"></div>:null
            }
            </div>
            
        </div>

        <div className="con-test-papers">
            <div className="test-papers">
            {
                            qs?qs.map((data,i)=>{
                                const d=data._id
                                return <div className="test-paper">
                                <div className="test-details">
                                   
                                <strong>{data.title}</strong>
                                <p>180 min <span>created on {data.createdAt}</span></p>
                                </div>
                                <button className="start-btn" onClick={()=> openNewWindow(d)}>start</button>
                                
                            </div>
                            }):null
            }
            </div>
        </div>
    </div>
  )
}

export default Testpaper