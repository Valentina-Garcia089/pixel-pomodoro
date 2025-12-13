import { useState, useEffect } from "react";
import './App.css'

function App() {

  // se crearán estados para el modo en el que se encuentra el pomodoro, para el tiempo faltante y para saber si este está corriendo
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(1500);
  const [running, setRunning] = useState(false);

  function handleStart (){
    setRunning(true);
  }

  function handlePause (){
    setRunning(false);
  }

  function handleReset (){
    setRunning(false);
  }

  useEffect(() => {
    let interval;
    if(running){
      interval = setInterval(() =>{
        setTimeLeft(prev => prev - 1);
      })
    }

    return () => {
      clearInterval(interval);
    };
  }, [running]);

  return (
    <>
      <div> modo: {mode}</div>
      <div> timeLeft: {timeLeft}</div>
      <div> running: {running === true ? "true" : "false"}</div>

      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </>
  )
}

export default App
