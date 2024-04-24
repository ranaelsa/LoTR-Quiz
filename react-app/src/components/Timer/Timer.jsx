import "./Timer.css";
import { useEffect, useState, useRef} from "react";

function Timer({ duration, onTimerUp }) {
    const [counter, setCounter] = useState(0);
    const [timerProgress, setTimerProgress] = useState(0);
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCounter((cur) => cur + 1);
        }, 100);

        return () => clearInterval(intervalRef.current);
    }, []); 

    useEffect(() => {
        setTimerProgress((counter / duration ) * 100);

        if (counter >= duration) {
            clearInterval(intervalRef.current);
            onTimerUp();
        }

    }, [counter]);

    return (
        <div className="timer-container">
            <div 
                style={{
                    width: `${timerProgress}%`
                }}
                className="timer-progress">
            </div>
        </div>
    );
}

export default Timer;