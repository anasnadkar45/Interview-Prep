import React from 'react'

const Box = ({ item, handleClicked }) => {
    return item.isVisible ? (
        <div
            style={{
                border: 'solid black 1px', width: '50px', height: '50px',
                color: 'black', display: 'flex', justifyContent: 'center',
                alignItems: 'center'
            }}
            className={item.isClicked ? "green" : "yellow"}
            key={item.id}
            onClick={() => handleClicked(item)}
        >
            {item.id}
        </div>
    ) : (
        <div></div>
    )
}

export default Box