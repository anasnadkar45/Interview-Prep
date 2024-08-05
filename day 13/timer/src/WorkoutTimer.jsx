import React, { useEffect, useState } from 'react'

const WorkoutTimer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timeoutId
        if (isRunning) {
            timeoutId = setInterval(() => {
                setTime((prev) => prev + 1)
            }, 1000);
        }
        return () => clearTimeout(timeoutId);
    }, [isRunning]);

    const formatTime = (seconds) => {
        const sec = seconds % 60;
        const min = Math.floor(seconds / 60);
        const hour = Math.floor(min / 60);

        return (
            <div className='flex p-4 items-center text-3xl justify-center text-white'>
                <h2>{hour.toString().padStart(2,'0')}</h2> : <h2>{min.toString().padStart(2,'0')}</h2> : <h2>{sec.toString().padStart(2,'0')}</h2>
            </div>
        )
    }
    return (
        <div className='w-[500px] mt-60 mx-auto border border-gray-100 p-5'>
            <h2 className='text-3xl font-semibold text-center text-white'>Workout Timer</h2>
            {formatTime(time)}
            <div className='flex items-center justify-center pt-4 gap-x-4'>
                <button onClick={() => setIsRunning(true)} className='border border-gray-200 text-white px-5 py-2'>▶️ Start</button>
                <button onClick={() => setIsRunning(false)} className='border border-gray-200 text-white px-5 py-2'>⏸️ Pause</button>
                <button onClick={() => {
                    setIsRunning(false)
                    setTime(0);
                }} className='border border-gray-200 text-white px-5 py-2'>🔁 Restart</button>
            </div>
        </div>
    )
}

export default WorkoutTimer