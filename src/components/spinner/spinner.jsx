import React from 'react';
import './spinner.css'; // You'll create this CSS file

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
      <h1>Loading...Please wait </h1>
    </div>
  );
};

export default Spinner;
