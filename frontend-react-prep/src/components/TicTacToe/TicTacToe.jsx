import React, { useEffect, useState } from 'react'

export const TicTacToe = () => {
    const formations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    const [allBoxId, setAllBoxId] = useState([])

    const [xFormations, setXFormations] = useState([])
    const [oFormations, setOFormations] = useState([])
    const [isXActive, setIsXActive] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [winner, setWinner] = useState(null)

    const checkWinner = (playerMoves, player) => {
        for (const formation of formations) {
            if (formation.every(index => playerMoves.includes(index))) {
                setWinner(player);
                setIsCompleted(true);
                return;
            }
        }
    };

    // Check for winner whenever xFormations or oFormations change
    useEffect(() => {
        checkWinner(xFormations, "X");
        checkWinner(oFormations, "O");
    }, [xFormations, oFormations]);

    const handleFormation = (boxId) => {
        if (!isCompleted && !allBoxId.includes(boxId)) {
            if (isXActive) {
                setXFormations(prev => [...prev, boxId]);
            } else {
                setOFormations(prev => [...prev, boxId]);
            }
            setAllBoxId(prev => [...prev, boxId]);
            setIsXActive(!isXActive)
        }
    }

    const restartGame = () => {
        setXFormations([]);
        setOFormations([]);
        setAllBoxId([]);
        setIsCompleted(false);
        setWinner(null);
        setIsXActive(true);
    };

    console.log(xFormations)
    console.log(oFormations)
    console.log(winner)
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <h2>TicTacToe</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    width: '300px'
                }}>
                {Array.from({ length: 9 }, (_, i) => (
                    <div
                        key={i}
                        style={{
                            width: '100px',
                            height: '100px',
                            border: '1px solid',
                            display:'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize:'50px',
                        }}
                        onClick={() => handleFormation(i)}
                    >{xFormations.includes(i) ? "X" : oFormations.includes(i) ? "O" : ""}</div>
                ))}
            </div>
            {isCompleted && (
                <button onClick={restartGame} style={{ marginTop: '10px', padding: '10px', fontSize: '16px' }}>
                    Restart Game
                </button>
            )}
        </div>
    )
}
