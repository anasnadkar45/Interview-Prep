import React, { useEffect, useState } from 'react'

const CountDown = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [active, setActive] = useState(false);


    useEffect(() => {
        if (seconds >= 60) {
            const additionalMinutes = Math.floor(seconds / 60);
            setMinutes((prevMinutes) => prevMinutes + additionalMinutes);
            setSeconds(seconds % 60);
        }

        if (minutes >= 60) {
            const additionalHours = Math.floor(minutes / 60);
            setHours((prevHours) => prevHours + additionalHours);
            setMinutes(minutes % 60);
        }
    }, [seconds, minutes]);

    useEffect(() => {
        let timer;

        if (active) {

            timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                } else if (minutes > 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    setSeconds(59);
                } else if (hours > 0) {
                    setHours((prevHours) => prevHours - 1);
                    setMinutes(59);
                    setSeconds(59);
                } else {
                    setActive(false); // Stop the timer when it reaches zero
                }
            }, 1000);
            return () => clearInterval(timer)
        }
    }, [active, seconds, minutes, hours])
    return (
        <div>
            <div className='flex items-center gap-3 mb-4'>
                <input type="number" value={hours} placeholder='00' onChange={(e) => setHours(e.target.value)} />
                :
                <input type="number" value={minutes} placeholder='00' onChange={(e) => setMinutes(e.target.value)} />
                :
                <input type="number" value={seconds} placeholder='00' onChange={(e) => setSeconds(e.target.value)} />
            </div>
            <div className='flex gap-4 justify-center'>
                <button onClick={() => setActive(true)}>Start</button>
                <button onClick={() => {
                    setActive(false);
                    setSeconds(0);
                    setMinutes(0);
                    setHours(0);
                }}>Reset</button>
            </div>
        </div>
    )
}

export default CountDown