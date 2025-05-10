import React from 'react'

export const Checkbox = ({ data, handleCheckbox }) => {

    return (
        <div>
            <div key={data.id}>
                <input type="checkbox" checked={data.isChecked} onChange={() => handleCheckbox(data.id)} />
                <span>{data.title}</span>
            </div>

            <div style={{ marginLeft: '20px' }}>
                {data.children && data.children.map((child) => (
                    <Checkbox data={child} handleCheckbox={handleCheckbox}/>
                ))}
            </div>
        </div>
    )
}
