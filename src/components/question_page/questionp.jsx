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

const Questionp = () => {

    
    const {resume}=useParams()

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

    const [cr_q, setcurrq] = useState(0);
    const [setq, setsetq] = useState(0);
    const [dis, setd] = useState(true)
    const l = ["ALL", "PHY", "CHEM", "MATHS"]
    const [solved, setsolved] = useState([])
    let unsolved = [1]
    let notvisited = []
    const [answers,setAnswers]=useState({})
    const [spin, setspin] = useState(false)
    const [time,settime]=useState({})
    
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

    useEffect(() => {
        let t=time[cr_q]?time[cr_q]:0
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
    const token = decryptString(localStorage.getItem("jwtToken"))
    const jdata = decryptData(localStorage.getItem("user"))
    const i = localStorage.getItem("pid");
    let len=jdata["attempts"][i].length
    if(resume){
        setAnswers(jdata["attempts"][i][len-1].markedAns)
    }
    useEffect(() => {

        // setpid(i)

        if (i) {
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
    }, [i]);

    

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (/^\d{0,1}$/.test(value)) {
            const array=[]
            const a=parseInt(value)
            array.push(a)

            addAnswer(cr_q,array)
        }
    };

    function encryptAnswers(){
        const anss=encryptData(answers)
        return anss;
    }

    
    const submit=()=>{
        setspin(true)
        
        const data={
            hashmaps:answers,
            pid:i,
            time:time
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
        setspin(false)
        const data = encryptData(responseData)
        localStorage.setItem("user", data)
        navigate("/", { replace: true })

      })
      .catch((error) => {
        console.log(error.message)
        setspin(false)

      });
    }


    return (
        allqs ? <section className='main-ques'>
            <div className="heading" >
                <h3>ONLINE TEST</h3>
                <Button variant="contained"><CountdownTimer time={180}/></Button>
                {/* <div style={{display:"flex",backgroundColor:"white",color:"black",padding:"5px",boxShadow:" 1px 2px 3px 4px rgba(184, 182, 182, 0.4)",fontWeight:"bold"}}><CountdownTimer/></div> */}
            </div>
            <div className="box-ques">
                <div className="ques-leftp">
                    <div className="ques-secs">
                        {
                            l.map((d, i) => {
                                return (  
                                    <div className="ques-sec" style={{ backgroundColor: setq == i ? "rgb(6, 6, 115)" : "rgb(77, 77, 188)" }} onClick={() => setsetq(i)}>
                                        {d}
                                    </div>
                                )
                            })
                        }



                    </div>
                    <div className="ques-mainbox">
                        <div className="qno">
                            <div className="small-inst">
 
                            Question {allqs ? cr_q + 1 : "loading..."} {allqs?(allqs[cr_q]["type"]===0?"SELECT ONE CORRECT ANSWER":allqs[cr_q]["type"]===1?"SELECT ALL CORRECT OPTIONS ":"ENTER SINGLE DIGIT INTEGER"):null}
                            </div>
                        <div className="marking-sch">
                            +{allqs?(allqs[cr_q]["marks"][0]):null} for RIGHT answer/{allqs?(allqs[cr_q]["marks"][1]):null} for WRONG answer
                        </div>
                       
                        </div>
                        <div className="question-box">
                            <p className='ques'>
                                {allqs ? allqs[cr_q].body : "loading..."}
                            </p>

                            {allqs[cr_q]["type"] == 2 ? <div className="ans-input option" >

                                <input type="text" id='siq' value={(answers[cr_q] && answers[cr_q].length!=0)?`${answers[cr_q][0]}`:""} onInput={handleInputChange} />

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
                                                checked={ answers[cr_q].length!=0?answers[cr_q][0]-1===index :false} 
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
                        <div className="stu-img"><img src={jdata["image"]==""?"https://cdn-icons-png.flaticon.com/512/149/149071.png":jdata["image"]} alt="" /></div>
                        <div className="stu-data">

                            <CountdownTimer className="timer" time={180}/>

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
                                            <div className={!answers[index] ? "notvisited-q" : (answers[index].length!=0 ? "solved-q" : "unsolved-q")} key={index} onClick={() => {
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
                        <div className="tqh">{allqs ? allqs.length : 54} Questions</div>
                        <div className="exam-btns-ques">
                            <div className="exam-btn-que"  onClick={()=> console.log(time)}>
                                Profile
                            </div>
                            <div className="exam-btn-que" onClick={() => setd(true)}>
                                Instr
                            </div>
                            <div className="exam-btn-que">
                                Questions
                            </div>
                        
                            <div className="exam-btn-que" onClick={submit}>

                                {spin? <div className='spinner-cir'></div>:"Submit"}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="lay" style={{ display: dis ? "flex" : "none" }}>

                <div className="popup" >
                    <div className="h-cr">

                        <h3>INSTRUCTIONS</h3>
                        <div className="cross" onClick={() => setd(false)} >
                            <strong>close</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section> : <div className="s"><Spinner /></div>
    )
}

export default Questionp