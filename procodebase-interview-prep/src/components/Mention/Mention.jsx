import React, { useEffect, useState } from 'react';

export const Mention = () => {
    const [users, setUsers] = useState([]);
    const [input, setInput] = useState('');
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const api = 'https://fakestoreapi.com/users';
    console.log(users)

    // Fetch users from the API
    const fetchUsers = async () => {
        try {
            const response = await fetch(api);
            const result = await response.json();
            setUsers(result);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to handle input changes and detect mentions
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);

        const lastWord = value.split(' ').pop();
        console.log(lastWord);

        if(lastWord.startsWith('@')){
            const query = lastWord.slice(1).toLowerCase();
            if(query.length > 0){
                const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()) )
                setSuggestedUsers(filteredUsers);
                setShowSuggestions(true)
            }else{
                setShowSuggestions(false);
            }
        }else{
            setShowSuggestions(false);
        }
    }

    const handleUserClick = (username) =>{
        const Words = input.split(' ');
        Words[Words.length - 1] = `@${username}`;
        setInput(Words.join(' '));
        setShowSuggestions(false);
    }

    return (
        <div style={{ maxWidth: '500px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center' }}>Mention Feature</h2>
            <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Type something... Use @ to mention a user"
                rows="5"
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            />
            {showSuggestions && suggestedUsers.length > 0 && (
                <div
                    style={{
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        borderRadius: '0 0 5px 5px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        backgroundColor: '#fff',
                        position: 'relative',
                        zIndex: 10,
                    }}
                >
                    {suggestedUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleUserClick(user.username)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #f0f0f0',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                        >
                            {user.username}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
