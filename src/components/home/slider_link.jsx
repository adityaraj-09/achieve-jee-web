
import React from 'react'
import { useState } from 'react'
import "./slider_link.css"
import {IoIosArrowForward} from "react-icons/io"
import {IoIosArrowBack} from "react-icons/io"

const Slider_link = () => {

    const [current, setcurrent] = useState(0)
    function handleclick(i) {
        setcurrent(i)
    }
    const [cimg,setImg]=useState(0)

    const l=["https://i.pinimg.com/1200x/b8/11/ab/b811abd92b7607e06f61686022b7e7a8.jpg","https://i.pinimg.com/736x/7a/62/bb/7a62bb1dfd6f0a6031f07ab4139d3c1a.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSULXkXMN9yO0ybL94s7drmYgDNznlLfx0bBmkBt8JdhWsdWN7EFFVLO_c-5z3Ig72xA3Y&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXmPkfQbomw4609JjAcz8q9A5dtT5AxB_X8gW5Hk4sdmZSQed7-jRqcCId80Ou8_Tzc_4&usqp=CAU"]

  
   
    const options=["Notifications","New courses","Useful Links"]
  return (
    <section className='slider_link'>
        <div className="box_sec1">
            <div className="left-sec1">
                    <h3>Informaton and links</h3>
                    <div className="opts">
                        {
                            options.map((data,index)=>{

                                return (
                                    <div className="opt" onClick={()=>handleclick(index)} style={{
                                        border:index==current?'1px solid rgb(173, 173, 173)':"none"
                                    }}>
                                        <p style={{color: index==current?"red":"black"}}>{data}</p>
                                    </div>
                                )
                              })
                        }
                       
                        
                    </div>
                    <div className="news">
                        <div className="new">
                            <strong>
                            Academic Session 2023 - 2024 for JEE (Main), JEE (Main+Advanced), NEET (UG), Class 6th to
                            10th & Olympiads </strong>
                        </div>
                        <div className="new">
                            <strong>
                            Academic Session 2023 - 2024 for JEE (Main), JEE (Main+Advanced), NEET (UG), Class 6th to
                            10th & Olympiads </strong>
                        </div>
                        <div className="new">
                            <strong>
                            Academic Session 2023 - 2024 for JEE (Main), JEE (Main+Advanced), NEET (UG), Class 6th to
                            10th & Olympiads </strong>
                        </div>
                        <div className="new">
                            <strong>
                            Academic Session 2023 - 2024 for JEE (Main), JEE (Main+Advanced), NEET (UG), Class 6th to
                            10th & Olympiads </strong>
                        </div>
                    </div>
            </div>
            
            <div className="right-sec1">
                <div className="img-sec1">
                    <img src={l[cimg]} alt="" />
                    <IoIosArrowBack className='back' onClick={()=>setImg(cimg-1)} display={cimg===0?"none":"block"}/>
                    <IoIosArrowForward className='forward' onClick={()=>setImg(cimg+1)} display={cimg===l.length-1?"none":"block"}/>
                </div>
            </div>

        </div> 
            
          
        
    </section>
  )
}

export default Slider_link