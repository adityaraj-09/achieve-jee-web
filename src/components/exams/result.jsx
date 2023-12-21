
import React, { useEffect, useState } from 'react'
import { decryptString } from '../encryption'
import Nav from "../nav/Nav"
import BarChart from './barchart'
import PieChart from './piechart'
import "./result.css"
const ResultPage = ({pid}) => {

  const [error, seterror] = useState(null)
  const [spin, setspin] = useState(true)
    useEffect(() => {
      let token=' '
      if(localStorage.getItem(("jwtToken"))){

         token=decryptString(localStorage.getItem("jwtToken"))
      }
      fetch('https://achieve-jee-server.onrender.com/api/get-marks/65229482f06dad0af7b8739c', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token':token,
          'AuthGuardPass': process.env.REACT_APP_AUTHGUARD_PASS
        },
        
      })
        .then((response) => {
          if (response.ok) {
            // Handle successful response here
            return response.json(); // Parse the JSON response
          } else {
            // Handle error response
            return response.json().then(errorData => {
              throw new Error(`${errorData.msg}`);
            });
          }
        })
        .then((responseData) => {
          setspin(false)
         console.log(responseData)
  
  
        })
        .catch((error) => {
         
          seterror(error.message);
         
          setspin(false)
        });
    
      return () => {
      }
    }, [])
    


  return (
    error?<div className='con-errorResult'>
      <div className="container-error-box">
      <h1>{error}</h1>
        <p>The reset password link has expired. Please request a new link to reset your password.</p>
        <a href="https://achieve-jee.onrender.com/login">Login</a>
      </div>
       
    </div>:!spin &&<div className="con-result" >
      <Nav/>
     
        <div className="top-box">
          
          <div className="ans_pn"><p>Jee Advanced Part Test</p> <div className="btn-ans">Answer Key / Solutions</div></div>
            <div className="cir_datas">
                <div className="cir_data_res"><p>177</p><div className="basel"></div><strong>MY RANK</strong></div>
                <div className="cir_data_res"><p>7(5%)</p><div className="basel"></div><strong>MY SCORE</strong></div>
                <div className="cir_data_res"><p>66.7%</p><div className="basel"></div><strong>ACCURACY</strong></div>
                <div className="cir_data_res"><p>180</p><div className="basel"></div><strong>HIGHEST</strong></div>
                <div className="cir_data_res"><p>-10</p><div className="basel"></div><strong>LOWEST</strong></div>
            </div>
            
            <div className="con-marks" >
            <p className='head'>OVERALL</p>

              <div className="box-overall" id='overall'>
               
                <div className="box-bar-head">
                <strong>Total marks</strong>
                <div className="color-schemes" style={{display:"flex",gap:"20px"}}>
                  <div className="color-scheme" style={{display:"flex",gap:"10px",justifyContent:"center",alignContent:"center"}}><div className="box-cs" style={{height:"10px",width:"10px",backgroundColor:"rgb(77, 77, 188)"}}></div>You</div>
                  <div className="color-scheme" style={{display:"flex",gap:"10px",justifyContent:"center",alignContent:"center"}}><div className="box-cs" style={{height:"10px",width:"10px",backgroundColor:"red"}}></div>Average</div>
                </div>
               <div className="con-barChart">
                  <div className="y-axis">
                    <p>0</p>
                    <p>20</p>
                    <p>40</p>
                    <p>60</p>
                    <p>80</p>
                    <p>100</p>
                    
                  </div>
                  <div className="barChart">
                    <div className="con-bar">

                      <div className="bar" style={{height:"50%",width:"120px",backgroundColor:"rgb(77, 77, 188)"}} key="1">
                      <div className="hover">50%</div>
                      </div>
                    </div>
                    <div className="con-bar">

                      <div className="bar" style={{height:"80%",width:"120px",backgroundColor:"red"}} key="2">
                      <div className="hover">80%</div>
                      </div>
                    </div>
                  </div>
               </div>
                </div>
                <div className="box-bar-head">
                <strong>Total time</strong>
                <div className="color-schemes" style={{display:"flex",gap:"20px"}}>
                  <div className="color-scheme" style={{display:"flex",gap:"10px",justifyContent:"center",alignContent:"center"}}><div className="box-cs" style={{height:"10px",width:"10px",backgroundColor:"rgb(77, 77, 188)"}}></div>You</div>
                  <div className="color-scheme" style={{display:"flex",gap:"10px",justifyContent:"center",alignContent:"center"}}><div className="box-cs" style={{height:"10px",width:"10px",backgroundColor:"red"}}></div>Average</div>
                </div>
               <div className="con-barChart">
                  <div className="y-axis">
                    <p>0</p>
                    <p>20</p>
                    <p>40</p>
                    <p>60</p>
                    <p>80</p>
                    <p>100</p>
                    
                  </div>
                  <div className="barChart">
                    <div className="con-bar">

                      <div className="bar" style={{height:"50%",width:"120px",backgroundColor:"rgb(77, 77, 188)"}} key="1">
                      <div className="hover">50%</div>
                      </div>
                    </div>
                    <div className="con-bar">

                      <div className="bar" style={{height:"80%",width:"120px",backgroundColor:"red"}} key="2">
                      <div className="hover">80%</div>
                      </div>
                    </div>
                  </div>
               </div>
                </div>
                    
              </div>
              <p className='head'>SUBJECT-WISE</p>
             
              <div className="box-subjectwise" id='subject'>
              <div className="p-charts">
                  <div className="p-chart">
                    <h3>YOU</h3>
                  <PieChart per={[100,132,150]} key="1"/>
                  </div>
                  <div className="p-chart">
                    <h3>Average</h3>
                  <PieChart per={[100,132,150]} key="1"/>
                  </div>
              
                
                </div>
              </div>
              <p className='head'>CHAPTER-WISE</p>
              <div className="box-chapter" id='chapter'></div>
              <p className='head'>STRENGTH-WEAKNESS</p>
              <div className="box-strweak" id='strweak'></div>
            </div>

        </div>
    </div>
  )
}

export default ResultPage