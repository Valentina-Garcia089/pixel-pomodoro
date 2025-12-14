function Controls ({onStart, onPause, onReset, running}){
    return(
        <>
            <div>Running: {running ? "true" : "false"}</div>
            <button onClick={onStart}>Start</button>
            <button onClick={onPause}>Pause</button>
            <button onClick={onReset}>Reset</button>
        </>
    )
}

export default Controls;