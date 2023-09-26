
import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated}) => {
    const navigate=useNavigate()
  return (
    <Route
     
      render={(props) =>
        isAuthenticated ? (
          <Component/>
        ) : (
          navigate('/login')
        )
      }
    />
  );
};

export default ProtectedRoute;
