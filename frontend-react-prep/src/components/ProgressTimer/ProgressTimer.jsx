import React, { useEffect, useState } from 'react'

export const ProgressTimer = () => {
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);
    const handleTimer = () => {
        if (timer > 0) {
            setLoading(true);
        }
    };


    useEffect(() => {
        if (loading && timer > 0) {
            const id = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(id);
                        setLoading(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(id);
        }
    }, [loading])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: "10px"
        }}>
            <input type="number" onChange={(e) => setTimer(e.target.value)} />
            <button onClick={handleTimer}>Start</button>
            <div style={{
                width: '400px',
                height: '10px',
                border: '1px solid'
            }}>
                <div></div>
            </div>
            <p>{timer}</p>
        </div>
    )
}
