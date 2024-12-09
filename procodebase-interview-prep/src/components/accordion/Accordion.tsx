import React, { useState } from 'react'

const data = [
    {
        id: 1,
        name: 'faq1',
        desc: 'description',
    },
    {
        id: 2,
        name: 'faq1',
        desc: 'description',
    },
    {
        id: 3,
        name: 'faq1',
        desc: 'description',
    },
    {
        id: 4,
        name: 'faq1',
        desc: 'description',
    },
    {
        id: 5,
        name: 'faq1',
        desc: 'description',
    },
]

export const Accordion = () => {
    const [isSeclected, setIsSelected] = useState(data[0].id)
    return (
        <div>
            <h1>Accordion</h1>
            <div>
                {data.map((item) => (
                    <div style={{ border: '1px solid black', padding: '10px' }}>
                        <div onClick={() => setIsSelected(item.id)} >{item.name}</div>
                        {isSeclected === item.id && <p>{item.desc}</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}
