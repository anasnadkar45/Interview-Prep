import React, { useEffect, useState } from 'react'
import useThrottle from './useThrottle';

export const Throttle = () => {
    const [top, setTop] = useState(0);
    const throttledValue = useThrottle(top, 1000);


    useEffect(() => {
        const handleScroll = () => {
            setTop(window.scrollY)
        };

        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [])

    return (
        <div style={{ height: '1000rem' }}>
            <div style={{
                position: 'fixed',
                top: '0rem',
            }}>
                <h1>Normal: {top}</h1>
                <h1>Throttled: {throttledValue}</h1>
            </div>
        </div>
    )
}
