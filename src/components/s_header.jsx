
import React from 'react'
import {Link} from "react-router-dom"
const SHeader = () => {
    return (
        <div class="top-nav collapse dont-collapse-sm" id="collapseExample">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12" id="bs-example-navbar-collapse-2" data-hover="dropdown" data-animations="fadeInUp">
                        <ul class="head" style={{ margin: "0px", padding: "0px" }}>
                            <li><a href="tel:+917443510275" class="visible-sm visible-md visible-lg "></a></li>
                            <li><a href="mailto:dlp@allen.in"> https://achieve-jee.onrender.com</a> </li>
                            <li class="pull-right"> <a href="/contact.asp">Contact Us</a></li>
                            <li class="pull-right"> <a href="https://dlp.allen.ac.in/enquiry/default.aspx?refferal=https://www.dlp.allen.ac.in"> Enquiry</a></li>
                            <li class="pull-right dropdown"> <a href="#" class="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> Free Mock Test </a>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2	">

                                    <li><a href="https://cbtdemoallen.azurewebsites.net/" >Mock Test for ALLEN CBT</a></li>

                                    <li><a href="https://dlp.allen.ac.in/mock-test-for-allen-cbt.asp ">Mock Test for ALLEN CBT</a></li>
                                    <li><a href="/ntse/free-ntse-sample-mock-test-papers-and-solutions.asp">Mock Papers for NTSE Stage-II</a></li>
                                    <li><a href="/aiot/neet-ug-aiims-free-mock-test-paper-and-solutions.asp">Mock Papers for NEET (UG)</a></li>
                                    <li><a href="/aiot/jee-advanced-free-mock-test-paper-and-solutions.asp">Mock Papers for JEE Advanced</a></li>
                                    <li><a href="/aiot/jee-main-free-mock-test-paper-and-solutions.asp">Mock Papers for JEE MAIN</a></li>
                                </ul>
                            </li>


                            <li class="pull-right"> <a href="https://dlp.allen.ac.in/apps2324/Associate/" class="apply-online" style={{background: "#3d52eb"}}> Bulk  Registration (DLP)</a></li>
                            <li class="pull-right" style={{ paddingright: "5px" }}> <Link to="/login" className='apply-online'>Login</Link></li>

                            


                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SHeader