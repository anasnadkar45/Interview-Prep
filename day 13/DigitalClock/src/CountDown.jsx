import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [isRunning, setIsRunning] = useState(false);

    // Convert the input values into total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    useEffect(() => {
        let timeoutId;
        if (isRunning && totalSeconds > 0) {
            const countdown = totalSeconds;

            timeoutId = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds > 0) {
                        return prevSeconds - 1;
                    } else if (minutes > 0) {
                        setMinutes(prevMinutes => prevMinutes - 1);
                        return 59; // Reset seconds to 59 when a minute is decremented
                    } else if (hours > 0) {
                        setHours(prevHours => prevHours - 1);
                        setMinutes(59); // Reset minutes to 59 when an hour is decremented
                        return 59; // Reset seconds to 59
                    }
                    setIsRunning(false); // Stop the timer when it reaches zero
                    return 0;
                });
            }, 1000);
        }
        return () => clearInterval(timeoutId);
    }, [isRunning, hours, minutes, seconds]);

    const handleRestart = () => {
        setIsRunning(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };

    const handleStart = () => {
        // Validate input before starting the timer
        if (hours === 0 && minutes === 0 && seconds === 0) {
            alert('Please enter a valid time greater than 0.');
        } else {
            setIsRunning(true);
        }
    };

    return (
        <div className='space-y-3 border p-4 rounded-md'>
            <h1>Countdown Timer</h1>
            <div className='space-y-3'>
                <div className='max-w-[300px] mx-auto flex gap-2 justify-center'>
                    <input 
                        type="number" 
                        min="0" 
                        value={hours} 
                        onChange={(e) => setHours(Number(e.target.value))} 
                        placeholder='Hours' 
                        className='w-28 text-2xl text-center rounded-md bg-transparent border' 
                    />
                    <input 
                        type="number" 
                        min="0" 
                        value={minutes} 
                        onChange={(e) => setMinutes(Number(e.target.value))} 
                        placeholder='Minutes' 
                        className='w-28 text-2xl text-center rounded-md bg-transparent border' 
                    />
                    <input 
                        type="number" 
                        min="0" 
                        value={seconds} 
                        onChange={(e) => setSeconds(Number(e.target.value))} 
                        placeholder='Seconds' 
                        className='w-28 text-2xl text-center rounded-md bg-transparent border' 
                    />
                </div>
                <div className='space-x-2'>
                    <button onClick={handleStart}>Start</button>
                    <button onClick={() => setIsRunning(false)}>Pause</button>
                    <button onClick={handleRestart}>Restart</button>
                </div>
                <p>
                    {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
                </p>
            </div>
        </div>
    );
};

export default CountdownTimer;
