import React, { useEffect, useState } from 'react'
const config = {
    red: { color: "#fc0703", duration: 4000, next: "green" },
    yellow: { color: "#fce303", duration: 1000, next: "red" },
    green: { color: "#0ffc03", duration: 4000, next: "yellow" },
};

export const TrafficLight = () => {
    const [currentColor, setCurrentColor] = useState('red');

    console.log(config[currentColor].next)
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentColor(config[currentColor].next)
        }, config[currentColor].duration)

        return () => clearTimeout(timer)
    }, [currentColor])

    console.log(Object.entries(config))
    return (
        <div>
            <div style={{ width: '200px', border: '1px solid black' }}>
                {Object.entries(config).map(([key, value]) => ({ name: key, ...value })).map((color) => (
                    <div style={{
                        width: '200px',
                        height: '200px',
                        border: '1px solid black',
                        borderRadius: '50%',
                        backgroundColor: color.name === currentColor ? color.color : ''
                    }}></div>
                ))}
            </div>
        </div>
    )
}
