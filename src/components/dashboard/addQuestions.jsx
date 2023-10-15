
import React, { useState } from 'react'
import {IoAddCircleSharp} from "react-icons/io5"
import "./addq.css"
import {MdCancel} from "react-icons/md"
import "./create-paper.css"
const AddQuestions = () => {
    const [isVisible, setisVisible] = useState(false)
    const [etype, setetype] = useState(0)
    const [title, settitle] = useState("")
    const [total_q, settotal_q] = useState(0)
    const [duration, setduration] = useState(0)
    const [spin, setspin] = useState(false)
  const  handleSubmit= (event)=>{
    let by= JSON.parse(localStorage.getItem("user"))["_id"]
    event.preventDefault();
    setspin(true)
    let data = {
        category:2,
        title:title,
        exam:etype,
        total_q:parseInt(total_q, 10),
        duration:parseInt(duration, 10),
        by:by
      };
      console.log(data)
      
      
  
      fetch('https://achieve-jee-server.onrender.com/api/add-Paper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
         return response.json()
        })
        .then((responseData) => {
            
            setisVisible(false)
            setspin(false)
          
       
        })
        .catch((error) => {
            setspin(false)
          console.log(error)
        });
    }
  return (
    <section className='page-cpq'>
        <div className="box-btn-ap" onClick={()=>setisVisible(!isVisible)}>
            {
                !isVisible?<><IoAddCircleSharp id='addp-ic'/>
                Create Paper</>:<><MdCancel id='addp-ic'/>
                Cancel</>
            }
            
        </div>
        {
            isVisible?<section className='con-addQ'>

                <form action="" onSubmit={handleSubmit}>
            <div className="box-addQ">
                <h3>Create a new Paper</h3>
                <div className="type-papers-h">
                    <strong>Select Exam </strong>
                <div className="type-papers" >
                    <div className="type-paper" onClick={()=>setetype(0)} style={{border:etype==0?"2px solid rgb(104, 4, 104)":null}}>1. Jee Advanced</div>
                    <div className="type-paper" onClick={()=>setetype(1)} style={{border:etype==1?"2px solid rgb(104, 4, 104)":null}}>2. Jee Mains</div>
                </div>
                </div>
    
                <div className="box-p-title">
                   <strong>Title</strong><br />
                   <input type="text" placeholder='enter test paper title' required  onChange={(event)=>{
                    settitle(event.target.value)
                   }}/>
    
                </div>
                <div className="box-tq-tm">
                  <div className="box-tq">
                  <strong>Questions</strong><br />
                   <input type="number" placeholder='No of questions' required onChange={(event)=>{
                    settotal_q(event.target.value)
                   }}/>
                  </div>
    
                  <div className="box-tm">
                  <strong>Duration</strong><br />
                   <input type="number" placeholder='duration' required onChange={(event)=>{
                    setduration(event.target.value)
                   }}/>
                  </div>
                </div>
               <button type='submit' id='cp'> {spin?<div className="spinner-cir"></div>:<div>create</div>} </button>
            </div>
            </form>
        </section>:null
        }
            
       
    </section>
  )
}

export default AddQuestions