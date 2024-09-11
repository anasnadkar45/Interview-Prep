import React, { useEffect, useState } from 'react'

const DigitalClock = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(()=>{
        let now = new Date();
        let timer = setInterval(()=>{
            setSeconds(now.getSeconds());
            setMinutes(now.getMinutes());
            setHours(now.getHours()%12);
        },1000)
        return () => clearInterval(timer)
    },[seconds,minutes,hours])
    
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex justify-center items-center gap-2 border p-4'>
                <h1>{hours.toString().padStart(2,'0')}</h1>:
                <h1>{minutes.toString().padStart(2,'0')}</h1>:
                <h1>{seconds.toString().padStart(2,'0')}</h1>
            </div>
        </div>
    )
}

export default DigitalClock