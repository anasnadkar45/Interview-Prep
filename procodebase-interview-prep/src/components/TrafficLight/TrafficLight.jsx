import React, { useEffect, useState } from 'react'
const config = {
    red: { color: "#fc0703", duration: 4000, next: "green" },
    yellow: { color: "#fce303", duration: 1000, next: "red" },
    green: { color: "#0ffc03", duration: 4000, next: "yellow" },
};

export const TrafficLight = () => {
    const [currentColor, setCurrentColor] = useState('red');

    console.log(config[currentColor]);
    useEffect(()=>{
        let timer = setTimeout(()=>{
            setCurrentColor(config[currentColor].next)
        }, config[currentColor].duration);

        return ()=> clearTimeout(timer);
    },[currentColor]);
    return (
        <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div style={{ width: '100px', border: '1px solid black' }}>
                {Object.entries(config).map((item) => (
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '1px solid black', backgroundColor: item[0] === currentColor ? currentColor : '' }}></div>
                ))}
            </div>
        </div>
    )
}
