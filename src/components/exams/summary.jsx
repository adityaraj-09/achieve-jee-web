
import React from 'react'
import { useLocation } from 'react-router-dom'
import "./summ.css"
const Summary = () => {

  const location=useLocation()
  
  return (
    <div className="con-summary">
        <div className="box-summary">
            <div className="summ-head"><h2>Test Summary</h2></div>
            <div className="box-main-summ">
            <table>
                                    <tr>
                                        <th>Section name</th>
                                        <th>No of Questions</th>
                                        <th>Answered</th>
                                        <th>Not answered</th>
                                        <th>Marked for review</th>
                                        <th>Not visited</th>
                                       
                                    </tr>
                                    <tr>
                                      <td>Physics</td>
                                                <td>5</td>
                                                <td>5</td>
                                                <td>6</td>
                                                <td>15</td>
                                                <td>9</td>
                                            </tr>
                                    <tr>
                                      <td>Chemistry</td>
                                                <td>5</td>
                                                <td>5</td>
                                                <td>6</td>
                                                <td>15</td>
                                                <td>9</td>
                                            </tr>
                                    <tr>
                                      <td>Maths</td>
                                                <td>5</td>
                                                <td>5</td>
                                                <td>6</td>
                                                <td>15</td>
                                                <td>9</td>
                                            </tr>
            </table>
              <div className="btns-summary">
              <div className="back-btn-sum">Back</div>
                <div className="submit-btn-sum">Submit</div>
              </div>
            </div>
        </div>

    </div>
  )
}

export default Summary