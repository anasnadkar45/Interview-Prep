import React, { useEffect, useRef, useState } from 'react'

const users = ['anas', 'sara', 'vedant', 'baktiyar', 'asmer'];

const MultiSelectInput = () => {
    const [input, setInput] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const inputRef = useRef(null)

    // Handle input change and filter users based on input
    const handleChange = (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);

        // Filter users based on input
        const newFilteredUsers = users.filter((user) =>
            user.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredUsers(newFilteredUsers);
    };

    const handleSelectUser = (user)=>{
        setSelectedUsers([...selectedUsers, user])
        setInput('')
        inputRef.current.focus();
    }

    return (
        <div >
            <div className='p-4 rounded-md border flex gap-4 flex-wrap'>
                {selectedUsers.length > 0 && selectedUsers.map((user) => (<div>{user}</div>))}
                <input ref={inputRef} type="text" value={input} className='border-none focus:outline-none' placeholder='add user' onChange={handleChange} />
            </div>
            <div>
                {input.length > 0 && filteredUsers.map((user) => (
                    <p onClick={()=>handleSelectUser(user)}>{user}</p>
                ))}
            </div>
        </div>
    )
}

export default MultiSelectInput