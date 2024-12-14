import React, { useState } from 'react'

export const ToastComponent = ({message}) => {
    const [toasts, setToasts] = useState([]);
    useEffect(() => {
        const timers = toasts.map((toast) => {
            setTimeout(() => {
                setToasts((prevToast) => prevToast.filter((t) => t.id !== toast.id))
            }, toast.duration)
        });

        return () => timers.forEach((timer) => clearTimeout(timer));
    }, [toasts]);


    return (
        <div>ToastComponent</div>
    )
}
