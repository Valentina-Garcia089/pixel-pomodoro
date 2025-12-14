import tomatoFocus from "../assets/tomato/tomato-focus.gif";
import tomatoShortBreak from "../assets/tomato/tomato-short-break.gif"
import tomatoLongBreak from "../assets/tomato/tomato-long-break.gif"


function Tomato ({mode, running}){
    let src, alt;

    if(mode === "focus"){
        src = tomatoFocus;
        alt = "Tomato focusing";
    }
    else if(mode === "shortBreak"){
        src = tomatoShortBreak;
        alt = "Tomato short break";
    }
    else{
        src = tomatoLongBreak
        alt = "Tomato long break";
    }

    return (
        <div className="tomato-container">
            <img 
                src={src} 
                alt={alt} 
                className={`tomato ${running ? "enter" : "exit"}`}
            />
        </div>
    )
}

export default Tomato