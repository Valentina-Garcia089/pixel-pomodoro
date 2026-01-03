import { motion } from "framer-motion";
import soundIcon from "../assets/icons/sound.png";

function Modal ({mode}){
    const message = {
        focus: "The focus mode has finished.",
        shortBreak: "The shortBreak mode has finished.",
        longBreak: "The longBreak mode has finished."
    };

    return (
        <motion.div 
            className="completion-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="icon-container">
                <img src={soundIcon} alt="sound icon" />
            </div>
            <span>{message[mode]}</span>
        </motion.div>
    )
}

export default Modal;