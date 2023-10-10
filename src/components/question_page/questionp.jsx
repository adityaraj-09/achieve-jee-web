import React, { useEffect } from 'react'
import { useState } from 'react';
import CountdownTimer from './countdown';
import "./questionp.css"
import { AuthContext, useAuth } from '../../AuthContext'
import {ImCross} from "react-icons/im"
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
const Questionp = () => {
    
    const location = useLocation();
    const pid=location.state
    const [allqs, setallqs] = useState(null)
    window.addEventListener('beforeunload', function (e) {
  
        const confirmationMessage = 'Are you sure you want to leave this page?';
      
     
        (e || window.event).returnValue = confirmationMessage;
      
    
        return confirmationMessage;
      });
   const [cr_q,setcurrq]=useState(0);
   const [setq,setsetq]=useState(0);
    const [opted,setopt]=useState(null)
    const [dis,setd]=useState(true)
    const auth=useContext(AuthContext)
    const solved_questions=[1,2,3,4,5]
    const l=["ALL SECTIONS","PHYSICS","CHEMISTRY","MATHEMATICS"]
    const solved=[]
    const unsolved=[1]
    const notvisited=[]
    
    useEffect(() => {
        fetch('https://achieve-jee-server.onrender.com/api/start-paper/'+pid, {
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
            setallqs(responseData)
            console.log(responseData)
          
        })
        .catch((error) => {
          console.log(error)
        });
    
      
    }, [])
 
        
    return (
       
        
       
        allqs? <section className='main-ques'>
            <div className="heading" >
                <h3>ONLINE TEST</h3>
            </div>
            <div className="box-ques">
                <div className="ques-leftp">
                    <div className="ques-secs">
                        {
                            l.map((d,i)=>{
                                return(
                                    <div className="ques-sec" style={{backgroundColor:setq==i?"rgb(6, 6, 115)":"rgb(77, 77, 188)"}} onClick={()=>setsetq(i)}>
                                    {d}
                                </div>
                                )
                            })
                        }

                        

                    </div>
                    <div className="ques-mainbox">
                        <div className="qno">
                        Question {allqs?cr_q+1:"loading..."}
                        </div>
                        <div className="question-box">
                            <p className='ques'>
                                {allqs?allqs[cr_q].body:"loading..."}
                            </p>
                            <div className="ques-img">
                                <img src={allqs?allqs[cr_q].imageurl:"loading..."} alt="" />

                            </div>
                            <div className="options">
                                <form action="" className='form'>

                                {
                                   allqs? allqs[cr_q].options.map((opt, index) => {
                                        return (
                                              <div className="option">

                                                <input type="radio" id={index}  value={opt} name="opts" className='r'checked={opted===index} onChange={()=>setopt(index)}/>
                                                <label for={index}>{opt}</label><br />
                                            </div>
                                            
                                        );
                                    }):null
                                }
                                </form>

                            </div>
                        </div>
                    </div>

                    <div className="nav-btns-ques">
                                <div className="nav-btn-que" onClick={()=>setopt(null)} >
                                    CLEAR RESPONSE
                                </div>
                                <div className="nav-btn-que">
                                    REVIEW
                                </div>
                                <div className="nav-btn-que">
                                    PREVIOUS
                                </div>
                                <div className="nav-btn-que" onClick={()=>setcurrq(cr_q+1)}>
                                    NEXT
                                </div>
                    </div>
                </div>
                <div className="ques-rightp">
                        <div className="stu-details">
                            <div className="stu-img"><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" /></div>
                            <div className="stu-data">

                                <CountdownTimer className="timer"/>
                                <p className="stu-name">
                                    {localStorage.getItem("user")?JSON.parse(localStorage.getItem("user"))["name"]:null}
                                </p>
                            </div>

                        </div>
                        <div className="ques-palette">
                            <div className="p-head">Quesions Palette</div>
                            <div className="pal-ques">
                                {
                                    allqs?allqs.map((t,index)=>{
                                        return(
                                            <>  
                                                <div className={notvisited.includes(index+1)?"notvisited-q":  (solved.includes(index+1)?"solved-q":"unsolved-q")} key={index+1} onClick={()=>setcurrq(index)}>
                                                    {index+1}
                                                </div>
                                            </>
                                        );
                                    }):null
                                }
                            </div>

                        </div>
                        <div className="no-ques">
                         <div className="p-head">Legend</div>
                         <div className="no-qp">
                                <div className="sq">
                                    {solved.length} Answered
                                </div>
                                <div className="usq">
                                    {unsolved.length} UnAnswered
                                </div>
                                <div className="nvq">
                                    {notvisited.length} Not visited
                                </div>
                                <div className="mq">
                                    0 Marked
                                </div>
                         </div>
                         <div className="tqh">{allqs?allqs.length:54} Questions</div>
                         <div className="exam-btns-ques">
                         <div className="exam-btn-que"  >
                                    Profile
                                </div>
                                <div className="exam-btn-que" onClick={()=>setd(true)}>
                                    Instr
                                </div>
                                <div className="exam-btn-que">
                                    Questions
                                </div>
                                <div className="exam-btn-que">
                                    Submit
                                </div>
                         </div>
                        </div>

                </div>

            </div>
            <div className="popup" style={{display:dis?"flex":"none"}}>
                <div className="h-cr">

                <h3>INSTRUCTIONS</h3>
                <div className="cross" onClick={()=>setd(false)} >
                            <strong>close</strong>
                </div>
                </div>
            </div>
        </section>: <div>loading....</div>
        
    )
}

export default Questionp