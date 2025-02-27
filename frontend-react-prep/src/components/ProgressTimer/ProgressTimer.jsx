import React, { useEffect, useState } from 'react'

export const ProgressTimer = () => {
    const [timerInput, setTimerInput] = useState(0);
    const [loading, setLoading] = useState(false)

    const handleTimer = () => {
        if (timerInput > 0) {
            setLoading(true);
        }
    }

    useEffect(() => {
        if (loading && timerInput > 0) {
            let timer = setTimeout(() => {
                setTimerInput((prev) => {
                    if (prev <= 0) {
                        clearTimeout(timer);
                        setLoading(false);
                        return 0;
                    } else {
                        return prev - 1;
                    }

                })
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [loading, timerInput])
    return (
        <div>
            <h2>Progress Timer</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <input type="number" value={timerInput} onChange={(e) => setTimerInput(e.target.value)} />
                <button onClick={handleTimer} disabled={loading}>{loading ? "Loading" : "Start"}</button>
            </div>

            <div style={{ width: '400px', height: '10px', border: '1px solid' }}>
                <div style={{ width: !loading ? '0%' : `${100 / timerInput}%`, height: '100%', backgroundColor: 'yellow' }}></div>
            </div>
            <span>{timerInput}</span>
        </div>
    )
}
