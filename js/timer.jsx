import React from "react";

class Timer extends React.Component {
    render() {
        return <div className='timer'>
            <p className='timer-text'> Pozostało: </p>
            <p className='timer-clock'>{this.props.counter}</p>
        </div>
    }
}

export default Timer;