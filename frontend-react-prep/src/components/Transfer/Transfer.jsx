import React, { useState } from 'react'
import { data } from './data'

export const Transfer = () => {
    const [list, setList] = useState(data)
    console.log(list)

    const moveLeft = () => {
        setList((prevList) =>
            prevList.map((item) =>
                item.isChecked && item.columnNo === 2 ? { ...item, columnNo: 1 } : item
            )
        );
    }

    const moveAllLeft = () => {
        setList((prevList) =>
            prevList.map((item) => {
                return { ...item, columnNo: 1 }
            })
        );
    }

    const moveRight = () => {
        setList((prevList) =>
            prevList.map((item) =>
                item.isChecked && item.columnNo === 1 ? { ...item, columnNo: 2 } : item
            )
        );
    }

    const moveAllRight = () => {
        setList((prevList) =>
            prevList.map((item) => {
                return { ...item, columnNo: 2 }
            })
        );
    }

    const handleCheckboxChange = (id) => {
        setList((prevList) =>
            prevList.map((item) =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    }
    return (
        <div>
            <h2>Transfer</h2>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: '20px',
                border: '1px solid',
                padding: '10px',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
                    {list.map((item) => (
                        item.columnNo === 1 && (
                            <div key={item.id}>
                                <input
                                    type="checkbox"
                                    checked={item.isChecked}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                                <span>{item.name}</span>
                            </div>
                        )
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={moveAllLeft}>&lt;&lt;</button>
                    <button onClick={moveLeft}>&lt;</button>
                    <button onClick={moveRight}>&gt;</button>
                    <button onClick={moveAllRight}>&gt;&gt;</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
                    {list.map((item) => (
                        item.columnNo === 2 && (
                            <div key={item.id}>
                                <input
                                    type="checkbox"
                                    checked={item.isChecked}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                                <span>{item.name}</span>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}
