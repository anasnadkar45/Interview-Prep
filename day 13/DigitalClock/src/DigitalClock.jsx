import React, { useEffect, useState } from 'react'

const DigitalClock = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setSeconds(now.getSeconds());
            setHours(now.getHours());
            setMinutes(now.getMinutes());
        }
        updateTime();
        const intervelId = setInterval(updateTime,1000);
        return () => clearInterval(intervelId);
    })

    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value
    }
    return (
        <div className='w-[500px] mx-auto border border-gray-100 p-5'>
            <h1>Digital Clock</h1>
            <div className='flex items-center justify-center pt-4 gap-x-4 text-3xl'>
                <h2>{formatTime(hours)}</h2> : <h2>{formatTime(minutes)}</h2> : <h2>{formatTime(seconds)}</h2>
            </div>
        </div>
    )
}

export default DigitalClock