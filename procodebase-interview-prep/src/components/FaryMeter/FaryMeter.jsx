import React, { useEffect, useState } from 'react'

// set a price for per 1km = 4rs 
// set a timer for per second the distance will be calculated 1k = 1000 i.e 1s - 10m, 60s-600m , 100s- 1000m

export const FaryMeter = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [faryPrice, setFaryPrice] = useState(0);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        if (isRunning) {
            let timer = setInterval(() => {
                setDistance((prev) => prev + 10);
                let total = (distance / 1000) * 4;
                setFaryPrice(total)
            }, 1000)

            return ()=> clearInterval(timer)
        }
    }, [isRunning, distance])
    return (
        <div>
            <h1>Total :- {faryPrice}rs</h1>
            <div>
                <button onClick={()=> setIsRunning(true)}>Start</button>
                {isRunning && <button onClick={() => setIsRunning(false)}>Stop</button>}
                <button>Reset</button>
            </div>
        </div>
    )
}
