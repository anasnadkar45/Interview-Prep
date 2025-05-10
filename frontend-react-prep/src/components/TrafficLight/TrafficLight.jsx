import React, { useEffect, useState } from 'react'

const data = {
    red: {
        next: "green",
        delay: 4000
    },
    green: {
        next: "yellow",
        delay: 1000
    },
    yellow: {
        next: "red",
        delay: 5000
    },
};

export const TrafficLight = () => {
    const [currentColor, setCurrentColor] = useState(data.yellow.next);

    useEffect(() => {
        let timer = setTimeout(() => {
            setCurrentColor(data[currentColor].next);
        }, data[currentColor].delay)

        return () => clearTimeout(timer)
    }, [currentColor])

    return (
        <div style={{ width: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", gap: '5px', border: '1px solid', backgroundColor: 'black' }}>
            {Object.entries(data).map(([color, values]) => (
                <div style={{ width: '100px', height: '100px', border: '1px solid', borderRadius: '50%', backgroundColor: currentColor === color ? currentColor : "white" }}>

                </div>
            ))}
        </div>
    )
}
