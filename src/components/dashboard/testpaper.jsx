
import React, { useEffect, useState } from 'react'
import { getCachedData, cacheData ,getPid,pidData} from '../cached-api';
import "./testpaper.css"
import Spinner from '../spinner/spinner';
import { decryptData, decryptString } from '../encryption';
import {GrFormNext} from "react-icons/gr"
import { Button } from '@mui/base';
import { useNavigate } from 'react-router-dom';
import CameraComponent from '../exams/camera';
const Testpaper = ({alertFunction}) => {
    const [qs,setqs] =useState(null)
    const [tp,settp]=useState(0)
    const apiUrl='https://achieve-jee-server.onrender.com/api/papers'
    const token=decryptString(localStorage.getItem("jwtToken"))
    const  jdata=decryptData(localStorage.getItem("user"))
   const navigate=useNavigate()
    const [attem_pid,setpid]=useState(null)
    useEffect(() => {
      const cachedData =  getCachedData(apiUrl);

      if (cachedData) {
        
        setqs(cachedData);
      }else{

      
        fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'x-auth-token':token,
          'AuthGuardPass' :process.env.REACT_APP_AUTHGUARD_PASS
         
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

    const openNewWindow = (id,resume) => {
      
      localStorage.setItem("pid",id);
     
      const url = `q/${resume}`;
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
                                const tq=data.total_q
                                const tsq=data.qs.length
                                const attempts=jdata.attempts
                                return (((tp===1 && attempts[d]) || (tp===0 && !attempts[d]))?<div className="test-paper" key={i}>
                                <div className="test-details">
                                   
                                <strong>{data.title}</strong>
                                <p>{data.duration} min | <span> {data.total_q} Questions</span></p>
                                </div>
                                <button className="start-btn" onClick={()=>{ 
                                  if(!jdata.verified){
                                    alertFunction("please verify your account")
                                  }else{
                                    openNewWindow(d,false)
                                  }
                                  }}>start</button>
 {
                                      tp===1 &&  <button className="start-btn" onClick={()=>{ 
                                       navigate("/result",{state:data})
                                        }}>view result</button>
                                     }
                                  {tp===1 &&<GrFormNext style={{fontSize:"30px"}} onClick={()=>{
                                    console.log(jdata.attempts[d])
                                     setpid(d)}}/>}
                                    
                                
                            </div>:null)
                            }):null
            }
            </div>
            <div className="test-paper-attempts">
                {
                  attem_pid && tp===1?<div className="tp-attempt" >
                      {
                        jdata.attempts[attem_pid].map((data,id)=>{
                          return <div className="attempt-info">
                            <p>attempt No. {id+1} | At {data.startTime}</p>
                              {/* {data.status===0? <h4>resume</h4>:null} */}
                            </div>
                        })
                      }
                  </div>:null
                }
            </div>
            
        </div>
       
    </div>
  )
}

export default Testpaper