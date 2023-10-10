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


function App() {
  
  

 
  return (
   
    
   <BrowserRouter>
   
    <Routes>
   

    
     <Route path="/">
                <Route index element={<HomePage/>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                <Route path="q"  element={
                  <ProtectedRoute>
                    <Quesionpage/>
                  </ProtectedRoute>
                }/>
                <Route path='soc' element={<Socketc/>}/>
                
    </Route> 
  
    </Routes>
    </BrowserRouter>
   

  );
}

export default App;
