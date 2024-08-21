import React, { useState } from 'react'

const Data = [
    {
        id: 1,
        name: 'Continantal palac',
        price: '5000'
    },
    {
        id: 2,
        name: 'Montinantal palac',
        price: '3000'
    },
    {
        id: 3,
        name: 'Rontinantal palac',
        price: '4000'
    },
    {
        id: 4,
        name: 'Aontinantal palac',
        price: '2000'
    },
    {
        id: 5,
        name: 'Yontinantal palac',
        price: '8000'
    },
]

const FilterData = () => {
    const [filteredData, setFilteredData] = useState(Data)
    const filterByName = () => {
        const sortedData = [...Data].sort((a, b) => (
            a.name.localeCompare(b.name)
        ))
        setFilteredData(sortedData);
    }

    const filterByPrice = () => {
        const sortedData = [...Data].sort((a, b) => (
            a.price.localeCompare(b.price)
        ))
        setFilteredData(sortedData);
    }
    return (
        <div>
            <button onClick={filterByName}>Name</button>
            <button onClick={filterByPrice}>Price</button>
            {filteredData.map((room) => (
                <div key={room.id}>
                    <h1>{room.name}</h1>
                    <p>{room.price}</p>
                </div>
            ))}
        </div>
    )
}

export default FilterData