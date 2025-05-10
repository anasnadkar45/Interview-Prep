import React, { useEffect, useState } from 'react'

const DigitalClock = () => {
    const [time, setTime] = useState(Date);
    console.log(new Date)

    useEffect(() => {
        let timer = setTimeout(() => {
            setTime(Date)
        }, 1000)

        return ()=> clearTimeout(timer)
    }, [time])

    return (
        <div>
            {time}
        </div>
    )
}

export default DigitalClock