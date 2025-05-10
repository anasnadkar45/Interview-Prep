import React, { useEffect, useState } from 'react'

export const DataGrid = () => {

  const boxes = [
    1, 1, 1,
    1, 0, 1,
    1, 1, 1,
  ];

  const [activeTiles, setActiveTiles] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false)

  function handleGridLight(boxId) {
    if (!isCompleted && !activeTiles.includes(boxId)) {
      setActiveTiles([...activeTiles, boxId])
      if (activeTiles.length === 7) {
        setIsCompleted(true)
      }
    }
  }

  console.log(activeTiles);

  useEffect(() => {
    if (isCompleted) {
      let timer = setTimeout(() => {
        setActiveTiles((prev) => {
          if (prev.length > 0) {
            return prev.slice(0, -1);
          } else {
            clearInterval(timer);
            setIsCompleted(false)
            return prev
          }
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isCompleted, activeTiles]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Grid Light</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        {boxes.map((box, id) => (
          box === 1 ? (
            <div
              key={id}
              style={{
                width: '100px',
                height: '100px',
                border: '1px solid',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: activeTiles.includes(id) ? "yellow" : "white"
              }}
              onClick={() => handleGridLight(id)}
            >{id}</div>
          ) : (
            <div ></div>
          )
        ))}
      </div>
    </div>
  )
}
