

import React from 'react'

import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { decryptString } from './encryption';

const ProtectedRoute = ({ children,redirect }) => {
  const token=decryptString(localStorage.getItem("jwtToken"))
  const navigate=useNavigate()
 

  useEffect(() => {
   
    if (!token) {
      
      return navigate("/login");
    }
    fetch('https://achieve-jee-server.onrender.com/api/istokenvalid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
      })
      .catch((error) => {
        localStorage.removeItem("jwtToken")
          localStorage.removeItem("user")
        return navigate(redirect);
        
      });
  }, [token]);
  

  return children
};

export default ProtectedRoute;


