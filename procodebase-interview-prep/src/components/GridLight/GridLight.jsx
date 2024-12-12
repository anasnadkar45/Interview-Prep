import React, { useEffect, useState } from 'react'
const boxes = [
    1, 1, 1,
    1, 0, 1,
    1, 1, 1
];
export const GridLight = () => {
    const [gridSequence, setGridSequence] = useState([]);
    const [isRemoveIndex, setIsRemoveIndex] = useState(false);

    const handleGridLight = (index) => {
        if (!gridSequence.includes(index) && !isRemoveIndex) {
            setGridSequence([...gridSequence, index]);
            if (gridSequence.length === 7) {
                setIsRemoveIndex(true);
            }
        }
    }

    useEffect(() => {
        if (isRemoveIndex) {
            let timer = setTimeout(() => {
                setGridSequence((prevGridSequence) => {
                    if (prevGridSequence.length === 0) {
                        clearTimeout(timer);
                        setIsRemoveIndex(false)
                        return prevGridSequence;
                    }
                    return gridSequence.slice(0, -1);
                })
            }, 1000);
            return () => clearTimeout(timer);
        }

    }, [gridSequence, isRemoveIndex, setIsRemoveIndex])

    console.log(gridSequence)
    return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '10px' }}>
                {boxes.map((box, i) => (
                    box === 1 ? (
                        <div key={i} onClick={() => handleGridLight(i)} style={{ width: '100px', height: '100px', border: '1px solid black', backgroundColor: gridSequence.includes(i) ? 'yellow' : '' }}></div>
                    ) : (
                        <div key={i} style={{ width: '100px', height: '100px' }}></div>
                    )
                ))}
            </div>
        </div>
    )
}
