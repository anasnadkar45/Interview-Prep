import React, { useEffect, useState } from 'react'
const boxes = [
    1, 1, 1,
    1, 0, 1,
    1, 1, 1
];
export const GridLight = () => {
    const [tiles, setTiles] = useState([]);
    const [isRemoveTiles, setIsRemoveTiles] = useState(false)

    const handleTiles = (boxId) => {
        if (!tiles.includes(boxId) && !isRemoveTiles) {
            setTiles([...tiles, boxId]);
            if (tiles.length === 7) {
                setIsRemoveTiles(true);
            }
        }
    }

    useEffect(() => {
        if (isRemoveTiles) {
            let timer = setTimeout(() => {
                setTiles((prevTiles) => {
                    if (prevTiles.length === 0) {
                        clearTimeout(timer)
                        setIsRemoveTiles(false);
                        return prevTiles
                    }

                    return tiles.slice(0, -1)
                })
            }, 1000);

            return () => clearTimeout(timer)
        }
    }, [tiles, isRemoveTiles])

    console.log(tiles);
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
                {boxes.map((box, id) => (
                    box === 1 ? (
                        <div onClick={() => handleTiles(id)} key={id} style={{ width: '100px', height: '100px', border: '1px solid black', backgroundColor: tiles.includes(id) ? 'yellow' : '' }}></div>
                    ) : (
                        <div style={{ width: '100px', height: '100px' }}></div>
                    )
                ))}
            </div>
        </div>
    )
}
