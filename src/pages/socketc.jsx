import { io } from "socket.io-client";
import React, { useEffect, useState } from 'react'

const Socketc = () => {
    const [count, setcount] = useState("3")
    const socket = io('http://localhost:8000'); 
    socket.connect()
    socket.emit("start-timer",{uid:"njnnjdad55212",pid:"njdnndnn",dur:10800})
      
      
      socket.on("timer",(data)=>{
         
          document.getElementById("c").textContent=data["countDown"];
          
      })
   
    
  return (
    <div > <h1 id="c"> {count}</h1></div>
  )
}

export default Socketc