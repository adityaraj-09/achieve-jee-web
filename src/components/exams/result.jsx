
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getAvgMarks, getUserData, secondsToHMS, UserRankAndData } from '../Data/result_methods'
import { decryptData, decryptString } from '../encryption'
import Nav from "../nav/Nav"
import Spinner from '../spinner/spinner'
import BarChart from './barchart'
import Leaderboard from './leaderboard'
import PieChart from './piechart'
import { HiTrophy } from "react-icons/hi2";
import "./result.css"
import BasicTable from './table'
import CustomizedTables from './table'
import StickyHeadTable from './table'
const ResultPage = () => {
  const location=useLocation()
  
  

    var paperData = JSON.parse( localStorage.getItem('paper'))      
  


  const [error, seterror] = useState(null)
  const [spin, setspin] = useState(true)
  var jdata
  if(localStorage.getItem("user")){

    jdata=decryptData(localStorage.getItem("user"))
  }

  var avgMarks
  var avgMP
  var avgMC
  var avgMM
  var avgAccuracy
  var avgTime 
  if(paperData){

    var { avgMarks, avgMP, avgMC, avgMM, avgAccuracy, avgTime } = getAvgMarks(paperData.AttemptedBy,jdata._id,paperData.startTime)[1]
  }
  // const [userData, setuserData] = useState(null)
  // useEffect(() => {
  //   let token = ' '
  //   if (localStorage.getItem(("jwtToken"))) {

  //     token = decryptString(localStorage.getItem("jwtToken"))
  //   }
  //   fetch('https://achieve-jee-server.onrender.com/api/get-marks/' + _id, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-auth-token': token,
  //       'AuthGuardPass': process.env.REACT_APP_AUTHGUARD_PASS
  //     },   

  //   })
  //     .then((response) => {
  //       if (response.ok) {
        
  //         return response.json(); 
  //       } else {
        
  //         return response.json().then(errorData => {
  //           throw new Error(`${errorData.msg}`);
  //         });
  //       }
  //     })
  //     .then((responseData) => {
  //       setspin(false)
  //       console.log(responseData)
  //       setuserData(responseData)


  //     })
  //     .catch((error) => {

  //       seterror(error.message);
  //       setuserData({})
  //       setspin(false)
  //     });

  //   return () => {
  //   }
  // }, [])

  
  let avgPer =""
  if(paperData){

   avgPer= (avgMarks * 100.0 / paperData.marks).toFixed(2)
  }
  var data={}
  if(paperData){

     data = getUserData( getAvgMarks(paperData.AttemptedBy,jdata._id,paperData.startTime)[0]
    ,paperData.marks)
  }
  const marksPerSub=()=>{
    let d=getAvgMarks(paperData.AttemptedBy,jdata._id,paperData.startTime)[0]
    let arr=[d['phy'][0],d['chem'][0],d['math'][0]]
    return arr
  }
  

  
  return (
   error ? <div className='con-errorResult'>
      <div className="container-error-box">
        <h1>{error}</h1>
        <p>The reset password link has expired. Please request a new link to reset your password.</p>
        <a href="https://achieve-jee.onrender.com/login">Login</a>
      </div>

    </div> : spin?  <div className="con-result" >
      <Nav />

      <div className="top-box">

        <div className="ans_pn"><p>{paperData && paperData["title"]}</p> <div className="btn-ans">Solutions</div></div>
        <div className="cir_datas">
          <div className="cir_data_res"><p>{paperData? data.rank:177}</p><div className="basel"></div><strong>MY RANK</strong></div>
          <div className="cir_data_res"><p>{`${paperData?data.stuMT:"250"}(${paperData?data.stuPer:53}%)`}</p><div className="basel"></div><strong>MY SCORE</strong></div>
          <div className="cir_data_res"><p>{paperData?data.stuAcc:65}%</p><div className="basel"></div><strong>ACCURACY</strong></div>
          <div className="cir_data_res"><p>{paperData?paperData.AttemptedBy[0].marks:"360"}</p><div className="basel"></div><strong>HIGHEST</strong></div>
          <div className="cir_data_res"><p>{paperData?paperData.AttemptedBy[paperData.AttemptedBy.length-1].marks:"360"}</p><div className="basel"></div><strong>LOWEST</strong></div>
        </div>

        <div className="con-marks" >
        <p className='head'>LEADERBOARD <HiTrophy className='trop'/></p>
        <StickyHeadTable/>
          <p className='head'>OVERALL</p>

          <div className="box-overall" id='overall'>

            <div className="box-bar-head">
              <strong>Total marks</strong>
              <div className="color-schemes" style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
                <div className="color-scheme" style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}><div className="box-cs" style={{ height: "10px", width: "10px", backgroundColor: "rgb(77, 77, 188)" }}></div><p style={{color:"black",fontSize:"15px"}}>You</p></div>
                <div className="color-scheme" style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}><div className="box-cs" style={{ height: "10px", width: "10px", backgroundColor: "red" }}></div><p style={{color:"black",fontSize:"15px"}}>Average</p></div>
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

                    <div className="bar" style={{ height: `${paperData?data.stuPer:53}%`, width: "120px", backgroundColor: "rgb(77, 77, 188)" }} key="1">
                      <div className="hover">{paperData?data.stuPer:53}</div>
                    </div>
                  </div>
                  <div className="con-bar">

                    <div className="bar" style={{ height: `${avgPer}%`, width: "120px", backgroundColor: "red" }} key="2">
                      <div className="hover">{avgPer}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-bar-head">
              <strong>Total time</strong>
              <div className="color-schemes" style={{ display: "flex", gap: "20px" , marginTop: "40px"}}>
                <div className="color-scheme" style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center",}}><div className="box-cs" style={{ height: "10px", width: "10px", backgroundColor: "rgb(77, 77, 188)" }}></div><p style={{color:"black",fontSize:"15px"}}>You</p></div>
                <div className="color-scheme" style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}><div className="box-cs" style={{ height: "10px", width: "10px", backgroundColor: "red" }}></div><p style={{color:"black",fontSize:"15px"}}>Average</p></div>
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

                    <div className="bar" style={{ height: `${paperData?(data.individualTime/(paperData.duration*60)).toFixed(2):30}%`, width: "120px", backgroundColor: "rgb(77, 77, 188)" }} key="1">
                      <div className="hover">{secondsToHMS(paperData?data.individualTime:1800)}</div>
                    </div>
                  </div>
                  <div className="con-bar">

                    <div className="bar" style={{ height: `${paperData?(avgTime/(paperData.duration*60)).toFixed(2):30}%`, width: "120px", backgroundColor: "red" }} key="2">
                      <div className="hover">{secondsToHMS(paperData?avgTime:1800)}</div>
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
                <PieChart per={paperData?marksPerSub():[40,40,30]} key="1" />
              </div>
              <div className="p-chart">
                <h3>Average</h3>
                <PieChart per={paperData?[avgMP,avgMC,avgMM]:[50, 30, 70]} key="1" />
              </div>


            </div>
          </div>
          <p className='head'>CHAPTER-WISE</p>
          <div className="box-chapter" id='chapter'></div>
          <p className='head'>STRENGTH-WEAKNESS</p>
          <div className="box-strweak" id='strweak'></div>
        </div>

      </div>
    </div>:<Spinner/>
  )
}
 
export default ResultPage