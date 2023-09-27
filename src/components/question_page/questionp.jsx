import React from 'react'
import { useState } from 'react';
import CountdownTimer from './countdown';
import "./questionp.css"
import {ImCross} from "react-icons/im"
const Questionp = () => {
   const [curr_question,setcurrq]=useState(1);
   const [setq,setsetq]=useState(0);
    const [opted,setopt]=useState(null)
    const [dis,setd]=useState(true)

    const solved_questions=[1,2,3,4,5]
    const l=["ALL SECTIONS","PHYSICS","CHEMISTRY","MATHEMATICS"]
    const solved=[2,5,6,7,8,9,13,14,15,16]
    const unsolved=[1,3,4,10,11,12]
    const notvisited=[21,22,23,24,25,26,27,28,29,30]
    const total_questions=[]

    for (let index = 0; index < 54; index++) {
        total_questions.push(index+1)
        
        if(index>15 && index<20){
            unsolved.push(index+1)
        }
        if(index>29){
            notvisited.push(index+1)
        }
        
    }
    const options = ["The ray of light will come out for θ = 30°, for 0 < 𝑙 < L."
        , "There is an angle for l = L/2 at which the ray of light will come out after two reflections.",
        "The ray of light will NEVER come out for θ = 60°, and l = L/3.",
        "The ray of light will come out for θ = 60°, and 0 < 𝑙 < L/2 after six reflections"];
    return (
        <section className='main-ques'>
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
                            Q.NO:8
                        </div>
                        <div className="question-box">
                            <p className='ques'>
                                Three plane mirrors form an equilateral triangle with
                                each side of length L. There is a small hole at a
                                distance l  0 from one of the corners as shown in the
                                figure. A ray of light is passed through the hole
                                at an angle θ and can only come out through the
                                same hole. The cross section of the mirror
                                configuration and the ray of light lie on the same plane.
                            </p>
                            <div className="ques-img">
                                <img src="https://cdn1.byjus.com/wp-content/uploads/2023/01/jee-advanced-question-paper-2022-physics-paper-1-q-6.png" alt="" />

                            </div>
                            <div className="options">
                                <form action="" className='form'>

                                {
                                    options.map((opt, index) => {
                                        return (
                                              <div className="option">

                                                <input type="radio" id={index}  value={opt} name="opts" className='r'checked={opted===index} onChange={()=>setopt(index)}/>
                                                <label for={index}>{opt}</label><br />
                                            </div>
                                            
                                        );
                                    })
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
                                <div className="nav-btn-que">
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
                                    Aditya
                                </p>
                            </div>

                        </div>
                        <div className="ques-palette">
                            <div className="p-head">Quesions Palette</div>
                            <div className="pal-ques">
                                {
                                    total_questions.map((t,index)=>{
                                        return(
                                            <>  
                                                <div className={notvisited.includes(t)?"notvisited-q":  (solved.includes(t)?"solved-q":"unsolved-q")} key={index} onClick={()=>setcurrq(t)}>
                                                    {t}
                                                </div>
                                            </>
                                        );
                                    })
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
                         <div className="tqh">{total_questions.length} Questions</div>
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
        </section>
    )
}

export default Questionp