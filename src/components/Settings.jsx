import { useState} from "react";
import { motion } from "framer-motion";

function Settings ({mode, onClose, onTimeChange}){
    const [inputMinutes, setInputMinutes] = useState(mode/60);
    const MIN = 1;
    const MAX = 59;

    const animations = {
        initial: { 
            opacity: 0, 
            y: 20,
            rotate: 0
        },

        animate: {
            opacity: 1, 
            y: 0,
        },

        exit: {
            opacity: 0, 
            y: 20,

            transition: {
                duration: 0.15
            }
        }
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        onTimeChange(inputMinutes);
        onClose();
    }


    return(
        <motion.div
            className = "completion-modal modal-settings"
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <form onSubmit={handleSubmit} className="form-container">
                <div className="timer-container">
                    <button 
                        type="button"
                        className="timer-btn"
                        onClick={() => setInputMinutes(prev => Math.max(MIN, prev -1))}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                        </svg>

                    </button>

                    <div className="input-container">
                        <input
                            className="timer-input"
                            type="number" 
                            value={inputMinutes}
                            min={MIN}
                            max={MAX}
                            onChange = {(e) => {
                                const number = e.target.value
                                if(number >=MIN && number <= MAX) setInputMinutes(number);
                                else if (e.target.value === "") {
                                    setInputMinutes("");
                                }
                            }}
                        />
                        <span>Min</span>
                    </div>

                    <button 
                        type="button"
                        className="timer-btn"
                        onClick={() => setInputMinutes(prev => Math.min(MAX, prev + 1))}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                        </svg>

                    </button>
                </div>
                <button type="submit" className="apply-btn">
                    Apply
                </button>
            </form>
        </motion.div>
    );

}

export default Settings;