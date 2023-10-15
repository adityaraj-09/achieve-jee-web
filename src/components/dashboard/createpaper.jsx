
import React, { useState } from 'react'
import "./create-paper.css"

const Createpaper = () => {
  const [etype, setetype] = useState(0)
  
  return (
   
    <section className='con-addQ'>

        <div className="box-addQ">
            <h3>Create a new Paper</h3>
            <div className="type-papers-h">
                <strong>Select Exam </strong>
            <div className="type-papers">
                <div className="type-paper" onClick={()=>setetype(0)} style={{border:etype==0?"2px solid rgb(104, 4, 104)":null}}>1. Jee Advanced</div>
                <div className="type-paper" onClick={()=>setetype(1)} style={{border:etype==1?"2px solid rgb(104, 4, 104)":null}}>2. Jee Mains</div>
            </div>
            </div>

            <div className="box-p-title">
               <strong>Title</strong><br />
               <input type="text" placeholder='enter test paper title'/>

            </div>
            <div className="box-tq-tm">
              <div className="box-tq">
              <strong>Questions</strong><br />
               <input type="number" placeholder='No of questions'/>
              </div>

              <div className="box-tm">
              <strong>Duration</strong><br />
               <input type="number" placeholder='duration'/>
              </div>
            </div>
           <button type='submit' id='cp'>Create</button>
        </div>
    </section>
  )
}

export default Createpaper