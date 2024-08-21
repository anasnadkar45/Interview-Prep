import React from 'react'
import { useState } from 'react'


const DropDown = ({ componentData }) => {
    const [active, setActive] = useState(false)
    return (
        <div className='border p-2 rounded-md bg-slate-700' >
            <h1 onClick={() => setActive(!active)}>{componentData.title}</h1>
            {active && componentData.options.map((item, index) => (
                <ul key={index}>
                    <li className='bg-slate-500 mb-2' onClick={() => setActive(!active)}>{item}</li>
                </ul>
            ))}
        </div>
    )
}

export default DropDown