import React, { useEffect, useState } from 'react'

export const Toast = () => {
    const [toasts, setToasts] = useState([])
    const handleToast = () => {
        const id = Date.now()
        setToasts([...toasts, {
            id,
            duration: 3000,
        }]);
    };

    useEffect(() => {
        const timers = toasts.map((toast) => {
            setTimeout(() => {
                setToasts((prevToast) => prevToast.filter((t) => t.id !== toast.id))
            }, toast.duration)
        });

        return () => timers.forEach((timer) => clearTimeout(timer));
    }, [toasts])

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <button onClick={()=>{Toast('hii how are you')}}>Show Toast</button>
            <div style={{ position: 'absolute', right: '10px', top: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {toasts.length > 0 &&
                    toasts.map((toast) => (
                        <div key={toast.id} style={{ background: 'lightgray', padding: '10px', borderRadius: '5px' }}>
                            It's a toast no {toast.id}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
