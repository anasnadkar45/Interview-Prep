import React from 'react'

export const Circle = ({ numbCircles }) => {
    let size = numbCircles * 100
    return (
        <div style={{
            width: `${size}px`,
            height: `${size}px`,
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            borderRadius:'100%',
            border:'1px solid black',
        }}>
            {numbCircles > 1 && <Circle numbCircles={numbCircles - 1} />}
        </div>
    )
}
