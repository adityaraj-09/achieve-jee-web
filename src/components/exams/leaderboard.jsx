import React from 'react'
import "./leaderboard.css"
const Leaderboard = ({students}) => {
    const img="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
  return (
    <div id='leaderboard'>
        {
            students.length>=3 &&   <div className="box-toppers">
            <div className="col-toppers">

            <div className="col-topper ">
                <div className="img"><img src={img} alt="" height={"60px"} width="60px"/></div>
                <p>Aditya</p>
                <div className="con-details-topper first">
                    <div><h2>2</h2><strong>nd</strong></div>
                    <strong>280 pts</strong>
                </div>
            </div>
            <div className="col-topper ">
                <div className="img"><img src={img} alt="" /></div>
                <p>Aditya</p>
                <div className="con-details-topper second">
                    <div><h2>1</h2><strong>st</strong></div>
                    <strong>280 pts</strong>
                </div>
            </div>
            <div className="col-topper ">
                <div className="img"><img src={img} alt="" /></div>
                <p>Aditya</p>
                <div className="con-details-topper third">
                    <div><h2>3</h2><strong>rd</strong></div>
                    <strong>280 pts</strong>
                </div>
            </div>
            
            </div>

        </div>
        }
      
        <div className="box-leaders">
            {
                students.map((data,i)=>{
                    return (
                        <div className="box-leader">
                        <div className="rankAndName"><strong>{i+1}</strong><div className="img"><img src={img} alt="" height={"50px"} width={"50px"}/></div> <p>{data.name}</p></div>
                        <strong>{data.marks}</strong>
                    </div>
                    )
                })
            }
            
           
            
            
            
        </div>
    </div>
  )
}

export default Leaderboard