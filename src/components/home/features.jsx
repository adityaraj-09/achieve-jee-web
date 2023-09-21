
import React from 'react'
import "./features.css"
import {ImUsers} from "react-icons/im"
import {RiComputerFill} from "react-icons/ri"
import {SiBookstack} from "react-icons/si"

const Features = () => {
    return (
        <section className="con-features">
            <div className="box-features">
                <h1>Key Features</h1>
                <div className="features">
                    <div className="feature">
                        <div className="cir-feat"><ImUsers className='feat-ic'/></div>
                        <strong>Researched Content</strong>
                        <div className="line-feat"></div>
                        <p>The content of study material is based on latest examination pattern which extensively covers the entire syllabus.</p>
                        <div className="box-col"></div>
                    </div>
                    <div className="feature">
                        <div className="cir-feat"><RiComputerFill className='feat-ic'/></div>
                        <strong>Researched Content</strong>
                        <div className="line-feat"></div>
                        <p>The content of study material is based on latest examination pattern which extensively covers the entire syllabus.</p>
                        <div className="box-col"></div>
                    </div>
                    <div className="feature">
                        <div className="cir-feat"><SiBookstack className='feat-ic'/></div>
                        <strong>Researched Content</strong>
                        <div className="line-feat"></div>
                        <p>The content of study material is based on latest examination pattern which extensively covers the entire syllabus.</p>
                        <div className="box-col"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features