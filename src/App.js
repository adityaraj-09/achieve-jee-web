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


function App() {
  
  

 
  return (
   
    
   <BrowserRouter>
   
    <Routes>
   

    
     <Route path="/">
                <Route index element={<HomePage/>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path="q"  element={
                  <ProtectedRoute>
                    <Quesionpage/>
                  </ProtectedRoute>
                }/>
    </Route> 
  
    </Routes>
    </BrowserRouter>
   

  );
}

export default App;
