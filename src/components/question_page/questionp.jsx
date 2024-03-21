import React, { useEffect } from 'react'
import { useState } from 'react';
import CountdownTimer from './countdown';
import "./questionp.css"
import { AuthContext} from '../../AuthContext'
import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import { decryptData, decryptString, encryptData } from '../encryption';
import { Button } from '@mui/material';
import userEvent from '@testing-library/user-event';
import CameraComponent from '../exams/camera';
import FaceDetectionComponent from '../exams/face-detection';
import { cacheData } from '../cached-api';

const Questionp = () => {

    
    const {resume,index}=useParams()
    

    // const [pid, setpid] = useState(null)
    // const [istimer, setistimer] = useState(false)
    // const [messageReceived, setMessageReceived] = useState(false)

    // const socket = io('https://achieve-jee-server.onrender.com'); 
    // socket.connect()
    // if(!istimer){

    //     socket.emit("start-timer",{uid:"njnnjdad55212",pid:"njdnndnn",dur:10800})
    //     setistimer(true)
    // }


    // useEffect(()=>{
    //     socket.on("timer",(data)=>{
    //         console.log('Received data:', data);
    //         document.getElementById("c").textContent=data["countDown"];

    //     })
    //     return () => {
    //         // Clean up the event listener when the component unmounts
    //         socket.off('timer');
    //       };
    // },[])


    const navigate=useNavigate()
    const [allqs, setallqs] = useState(null)

    window.addEventListener('beforeunload', function (e) {

        const confirmationMessage = 'Are you sure you want to leave this page?';


        (e || window.event).returnValue = confirmationMessage;


        return confirmationMessage;
    });
    const token = decryptString(localStorage.getItem("jwtToken"))
    const jdata = decryptData(localStorage.getItem("user"))
    const i = localStorage.getItem("pid");
    console.log(jdata.attempts[i])
    const [cr_q, setcurrq] = useState(0);
    const [setq, setsetq] = useState(0);
    const [dis, setd] = useState(true)
    const l = ["ALL","MATHS", "PHY", "CHEM"]
    const [answers,setAnswers]=useState(resume=="false"?{}:(jdata.attempts[i][index].markedAns ?jdata.attempts[i][index].markedAns:{}))
    const [spin, setspin] = useState(null)
    const [time,settime]=useState(resume=="false"?{}:(jdata.attempts[i][index].time ?jdata.attempts[i][index].time:{}))
    
    const addAnswer = (questionNo, answerArray) => {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [questionNo]: answerArray, 
        }));
      };

      const addTime = (questionNo, timer) => {
        settime((prevAnswers) => ({
          ...prevAnswers,
          [questionNo]: timer, 
        }));
      };
      
    // useEffect(() => {

    //     const receiveMessage = (event) => {
    //         if (event.origin !== window.location.origin) {
    //           return;
    //         }
    //         setpid(event.data.id);
    //         setMessageReceived(true);
    //     }
    //     window.addEventListener('message', receiveMessage);
    // }, [])
    // const i=getPid()
    // console.log(i)

      
    
    // let len=jdata["attempts"][i].length
    // if(resume){
    //     setAnswers(jdata["attempts"][i][len-1].markedAns)
    // }
    useEffect(() => {
        console.log('useEffect running with value:', i);
       

        if (i ) {
            fetch(`https://achieve-jee-server.onrender.com/api/start-paper/${i}/${resume}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                    'AuthGuardPass': process.env.REACT_APP_AUTHGUARD_PASS
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((responseData) => {
                    setallqs(responseData);
                    if(!answers[0]){

                        addAnswer(0,[])
                    }
                    console.log(responseData)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    useEffect(() => {
        let t=time && time[cr_q]?time[cr_q]:0
        const interval = setInterval(() => {
          // Increment the number by 1
          
           t=t+1
          console.log(t)
          addTime(cr_q,t)
        }, 1000); // 1000ms = 1 second
        return () => {
            clearInterval(interval);
            console.log('Interval is cleared');
          };
        // Cleanup the interval when the component unmounts
        
      }, [cr_q]);
    

      const handleInputChange = (event) => {
        const value = event.target.value;
        if (value === '') {
            // Handle the case where the input is empty
            addAnswer(cr_q, []);
            return;
        }
            const array = [];
            const a = parseFloat(value);
            array[0] = a; 
            addAnswer(cr_q, array);
        
    };

    const handleKeyPress = (event) => {
        // Allow digits, decimal point, and certain control keys
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
        const keyPressed = event.key;
    
        // Allow only one decimal point
        if (keyPressed === '.' && event.target.value.includes('.')) {
            event.preventDefault();
            return;
        }
    
        if (!allowedKeys.includes(keyPressed)) {
            event.preventDefault(); // Prevent the default action of the key
        }
    };
    
    
    

    function encryptAnswers(){
        const anss=encryptData(answers)
        return anss;
    }

    
    const submit=()=>{
        let tq=allqs.length
        let as=0
        let nvq=0
        let naq=0
        
        let mq=0
        for (let i = 0; i < allqs.length; i++) {
            const element = answers[`${i}`];
            if(element){
                if(element.length===0){
                    naq++
                }else{
                    as++
                }
            }else{
                nvq++
            }
            
        }
        setspin("s")
        
        const data={
            hashmaps:answers,
            pid:i,
            time:time,
            index
        }
        fetch('https://achieve-jee-server.onrender.com/api/submit-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AuthGuardPass': process.env.REACT_APP_AUTHGUARD_PASS,
        'x-auth-token': token

      },
      body: JSON.stringify(data),
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
        setspin(null)
        const userdata = encryptData(responseData['user'])
        localStorage.setItem("user", userdata)
        cacheData('https://achieve-jee-server.onrender.com/api/papers', responseData["papers"]);
        navigate("/?state=TestPapers", { replace: true })
      })
      .catch((error) => {
        console.log(error.message)
        setspin(null)

      });
    }

    const pause=()=>{
        setspin("p")
        const data={
            hashmaps:answers,
            pid:i,
            time:time,
            index
        }
        fetch('https://achieve-jee-server.onrender.com/api/pause-paper', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'AuthGuardPass': process.env.REACT_APP_AUTHGUARD_PASS,
              'x-auth-token': token
      
            },
            body: JSON.stringify(data),
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
              setspin(null)
              const userdata = encryptData(responseData['user'])
              localStorage.setItem("user", userdata)
              cacheData('https://achieve-jee-server.onrender.com/api/papers', responseData["papers"]);
              navigate("/?state=TestPapers", { replace: true })
            })
            .catch((error) => {
              console.log(error.message)
              setspin(null)
      
            });
    }


    return (
        allqs ? <section className='main-ques'>
            <div className="heading" >
                <h3>ONLINE TEST</h3>
                {/* <Button variant="contained"><CountdownTimer time={180}/></Button> */}
                {/* <div style={{display:"flex",backgroundColor:"white",color:"black",padding:"5px",boxShadow:" 1px 2px 3px 4px rgba(184, 182, 182, 0.4)",fontWeight:"bold"}}><CountdownTimer/></div> */}
            </div>
            <div className="box-ques">
                <div className="ques-leftp">
                    <div className="ques-secs">
                        {
                            l.map((d, i) => {
                                return (  
                                    <div className="ques-sec" style={{ backgroundColor: setq == i ? "rgb(6, 6, 115)" : "rgb(77, 77, 188)" }} onClick={() =>{ 
                                        if(i===1){
                                            if(!answers[0]){
                                                addAnswer(0,[])
                                            }
                                            setcurrq(0)
                                        }else if(i===2){
                                            if(!answers[(allqs.length)/3]){
                                                addAnswer((allqs.length)/3,[])
                                            }
                                            setcurrq((allqs.length)/3)
                                        }else if(i===3){
                                            if(!answers[2*(allqs.length/3)]){
                                                addAnswer(2*(allqs.length/3),[])
                                            }
                                            setcurrq(2*(allqs.length/3))
                                        }
                                       
                                        setsetq(i)}}>
                                        {d}
                                    </div>
                                )
                            })
                        }



                    </div>
                    <div className="ques-mainbox">
                        <div className="qno">
                            <div className="small-inst">
 
                            Question {allqs ? cr_q + 1 : "loading..."} {allqs?(allqs[cr_q]["type"]===0?"SELECT ONE CORRECT ANSWER":allqs[cr_q]["type"]===1?"SELECT ALL CORRECT OPTIONS ":allqs[cr_q]["type"]===2?"ENTER SINGLE DIGIT INTEGER":"ENTER NUMERICAL VALUE"):null}
                            </div>
                        <div className="marking-sch">
                            +{allqs?(allqs[cr_q]["marks"][0]):null} for RIGHT answer/{allqs?(allqs[cr_q]["marks"][1]):null} for WRONG answer
                        </div>
                       
                        </div>
                        <div className="question-box">
                            <p className='ques'>
                                {allqs ? allqs[cr_q].body : "loading..."}
                            </p>

                            {(allqs[cr_q]["type"] == 2 || allqs[cr_q]["type"] == 3) ? <div className="ans-input option" >

                                <input type="text" id='siq' value={(answers[cr_q] && answers[cr_q].length!=0)?`${answers[cr_q][0]}`:""} onInput={handleInputChange} onKeyPress={handleKeyPress} />

                            </div> : null}

                            {
                                allqs[cr_q].imageurl != "" ? <div className="ques-img">
                                    <img src={allqs ? allqs[cr_q].imageurl : "loading..."} alt="" />

                                </div> : null}


                            {allqs ? <div className="options">
                                {allqs[cr_q]["type"] == 1 ? allqs[cr_q].options.map((option, id) => (
                                    <div key={id} className="option">
                                        <input
                                            type="checkbox"
                                            id={id}
                                            checked={(answers[cr_q] && answers[cr_q].length!=0)?answers[cr_q].includes(id+1) :false}
                                            onChange={
                                                () => {
                                                    if (answers[cr_q].includes(id + 1)) {
                                                        const newArray = answers[cr_q].filter(item => item !== (id + 1));
                                                        addAnswer(cr_q,newArray)
                                                       
                                                    } else {
                                                        const array=[...answers[cr_q],id+1]
                                                        addAnswer(cr_q,array)
                                                        
                                                    }

                                                }
                                            }
                                        />
                                        <label for={id} style={{ wordWrap: 'break-word', maxWidth: '85%', fontSize: "medium" }}>

                                            {option}
                                        </label>
                                    </div>
                                )) : null
                                }

                                {allqs[cr_q]["type"] == 0 ? <form action="" className='form'>


                                    {allqs[cr_q].options.map((opt, index) => {
                                        return (
                                            <div className="option">

                                                <input type="radio" id={index} value={opt} name="opts" className='r' 
                                                checked={answers && (answers[cr_q] && answers[cr_q].length!=0?answers[cr_q][0]-1===index :false)} 
                                                onChange={() =>{ 
                                                    
                                                        const a=[]
                                                        a.push(index+1)
                                                        addAnswer(cr_q,a)
                                                    
                                                    }} />
                                                <label for={index} style={{ wordWrap: 'break-word', maxWidth: '85%', fontSize: "medium" }}>{opt}</label><br />
                                            </div>

                                        );
                                    })}

                                </form> : null}

                            </div> : null}
                        </div>
                    </div>

                    <div className="nav-btns-ques">
                        <div className="nav-btn-que" onClick={() =>addAnswer(cr_q,[])} >
                            CLEAR
                        </div>
                        <div className="nav-btn-que">
                            REVIEW
                        </div>
                        {
                            cr_q === 0 ? null :

                                <div className="nav-btn-que" onClick={() => {
                                   
                                    setcurrq(cr_q - 1)


                                }
                                } >
                                    PREVIOUS
                                </div>
                        }
                        {
                            cr_q === allqs.length - 1 ? null :

                                <div className="nav-btn-que" onClick={() => {
                                    
                                    
                                   

                                    
                                        

                                        
                                        if(!answers[cr_q+1]){
                                            addAnswer(cr_q+1,[])
                                        }
                                        setcurrq(cr_q + 1)
                                    


                                }
                                } >
                                    NEXT
                                </div>
                        }
                    </div>
                </div>
                <div className="ques-rightp">
                    <div className="stu-details">
                       
                        <div className="stu-data">

                            <CountdownTimer className="timer" time={resume=="false"?180:(180-((jdata.attempts[i][index].finishTime-jdata.attempts[i][index].startTime)/60000)).toFixed(0)}/>

                            <p className="stu-name">
                                {localStorage.getItem("user") ? jdata["name"] : null}
                            </p>
                        </div>

                    </div>
                    <div className="ques-palette">
                        <div className="p-head">Quesions Palette</div>
                        <div className="pal-ques">
                            {
                                allqs ? allqs.map((t, index) => {
                                    return (
                                        <>
                                            <div className={ answers && (!answers[index] ? "notvisited-q" : answers[index].length!=0 ? "solved-q" : "unsolved-q")} key={index} onClick={() => {
                                                setcurrq(index)
                                                
                                                if(!answers[index]){
                                                    addAnswer(index,[])
                                                }
                                                }}>
                                                {index + 1}
                                            </div>
                                        </>
                                    );
                                }) : null
                            }
                        </div>

                    </div>
                    <div className="no-ques">
                        <div className="p-head">Legend</div>
                        
                        <div className="exam-btns-ques">
                            
                            <div className="exam-btn-que" onClick={() => setd(true)}>
                                Actions
                            </div>
                            
                        
                            
                        </div>
                    </div>

                </div>

            </div>
            <div className="lay" style={{ display: dis ? "flex" : "none" }}>

                <div className="popup" >
                    <div className="h-cr">

                        <h3>Summary</h3>
                        <div className="cross" onClick={() => setd(false)} >
                            <strong>close</strong>
                        </div>
                    </div>
                    <div className="no-ques">
                       
                        <div className="no-qp">
                            <div className="sq">
                                Answered
                            </div>
                            <div className="usq">
                                 UnAnswered
                            </div>
                            <div className="nvq">
                                 Not visited
                            </div>
                            <div className="mq">
                                0 Marked
                            </div>
                        </div>
                        <div className="tqh">{allqs ? allqs.length : 54} Questions</div>
                        <div className="exam-btns-ques">
                            <div className="exam-btn-que"  onClick={()=> console.log(time)}>
                                Profile
                            </div>
                           
                            <div className="exam-btn-que">
                                Questions
                            </div>
                        
                            <div className="exam-btn-que" onClick={submit}>

                                {spin==="s"? <div className='spinner-cir'></div>:"Submit"}
                            </div>
                            <div className="exam-btn-que" onClick={pause}>

                                {spin==="p"? <div className='spinner-cir'></div>:"Pause"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> : <div className="s"><Spinner/></div>
    )
}

export default Questionp