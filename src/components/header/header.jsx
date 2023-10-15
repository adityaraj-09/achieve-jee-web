
import React from 'react'
import {Link} from "react-router-dom"
import Logo from "../../assets/logo.png"
import Profile from './profile';

const Header = () => {
 
 
  return (
    <>
      <div class="header-navbar" id="navbar-main">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <nav class="navbar navbar-default">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded> <span class="sr-only">Toggle
                    navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span
                    class="icon-bar"></span> </button>
                <a class="navbar-brand" href="/" itemscope itemtype="http://schema.org/Organization" itemprop="url" style={{width:"80px"}}><img
                    src={Logo} alt="Achieve Jee" className='logo' width="80"/> </a>
              </div>
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" data-hover="dropdown"
                data-animations="fadeInUp">

                <ul class="nav navbar-nav navbar-right" id="desktop-menu-top">
                  <li><a href="/home" class="active">Home </a> </li>
                  <li><Link to="/login" > Login/Signup</Link> </li>
                  <li><a href="/" class="active">Practice Test </a> </li>
                  <li><a href="/" class="active">Student Zone </a> </li>
                  {
                    localStorage.getItem("user")? <li onClick={()=>console.log("njnxj")}>
                      <a ><Profile /></a>
                      </li>:null
                  }
                  
                </ul>


                <div class="panel-group dlp-tab" id="mobile-menu-top">
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title"> <a href="/" aria-expanded="false"> HOME </a> </h4>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                          data-parent="#mobile-menu-top" href="#dlp-top-menu-1" aria-expanded="false"> DLP COURSES </a>
                      </h4>
                    </div>
                    <div id="dlp-top-menu-1" class="panel-collapse collapse">
                      <div class="panel-body">
                        
                        <div class="panel-group" id="menu-1">
                          <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                                  data-parent="#menu-1" href="#menu-sub-1" aria-expanded="false"> JEE (MAIN + ADVANCED)
                                  <img src="images/new.gif" width="22" height="9"/></a> </h4>
                            </div>
                            <div id="menu-sub-1" class="panel-collapse collapse">
                              <div class="panel-body">
                                <ul class="dropdown">
                                  <li> <a href="/study-material/study-material-jee-main-advanced.asp"
                                      class="p-0 m-0">Study Material <br></br>
                                      <small class="text-danger m-0">[Target 2024/2025]</small> </a></li>
                                  <li><a href="/testseries/testseries-jee-main-advanced.asp">Test Series (CBT + PEN
                                      PAPER) <br></br>
                                      <small class="text-danger">[Target 2024/2025]</small> </a></li>
                                  <li><a href="/cbt/cbt-jee-advanced.asp">Computer Based Test (CBT) <br></br>
                                      <small class="text-danger">[Target 2024/2025]</small> </a></li>
                                  <li><a href="/joint-package/joint-package-jee-main-advanced.asp">Joint Package (SMP +
                                      TS) <br></br>
                                      <small class="text-danger">[Target 2024/2025]</small> </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                                  data-parent="#menu-1" href="#menu-sub-2" aria-expanded="false"> JEE (MAIN) <img
                                    src="images/new.gif" width="22" height="9"/></a> </h4>
                            </div>
                            <div id="menu-sub-2" class="panel-collapse collapse">
                              <div class="panel-body">
                                <ul class="dropdown">
                                  <li><a href="/study-material/study-material-jee-main.asp">Study Material <br></br>
                                      <small class="text-danger m-0">[Target 2024/2025]</small></a></li>
                                  <li><a href="/testseries/testseries-jee-main.asp">Test Series (CBT + PEN PAPER) <br></br>
                                      <small class="text-danger m-0">[Target 2024/2025]</small> </a></li>
                                  <li><a href="/cbt/cbt-jee-main.asp">Computer Based Test (CBT) <br></br>
                                      <small class="text-danger m-0">[Target 2024/2025]</small> </a></li><a
                                    href="/cbt/cbt-jee-main.asp">
                                  </a>
                                  <li><a href="/cbt/cbt-jee-main.asp"></a><a
                                      href="/joint-package/joint-package-jee-main.asp">Joint Package (SMP + TS) <br></br>
                                      <small class="text-danger m-0">[Target 2024/2025]</small></a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                                  data-parent="#menu-1" href="#menu-sub-3" aria-expanded="false"> NEET(UG) <img
                                    src="images/new.gif" width="22" height="9"/></a> </h4>
                            </div>
                            <div id="menu-sub-3" class="panel-collapse collapse">
                              <div class="panel-body">
                                <ul class="dropdown">
                                  <li><a href="/study-material/study-material-pre-medical.asp">Study Material <br></br>
                                      <small class="text-danger m-0">[Target 2024/2025]</small> </a></li>
                                  <li><a href="/testseries/testseries-package-premedical.asp">Test Series <br></br>
                                      <small class="text-danger m-0">[Target 2024/2025]</small> </a></li>
                                  <li><a href="/joint-package/joint-package-premedical.asp">Joint Package (SMP + TS)
                                      <br></br>
                                      <small class="text-danger m-0">[Target 2024/2025]</small></a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                                  data-parent="#menu-1" href="#menu-sub-4" aria-expanded="false"> Class VI to X <img
                                    src="images/new.gif" width="22" height="9"/></a> </h4>
                            </div>
                            <div id="menu-sub-4" class="panel-collapse collapse">
                              <div class="panel-body">
                                <ul class="dropdown">
                                  <li><a href="/study-material/study-material-class6.asp">CBSE Class VI <br></br>
                                      <small class="text-danger m-0">[Target 2024]</small> </a></li>
                                  <li><a href="/study-material/study-material-class7.asp">CBSE Class VII <br></br>
                                      <small class="text-danger m-0">[Target 2024]</small> </a></li>
                                  <li><a href="/study-material/study-material-class8.asp">CBSE Class VIII <br></br>
                                      <small class="text-danger m-0">[Target 2024]</small> </a></li>
                                  <li><a href="/study-material/study-material-class9.asp">CBSE Class IX <br></br>
                                      <small class="text-danger m-0">[Target 2024]</small> </a></li>
                                  <li><a href="/study-material/study-material-class10.asp">CBSE Class X <br></br>
                                      <small class="text-danger m-0">[Target 2024]</small> </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>


                          <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                                  data-parent="#menu-1" href="#menu-sub-6" aria-expanded="false"> Olympiads <img
                                    src="images/new.gif" width="22" height="9"/></a> </h4>
                            </div>
                            <div id="menu-sub-6" class="panel-collapse collapse">
                              <div class="panel-body">
                                <ul class="dropdown">
                                  <li><a href="/olympiads/SMP-for-Science&Maths-Olympiads-Class-vi.asp">SMP for Science
                                      & Maths Olympiads Class VI </a></li>
                                  <li><a href="/olympiads/SMP-for-Science&Maths-Olympiads-Class-vii.asp">SMP for Science
                                      & Maths Olympiads Class VII </a></li>
                                  <li><a href="/olympiads/SMP-for-Science&Maths-Olympiads-Class-viii.asp">SMP for
                                      Science & Maths Olympiads Class VIII </a></li>
                                  <li><a href="/olympiads/SMP-for-Science&Maths-Olympiads-Class-ix.asp">SMP for Science
                                      & Maths Olympiads Class IX </a></li>
                                  <li><a href="/olympiads/SMP-for-Science&Maths-Olympiads-Class-x.asp">SMP for Science &
                                      Maths Olympiads Class X </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                          data-parent="#mobile-menu-top" href="#dlp-top-menu-11" aria-expanded="false"> SCHOLARSHIP </a>
                      </h4>
                    </div>
                    <div id="dlp-top-menu-11" class="panel-collapse collapse">
                      <div class="panel-body">
                        <ul class="dropdown">
                          <li><a
                              href="https://allenwebsite-general.s3.ap-south-1.amazonaws.com/dlp-website/pdf/2023-24/DLP-Scholarship-Criteria.pdf"
                              target="_blank">Scholarship Criteria</a></li>
                          <li><a href="/pdf/online-registration-process-for-scholarship.pdf">How to Apply for
                              Scholarship</a></li>
                          <li><a href="https://dlp.allen.ac.in/common/login-offline-online-2023-24.asp">Claim
                              Scholarship 2023-24</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                          data-parent="#mobile-menu-top" href="#dlp-top-menu-3" aria-expanded="false"> GENERAL
                          INFORMATION </a> </h4>
                    </div>
                    <div id="dlp-top-menu-3" class="panel-collapse collapse">
                      <div class="panel-body">
                        <ul class="dropdown">
                          <li><a
                              href="https://allenwebsite-general.s3.ap-south-1.amazonaws.com/dlp-website/pdf/2023-24/fee-structure.pdf"
                              target="_blank">Fee Structure at a Glance</a> </li>
                          <li><a href="/common/how-to-apply.asp">How to Apply</a> </li>
                          <li><a href="/common/about-cbt.asp">About Computer Based Test (CBT)</a> </li>
                          <li><a href="/common/about-study-material.asp">About DLP Study Material</a> </li>
                          <li><a href="/common/about-test-series.asp">About DLP Test Series</a> </li>
                          <li><a href="/common/about-jointpackage.asp">About DLP Joint Package</a> </li>
                          <li><a href="/common/about-mts.asp">About Major Test Series</a> </li>
                          <li><a href="/common/dsate.asp">About D-SAT</a> </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                          data-parent="#mobile-menu-top" href="#dlp-top-menu-4" aria-expanded="false"> STUDENT ZONE </a>
                      </h4>
                    </div>
                    <div id="dlp-top-menu-4" class="panel-collapse collapse">
                      <div class="panel-body">
                        <ul class="dropdown">
                          <li><a href="https://dlp.allen.ac.in/common/login-offline-online-2023-24.asp" target="_blank">
                              Student Login (2023-24) <img src="images/new.gif" width="22" height="9"/> </a></li>


                          <li class="dropdown-level-2"><a href="#" class="dropdown-toggle-1" data-toggle="dropdown"
                              role="button" aria-haspopup="true" aria-expanded="false"> FAQ's <i
                                class="fa fa-angle-down icon-l"></i></a>
                            <ul class="dropdown-menu-level-2 dropdownhover-bottom" style={{paddingleft: "15px"}}>
                              <li><a href="/common/faq.asp" target="_blank">General FAQ</a> </li>
                              <li><a href="/mts/mts-faq.asp" target="_blank">MTS FAQ </a> <img src="images/new.gif"
                                  width="22" height="9"/></li>
                              <li><a href="/common/cbt-faq.asp" target="_blank">CBT FAQ </a></li>
                              <li><a href="/olympiads/olympiad-faq.asp" target="_blank">Olympiads FAQ</a> </li>
                            </ul>
                          </li>
                          <li><a href="/common/download.asp">Download Schedule & Syllabus</a></li>
                          <li><a href="https://dsat.allen.ac.in/">Test Series Result (D-SAT)</a></li>
                          <li><a href="https://www.allen.ac.in/apps2324/GST">Download GST Receipt for <br></br>
                              (Session 2023-24) <img src="images/new.gif" width="22" height="9"/></a> </li>
                          <li><a href="https://www.allen.ac.in/apps2223/GST">Download GST Receipt for <br></br>
                              (Session 2022-23)</a> </li>

                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                          data-parent="#mobile-menu-top" href="#dlp-top-menu-5" aria-expanded="false"> All India Test
                          Centers</a> </h4>
                    </div>
                    <div id="dlp-top-menu-5" class="panel-collapse collapse">
                      <div class="panel-body">
                        <ul class="dropdown">
                          <li><a href="https://dlp.allen.ac.in/apps2324/AppForms/Testcenter">All India Test Centers
                              (2023-24) <img src="images/new.gif" width="22" height="9"/></a></li>
                          <li><a
                              href="https://allenwebsite-general.s3.ap-south-1.amazonaws.com/dlp-website/pdf/2023-24/cbt-test-center-cities.pdf"
                              target="_blank">CBT Center Cities (2023-24) <img src="images/new.gif" width="22"
                                height="9"/></a></li>

                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                          data-parent="#mobile-menu-top" href="#dlp-top-menu-2" aria-expanded="false"> ONLINE COURSES
                        </a> </h4>
                    </div>
                    <div id="dlp-top-menu-2" class="panel-collapse collapse">
                      <div class="panel-body">

                        <div class="panel-group" id="menu-1">
                          <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                                  data-parent="#menu-1" href="#menu-sub-7" aria-expanded="false"> JEE (Main+Advanced)
                                  <img src="images/new.gif" width="22" height="9"/></a> </h4>
                            </div>
                            <div id="menu-sub-7" class="panel-collapse collapse">
                              <div class="panel-body">
                                <ul class="dropdown">
                                  <li><a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/d92ac313c67b0ee884a2329290f30e16/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/8fbbc196a920790b606ba4c6a2446c63/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      class="item_course1 clearfix" target="_blank" rel="nofollow"
                                      onclick="gtag('event', 'Nurture', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'IIT-JEE Main + Advanced 2023-24'});">Nurture
                                      <br></br>
                                      <small class="text-danger">[Class X to XI Moving Students]</small></a></li>
                                  <li> <a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/d92ac313c67b0ee884a2329290f30e16/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/43191fd02bbb1510b439973799fe6904/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      class="p-0 m-0" target="_blank" rel="nofollow"
                                      onclick="gtag('event', 'Enthusiast', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'IIT-JEE Main + Advanced 2023-24'});">Enthusiast
                                      <br></br>
                                      <small class="text-danger m-0">[Class XI to XII Moving Students]</small> </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                                  data-parent="#menu-1" href="#menu-sub-8" aria-expanded="false"> JEE (MAIN) <img
                                    src="images/new.gif" width="22" height="9"/></a> </h4>
                            </div>
                            <div id="menu-sub-8" class="panel-collapse collapse">
                              <div class="panel-body">
                                <ul class="dropdown">
                                  <li><a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/d456b9ef304b0e28ee5b9d20fa01491f/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/8fbbc196a920790b606ba4c6a2446c63/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      class="item_course1 clearfix" target="_blank" rel="nofollow"
                                      onclick="gtag('event', 'Nurture', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'IIT-JEE Main 2023-24'});">Nurture
                                      <br></br>
                                      <small class="text-danger">[Class X to XI Moving Students]</small></a></li>
                                  <li> <a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/d456b9ef304b0e28ee5b9d20fa01491f/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/43191fd02bbb1510b439973799fe6904/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      class="item_course1 clearfix" target="_blank" rel="nofollow"
                                      onclick="gtag('event', 'Enthusiast', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'IIT-JEE Main 2023-24'});">Enthusiast
                                      <br></br>
                                      <small class="text-danger m-0">[Class XI to XII Moving Students]</small> </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                                  data-parent="#menu-1" href="#menu-sub-9" aria-expanded="false"> NEET(UG) <img
                                    src="images/new.gif" width="22" height="9"/></a> </h4>
                            </div>
                            <div id="menu-sub-9" class="panel-collapse collapse">
                              <div class="panel-body">
                                <ul class="dropdown">
                                  <li><a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/9e96a27920df31ca1dbba9f3e638db40/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/8fbbc196a920790b606ba4c6a2446c63/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      class="item_course1 clearfix" target="_blank" rel="nofollow"
                                      onclick="gtag('event', 'Nurture', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'NEET-UG 2023-24'});">Nurture
                                      <br></br>
                                      <small class="text-danger">[Class X to XI Moving Students]</small></a></li>
                                  <li> <a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/9e96a27920df31ca1dbba9f3e638db40/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/43191fd02bbb1510b439973799fe6904/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      class="item_course1 clearfix" target="_blank" rel="nofollow"
                                      onclick="gtag('event', 'Enthusiast', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'NEET-UG 2023-24'});">Enthusiast
                                      <br></br>
                                      <small class="text-danger m-0">[Class XI to XII Moving Students]</small> </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title"> <a class="accordion-toggle" data-toggle="collapse"
                                  data-parent="#menu-1" href="#menu-sub-10" aria-expanded="false"> Class VI to X <img
                                    src="images/new.gif" width="22" height="9"/></a> </h4>
                            </div>
                            <div id="menu-sub-10" class="panel-collapse collapse">
                              <div class="panel-body">
                                <ul class="dropdown">
                                  <li><a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/f7b69b50934c41b85901960dbe46d049/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/bc601d23fa7d8f1d6b526f5559037def/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      target="_blank" class="item_course1 clearfix"
                                      onclick="gtag('event', 'Class VI', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'CLASS VI 2023-24'});">
                                      Class VI <br></br>
                                      <small class="text-danger m-0">[ Pre Nurture ]</small> </a></li>
                                  <li><a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/f7b69b50934c41b85901960dbe46d049/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/562e24eb990c2d18204a8cd98f9e643f/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      target="_blank" class="item_course1 clearfix"
                                      onclick="gtag('event', 'Class VII', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'CLASS VII 2023-24'});">Class
                                      VII<br></br>
                                      <small class="text-danger m-0">[ Pre Nurture ]</small> </a></li>
                                  <li><a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/f7b69b50934c41b85901960dbe46d049/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/9d7e1adee3ba10fec7bea675bec110a9/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      target="_blank" class="item_course1 clearfix"
                                      onclick="gtag('event', 'Class VIII', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'CLASS VIII 2023-24'});">Class
                                      VIII <br></br>
                                      <small class="text-danger m-0">[ Pre Nurture ]</small> </a></li>
                                  <li><a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/f7b69b50934c41b85901960dbe46d049/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/5a07d4351e0ef2894b05ba8193d01648/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      target="_blank" class="item_course1 clearfix"
                                      onclick="gtag('event', 'Class IX', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'CLASS IX 2023-24'});">Class
                                      IX <br></br>
                                      <small class="text-danger m-0">[ Career Foundation ]</small> </a></li>
                                  <li><a
                                      href="https://digital.allen.ac.in/courses?qTjSkUwI=--a/a--a/a--/e-e////e--e////e-e/filters/e-e////e--e////e-e/://c---c////c---c///e-e////e--e////e-e/be5c7e7c0d3ff314ce0f3be7ed1a41d7/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/f7b69b50934c41b85901960dbe46d049/e-e////e--e////e-e////d-d///,//c---c///e-e////e--e////e-e/ec5d46dcafcbaa2e1f70b05aa75924bd/e-e////e--e////e-e////d-d//////d-d///,/e-e////e--e////e-e/sort/e-e////e--e////e-e/:/e-e////e--e////e-e//e-e////e--e////e-e//b-b/b-b/"
                                      target="_blank" class="item_course1 clearfix"
                                      onclick="gtag('event', 'Class X', {'event_category': 'ALLEN Digital Online Courses', 'event_label': 'CLASS X 2023-24'});">Class
                                      X <br></br>
                                      <small class="text-danger m-0">[ Career Foundation ]</small> </a></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title"> <a href="https://dlp.allen.ac.in/apps2021/Associate/"
                          aria-expanded="false"> BULK REGISTRATION </a> </h4>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Header