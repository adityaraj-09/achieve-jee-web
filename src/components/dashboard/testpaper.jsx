
import React, { useEffect, useState } from 'react'
import { getCachedData, cacheData, getPid, pidData } from '../cached-api';
import "./testpaper.css"
import Spinner from '../spinner/spinner';
import { decryptData, decryptString } from '../encryption';
import { GrFormNext } from "react-icons/gr"

import { useNavigate } from 'react-router-dom';
import CameraComponent from '../exams/camera';
import { FaChevronDown } from "react-icons/fa";
import { IoCaretForwardSharp } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import FaceDetectionComponent from '../exams/face-detection';
import { Button } from '@mui/material';
const Testpaper = ({ alertFunction }) => {
  const [qs, setqs] = useState(null)
  const [tp, settp] = useState(0)
  const apiUrl = 'https://achieve-jee-server.onrender.com/api/papers'
  const token = decryptString(localStorage.getItem("jwtToken"))
  const jdata = decryptData(localStorage.getItem("user"))
  const navigate = useNavigate()
  const [attem_pid, setpid] = useState(null)
  useEffect(() => {
    const cachedData = getCachedData(apiUrl);

    if (cachedData) {

      setqs(cachedData);
    } else {


      fetch(apiUrl, {
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
          return response.json()
        })
        .then((responseData) => {

          setqs(responseData)
          cacheData(apiUrl, responseData);
        })
        .catch((error) => {

        });
    }
    return () => { };

  }, [])

  const openNewWindow = (id, resume, index) => {

    localStorage.setItem("pid", id);

    const url = `q/${resume}/${index}`;
    navigate('/' + url)




    // const features = `width=${width},height=${height},top=${top},left=${left} scrollbars=no,resizable=yes,status=no,toolbar=no,location=no,menubar=no`;

    // const win=window.open(url, windowName, features);
    // if (win) {
    //   win.onload = () => {
    //     const data = { id: id };
    //     win.postMessage(data, window.location.origin);
    //   }; 
    // }
  };

  const findPaperById = (id) => {
    for (let i = 0; i < qs.length; i++) {
      const paper = qs[i];
      if (paper._id === id) {

        return paper

      }

    }
  }

  return (
    !qs ? <Spinner /> : <div className="con-test">
      <h2>Test Papers</h2>

      <div className="type-exams">


        <div className="type-exam">

          <strong onClick={() => settp(0)}>Attempted</strong>
          {
            tp === 0 ? <div className="under-line"></div> : null
          }
        </div>
        <div className="type-exam">

          <strong onClick={() => settp(1)}>Upcoming</strong>
          {
            tp === 1 ? <div className="under-line"></div> : null
          }

        </div>
        <div className="type-exam">

          <strong onClick={() => settp(2)}>Live</strong>
          {
            tp === 2 ? <div className="under-line"></div> : null
          }
        </div>

      </div>


      <div className="con-test-papers">
        <div className="test-papers">
          {
            qs ? qs.map((data, i) => {
              const d = data._id
              const tq = data.total_q
              const tsq = data.qs.length
              const attempts = jdata.attempts
              return (((tp === 0 && attempts[d]) || (tp === 1 && !attempts[d])) ?
                <div className="test-paper" key={i}>
                  <div className="test-details">

                    <strong>{data.title}</strong>
                    <p>{data.duration} min | <span> {data.total_q} Questions</span></p>
                  </div>
                  <div className="actions">

                    <Button variant='contained' onClick={() => {
                      if (!jdata.verified) {
                        alertFunction("please verify your account")
                      } else {
                        openNewWindow(d, "false", jdata.attempts[d].length)
                      }
                    }}>start</Button>
                    {
                      tp === 0 && <Button key={d} variant='contained' onClick={() => {
                        let st = attempts[d][attempts[d].length - 1].startTime
                        let finaldata = { ...data, startTime: st }
                        localStorage.setItem("paper", JSON.stringify(finaldata))

                        navigate("/result")
                      }}>view result</Button>
                    }
                    {tp === 0 && (attem_pid != d ? <IoCaretForwardSharp style={{ fontSize: "30px" }} onClick={() => {
                      console.log(jdata.attempts[d])
                      setpid(d)
                    }} /> : <FaCaretDown style={{ fontSize: "30px" }} onClick={() => {

                      setpid(null)
                    }} />)}
                  </div>


                  {
                    attem_pid == d && tp === 0 ? <div className="test-paper-attempts"><div className="tp-attempt" >
                      {
                        jdata.attempts[attem_pid].map((data, id) => {
                          var date = new Date(data.startTime)
                          return <div className="attempt-info">
                            <p><strong>({id + 1})</strong> At {date.toLocaleDateString()}</p>

                            {
                              data.status === 1 && <Button variant="contained" onClick={() => {
                                let paper = findPaperById(attem_pid);
                                let finaldata = { ...paper, startTime: data.startTime }
                                localStorage.setItem("paper", JSON.stringify(finaldata))
                                navigate("/result")
                              }}>result</Button>
                            }
                            {
                              (data.status === 0 || data.status === 2) && <Button  variant="outlined" onClick={() => {
                                openNewWindow(d, "true", id)
                              }}>Resume</Button>
                            }

                            {/* {data.status===0? <h4>resume</h4>:null} */}
                          </div>
                        })
                      }
                    </div></div> : null
                  }



                </div> : null)
            }) : null
          }
        </div>


      </div>

    </div>
  )
}

export default Testpaper