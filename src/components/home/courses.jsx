
import React from 'react'
import "./courses.css"

const Courses = () => {
  return (
    <section className='home_courses'>
        <div className="box_courses">

        <h1>Courses and Fees</h1>
        <div className="courses">
        <div className="home_course">
            <img src="https://www.pw.live/files001/JEE%20Exam.jpg" alt="" />
            <h4>IIT JEE(Jee main & Advanced)</h4>
            <p>ALLEN is equipped with the team of top most faculties for preparation of JEE (Main+Advanced)...</p>
            <div className="course-btn">
                <strong>view courses</strong>
            </div>
        </div>
        <div className="home_course">
            <img src="https://www.pw.live/files001/JEE%20Exam.jpg" alt="" />
            <h4>IIT JEE(Jee main & Advanced)</h4>
            <p>ALLEN is equipped with the team of top most faculties for preparation of JEE (Main+Advanced)...</p>
            <div className="course-btn">
                <strong>view courses</strong>
            </div>
        </div>
        </div>
        </div>
    </section>
  )
}

export default Courses