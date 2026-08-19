import React,{useState} from "react";
import "./Counters.css"
function Counter()
{
const [count,setCount]=useState(0);
const incrementCount=()=>setCount(count=>count+1);
const decrementCount=()=>{
    if (count<=0) {
      alert("Cannot Decrement a Zero");
      return;
    }
    setCount(count=>count-1);
};
const reset=()=>setCount(count=>count=0);
return (
    <div className="counter-container">
      <span className="age-display">{count}</span>
      
      <div className="button-group">
        <button className="btn btn-increment" onClick={incrementCount}>Add One</button>
        <button className="btn btn-decrement" onClick={decrementCount}>Take Away</button>
        <button className="btn btn-reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}


export default Counter
