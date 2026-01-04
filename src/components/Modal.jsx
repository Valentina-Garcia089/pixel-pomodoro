import { animate, motion } from "framer-motion";
import soundIcon from "../assets/icons/sound.png";

function Modal ({prevMode}){
    const message = {
        focus: "The focus mode has finished.",
        shortBreak: "The shortBreak mode has finished.",
        longBreak: "The longBreak mode has finished."
    };

    const animations = {
        initial: { 
            opacity: 0, 
            y: 20,
            rotate: 0
        },

        animate: {
            opacity: 1, 
            y: 0,
            rotate: [0, -1, 0, 1, 0],

            transition: {
                opacity: {duration: 0.3},
                y: {duration: 0.3},
                rotate: {
                    duration: 0.9,
                    repeat:Infinity,
                    ease: "linear"
                }
            }
        },

        exit: {
            opacity: 0, 
            y: 20,

            transition: {
                duration: 0.3
            }
        }
    }



    return (
        <motion.div 
            className="completion-modal"
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="icon-container">
                <img src={soundIcon} alt="sound icon" />
            </div>
            <span>{message[prevMode]}</span>
        </motion.div>
    )
}

export default Modal;