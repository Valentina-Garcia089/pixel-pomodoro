import { motion } from "framer-motion";

function Settings ({mode, onClose}){
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
                duration: 0.2
            }
        }
    }


    return(
        <motion.div
            className = "completion-modal modal-settings"
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="timer-container">
                <button className="timer-btn">
                    <img src="" alt="Incremento"/>
                </button>

                <input type="number" value={mode/60}/>

                <button className="timer-btn">
                    <img src="" alt="Decremento"/>
                </button>
            </div>

            <button 
                className="close-btn"
                onClick={onClose}
            >
                Cerrar
            </button>
        </motion.div>
    );

}

export default Settings;