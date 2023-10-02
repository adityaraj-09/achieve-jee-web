

import React from 'react'

import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const jwtToken = localStorage.getItem("jwtToken")
  const navigate=useNavigate()
 

  useEffect(() => {
   
    if (!jwtToken) {
     
      return navigate("/login");
    }
    fetch('https://achieve-jee-server.onrender.com/api/istokenvalid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': jwtToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
      })
      .catch((error) => {
        return navigate("/login");
        
      });
  }, [jwtToken]);
  

  return children
};

export default ProtectedRoute;


