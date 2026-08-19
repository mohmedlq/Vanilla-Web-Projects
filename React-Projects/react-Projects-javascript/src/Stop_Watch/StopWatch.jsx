import React,{useEffect,useState,useRef} from "react";
import './Stopwatch.css'
function StopWatch()
{
    const[isRuning,setIsRuning]=useState(false);
    const[elapsedTime,setElpsedTime]=useState(0);
    const intervalIdRef=useRef(null);
    const startTimeRef=useRef(0);
useEffect(() => {
  if (isRuning) {
   intervalIdRef.current= setInterval(() => {
        setElpsedTime(Date.now()-startTimeRef.current)
    }, 10);
  }
  return () => {
    clearInterval(intervalIdRef.current);
  };
}, [isRuning]);
    function start()
    {
        setIsRuning(true);
        startTimeRef.current=Date.now()-elapsedTime;
    }
    function stop()
    {
        setIsRuning(false);
    }
    function reset()
    {
        setIsRuning(false);
        setElpsedTime(0);

    }
    function formatTime()
    {
        let hours=Math.floor(elapsedTime /(1000 * 60 * 60));
        let minutes=Math.floor(elapsedTime / (1000 * 60)%60);
        let seconds=Math.floor(elapsedTime / (1000)%60);
let miliseconds = Math.floor((elapsedTime % 1000) / 10);
        hours=String(hours).padStart(2,"0");
        minutes=String(minutes).padStart(2,"0");
        seconds=String(seconds).padStart(2,"0");
        miliseconds=String(miliseconds).padStart(2,"0");

        return `${hours} : ${minutes} : ${seconds} :${miliseconds}`;
    }
return(
    <div className="clock-container">
     <span className="clock">{formatTime()}</span><br />
    <button className="btn Button-Start" onClick={start}>Start</button> 
<button className="btn Button-Stop" onClick={stop}>Stop</button>
<button className="btn Button-Reset" onClick={reset}>Reset</button>
    </div>
)
}

export default StopWatch





