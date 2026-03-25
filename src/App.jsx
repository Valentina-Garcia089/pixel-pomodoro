import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import './App.css'
import TimerDisplay from "./components/TimerDisplay";
import ModeDisplay from "./components/ModeDisplay";
import Controls from "./components/Controls";
import Tomato from "./components/Tomato";
import Modal from "./components/Modal";
import bellSound from "./assets/sounds/bells.mp3"
import { div } from "framer-motion/client";
import Settings from "./components/Settings";


function App() {

  // se crearán estados para el modo en el que se encuentra el pomodoro, para el tiempo faltante y para saber si este está corriendo
  const [mode, setMode] = useState("focus");
  const [prevMode, setPrevMode] = useState(mode);
  const [focusCount, setFocusCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1500); // 25:00 -> 24:59 ...
  const [running, setRunning] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [newMode, setNewMode] = useState(mode);

  const audioRef = useRef(null);


  const modes = {
    focus: 1500,
    shortBreak: 300,
    longBreak: 900
  };

  function handleStart (){
    setRunning(true);
    setEndTime(Date.now() + timeLeft * 1000); //hora a la que debería terminar el pomodoro -> 10:00 -> 10:25 
  }

  function handlePause (){
    setRunning(false);
  }

  function handleReset (){
    setRunning(false);

    setTimeLeft(modes[mode]);
  }

  function handleOpenSettings (){
    if(running) setRunning(false);

    setOpenSettingsModal(true);
  }




  //timer
  useEffect(() => {
    if(!running || !endTime){
      return;
    }
    let interval;
    if(running){
      interval = setInterval(() =>{
        //para obtener presición con el pomodoro se calculará la diferencia real de tiempo
        const restante = Math.round((endTime - Date.now()) / 1000);
        setTimeLeft(Math.max(restante, 0)); //si restante es negativo se usa 0 y si no se usa restante para que el tiempo no baje de 0
      }, 1000)
    }

    return () => {
      clearInterval(interval);
    };
  }, [running, endTime]);



  //cambio de modo
  useEffect(() => {
    if(timeLeft === 0){
      setRunning(false);
      setPrevMode(mode);

      setOpenModal(true);
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



  //modal de finalización de un modo. Proceso de cierre automatico
  useEffect(() => {
    if(!openModal)
      return;

    setOpenModal(true);
    const timer = setTimeout(() => {
      setOpenModal(false);
    }, 8000)

    return() => {
      clearTimeout(timer);
    }
  }, [openModal]);



  useEffect(() => {
    if(!openModal)
      return;

    audioRef.current = new Audio (bellSound);
    audioRef.current.volume = 0.8; //TODO
    audioRef.current.loop = true;

    audioRef.current.play().catch(() => {});

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    };
  }, [openModal]);



  return (
    <div className="app">
      <div className="pomodoro">
        <ModeDisplay mode={mode} />
        <Tomato mode={mode} running={running}/>
        <TimerDisplay time= {formatTime(timeLeft)}/>
        <button 
          className="btn-settings"
          onClick={handleOpenSettings}
        >
          Settings
        </button>

        <Controls 
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          running={running}
        />

        {/* sin la condición siempre se va a renderizar el modal */}
        <AnimatePresence>
          {openModal && <div className="dark-layer"> 
            <Modal 
              prevMode = {prevMode}
            />
          </div>}

          {openSettingsModal && <div className="dark-layer">
            <Settings
                mode = {modes[mode]}
                onClose = {() => setOpenSettingsModal(false)}
            />
          </div>}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
