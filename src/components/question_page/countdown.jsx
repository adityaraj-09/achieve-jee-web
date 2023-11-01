
import React, { Component } from 'react';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 3 * 60 * 60, // 3 hours in seconds
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000); // Update every second
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); // Clean up the interval when the component unmounts
  }

  tick = () => {
    if (this.state.secondsRemaining > 0) {
      this.setState((prevState) => ({
        secondsRemaining: prevState.secondsRemaining - 1,
      }));
    } else {
      clearInterval(this.intervalId); // Stop the countdown when it reaches zero
    }
  };

  render() {
    const { secondsRemaining } = this.state;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;

    return (
      <div className='cnt' style={{display:"flex",width:"max-content",gap:"5px",margin:"0"}}>
        <strong style={{margin:"0",padding:"0"}}>Time left: </strong>    
        <p style={{margin:"0",padding:"0"}}>
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </p>
      </div>
    );
  }
}

export default CountdownTimer;
