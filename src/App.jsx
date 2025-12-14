import { useState, useEffect } from "react";
import './App.css'
import TimerDisplay from "./components/TimerDisplay";
import ModeDisplay from "./components/ModeDisplay";
import Controls from "./components/Controls";
import Tomato from "./components/Tomato";

function App() {

  // se crearán estados para el modo en el que se encuentra el pomodoro, para el tiempo faltante y para saber si este está corriendo
  const [mode, setMode] = useState("focus");
  const [focusCount, setFocusCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [running, setRunning] = useState(false);

  const modes = {
    focus: 1500,
    shortBreak: 300,
    longBreak: 900
  };

  function handleStart (){
    setRunning(true);
  }

  function handlePause (){
    setRunning(false);
  }

  function handleReset (){
    setRunning(false);

    setTimeLeft(modes[mode]);
  }




  //timer
  useEffect(() => {
    let interval;
    if(running){
      interval = setInterval(() =>{
        setTimeLeft(prev => prev - 1); //ultimo valor real. A este se le resta uno
      }, 1000)
    }

    return () => {
      clearInterval(interval);
    };
  }, [running]);



  //cambio de modo
  useEffect(() => {
    if(timeLeft === 0){
      setRunning(false);

      if(mode === "focus"){
        const nextFocusCount = focusCount +1;
        setFocusCount(nextFocusCount);
        if(nextFocusCount%4 === 0){
          setMode("longBreak");
          setTimeLeft(modes.longBreak);
        }
        else{
          setMode("shortBreak");
          setTimeLeft(modes.shortBreak);
        }
      }
      else{
        setMode("focus");
        setTimeLeft(modes.focus);
      }
    }

  }, [timeLeft, mode, focusCount]);


  function formatTime (seg) {
    let minutes = Math.floor(seg / 60);
    let seconds = seg %60;

    let minutesToString = String(minutes).padStart(2, "0");
    let secondsToString = String(seconds).padStart(2, "0");

    return minutesToString + ":" + secondsToString;
  }





  return (
    <div className="app">
      <div className="pomodoro">
        <ModeDisplay mode={mode} />
        <Tomato mode={mode} running={running}/>
        <TimerDisplay time= {formatTime(timeLeft)}/>
        <Controls 
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          running={running}
        />

        {/* <div> modo: {mode}</div> */}
        {/* <div> timeLeft: {formatTime(timeLeft)}</div> */}
        {/* <div> running: {running === true ? "true" : "false"}</div> */}

        {/* <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button> */}
      </div>
    </div>
  )
}

export default App
