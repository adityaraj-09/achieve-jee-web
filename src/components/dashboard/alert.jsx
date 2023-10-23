import React, { useEffect, useState } from 'react'
import "./alert.css"
import {ImCancelCircle} from "react-icons/im"
const AlertDialog = ({isVisible,message,color,executeFunction}) => {
    const [unhide, setunhide] = useState(isVisible)


    useEffect(() => {
        if (unhide) {
        
          setTimeout(() => {
            
            setunhide(false);
            executeFunction()
          }, 5000);
        }
      }, [unhide]);

  return (
    <div className="alertdialog" style={{display:unhide?"flex":"none",position:"absolute",left:"50px",top:"85vh"}}>
        <div className="before" style={{backgroundColor:color,height:"50px",width:"10px"}}></div>
        <p>{message}</p>
        <ImCancelCircle style={{scale:"2",color:"gray",cursor:"pointer"}} onClick={()=>{ 
            setunhide(false)
            executeFunction()
            }}/>
    </div>
  )
}

export default AlertDialog