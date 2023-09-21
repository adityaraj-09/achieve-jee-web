
import React from 'react'
import { useState } from 'react'
import "./slider_link.css"

const Slider_link = () => {

    const [current, setcurrent] = useState(0)
    function handleclick(i) {
        setcurrent(i)
    }

  
   
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
                    <img src="https://allenwebsite-general.s3.ap-south-1.amazonaws.com/dlp-website/slider/2024-25/Olympiads.jpg" alt="" />
                </div>
            </div>

        </div> 
            
          
        
    </section>
  )
}

export default Slider_link