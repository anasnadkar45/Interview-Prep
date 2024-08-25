import { useEffect, useState } from "react";

export default function Stopwatch() {
    const [hours, sethours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milisec, setMilisec] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning) {
            if (milisec < 99) {
                let timer2 = setInterval(() => {
                    setMilisec((prev) => prev + 1)
                }, 1)
                return () => clearInterval(timer2);
            }
            let timer = setInterval(() => {
                if (milisec === 99) {
                    setSeconds((prev) => prev + 1);
                    setMilisec(0);
                }
                if (seconds === 59) {
                    setMinutes((prev) => prev + 1);
                    setSeconds(0);
                    setMilisec(0);
                }

                if (minutes === 59) {
                    sethours((prev) => prev + 1);
                    setMinutes(0);
                    setSeconds(0);
                    setMilisec(0);
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [seconds, isRunning, milisec]);
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                }}
            >
                <h1>{hours.toString().padStart(2, '0')}</h1>:
                <h1>{minutes.toString().padStart(2, '0')}</h1>:
                <h1>{seconds.toString().padStart(2, '0')}</h1>:
                <h1>{milisec.toString().padStart(2, '0')}</h1>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                }}
            >
                <button onClick={() => setIsRunning(true)}>Start</button>
                <button onClick={() => setIsRunning(false)}>Stop</button>
                <button onClick={() => {
                    setIsRunning(false)
                    setSeconds(0)
                    setMinutes(0)
                    sethours(0)
                }}>Restart</button>
            </div>
        </div>
    );
}
