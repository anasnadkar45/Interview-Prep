import React, { useEffect, useState } from 'react'

const ProgressBar = ({ value = 0 }) => {
    const [percent , setPersent] = useState(value);

    useEffect(()=> {
        setPersent(Math.min(100 , Math.max(value,0)));
    },[value])
    return (
        <div className='progress'>
            <div className='progress-bar' style={{ width: `${percent.toFixed()}%` }}></div>
            <span>{percent}%</span>
        </div>
    )
}

export default ProgressBar