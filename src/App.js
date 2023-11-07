import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie';
import { Route, Routes,Navigate, BrowserRouter } from "react-router-dom";
import HomePage from './pages/home';
import LoginPage from './pages/login';
import Quesionpage from './pages/quesionpage';
import ProtectedRoute from './components/protecdroute';
import { useState } from 'react';
import RequireAuth from './components/requireAuth';
import { AuthContextProvider } from './AuthContext';
import Dashboard from './components/dashboard/dashboard';
import Socketc from './pages/socketc';
import OTPVerificationPage from './components/dashboard/verify_otp';
import OtpPage from './pages/otp-verify';


function App() {
  
  
    const body = document.body;

    if(localStorage.getItem("theme")){
      document.body.className = '';
      body.classList.add(localStorage.getItem("theme"))
    }else{
      body.classList.add("light-theme");
    }
    


 
  return (
   
    
   <BrowserRouter>
   
    <Routes>
   

    
     <Route path="/">
                <Route index element={<ProtectedRoute redirect={"/home"}><Dashboard/></ProtectedRoute>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='home' element={<HomePage/>}/>
                <Route path="q"  element={
                  <ProtectedRoute>

                    <Quesionpage/>
                  </ProtectedRoute>
                 
                }/>
                
                <Route path='verify-otp' element={<OtpPage/>}/>
                
    </Route> 
  
    </Routes>
    </BrowserRouter>
   

  );
}

export default App;
