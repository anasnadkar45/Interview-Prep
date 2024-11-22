import React, { useCallback, useState } from 'react'
import Search2 from './Search2';

const arr = ['anas', 'sara', 'vedant', 'asmer', 'avesh', 'lalit'];

const shuffle = (array) => {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

const Callback = () => {
    const [users, setUsers] = useState(arr);

    const handleSearch = useCallback((text) => {
        console.log(users[0]);
        
        const filteredUsers = arr.filter((user) => {
            return user.toLowerCase().includes(text.toLowerCase());
        })
        setUsers(filteredUsers);
    }, [users])

    return (
        <div>
            <div>
                <button onClick={() => setUsers(shuffle(arr))}>Shuffle</button>
                <Search2 onChange={handleSearch} />
            </div>
            <ul>
                {users.map((user) => (
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </div>
    )
}

export default Callback