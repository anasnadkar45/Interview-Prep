import React, { useMemo, useState } from 'react'

export const UseMemo = () => {
    const [input, SetInput] = useState(0);
    const [count, setCount] = useState(0);
    const multiple = useMemo(() => {
        console.log('rerendered')
        return input * 10;
    }, [input])
    return (
        <div>
            <input type="number" value={input} onChange={(e) => SetInput(e.target.value)} />
            <button onClick={() => setCount(count + 1)}>Increatement Count</button>
            <div>
                <h1>Count: {count}</h1>
                <h1>multiple : {multiple}</h1>
            </div>
        </div>
    )
}
