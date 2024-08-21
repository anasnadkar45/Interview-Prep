import React, { useState } from 'react'

const Arr = [
    {
        id:1,
        heading:'Header 1',
        content:'Content 1',
    },
    {
        id:2,
        heading:'Header 2',
        content:'Content 2',
    },
    {
        id:3,
        heading:'Header 3',
        content:'Content 3',
    },
    {
        id:4,
        heading:'Header 4',
        content:'Content 4',
    },
    {
        id:5,
        heading:'Header 5',
        content:'Content 5',
    },
]

const Accordian = () => {
    const [activeAccordian, setActiveAccordian] = useState(null);
    const handleAccordian = (i) =>{
        setActiveAccordian(i);
    }
  return (
    <div>
        {Arr.map((item)=>(
            <div key={item.id}>
                <h1 onClick={()=>handleAccordian(item.id)} className='bg-slate-900 p-4 border'>{item.heading}</h1>
                <p>{activeAccordian === item.id && item.content}</p>
            </div>
        ))}
    </div>
  )
}

export default Accordian