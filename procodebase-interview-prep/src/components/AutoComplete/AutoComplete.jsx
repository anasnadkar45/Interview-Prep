import React, { useCallback, useEffect, useState } from 'react';

export const AutoComplete = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const api = 'https://fakestoreapi.com/products';

    const fetchData = async () => {
        try {
            const response = await fetch(api);
            const result = await response.json();
            setData(result);
        } catch (e) {
            console.error(e)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const debouncedFilter = useCallback(() => {
        let timer = setTimeout(() => {
            const newSuggestions = data.filter((item) =>
                item.title.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(newSuggestions);
            if (input.length === 0) {
                setSuggestions([]);
            }
        }, 500)

        return () => clearTimeout(timer);
    }, [input, data])

    useEffect(() => {
        debouncedFilter();
    }, [input, debouncedFilter]);

    return (
        <div style={{ maxWidth: '500px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>AutoComplete</h1>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for products..."
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '16px',
                    }}
                />
                {suggestions.length > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderTop: 'none',
                            borderRadius: '0 0 5px 5px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            zIndex: 10,
                        }}
                    >
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: '10px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #f0f0f0',
                                }}
                                onMouseDown={() => {
                                    setInput(suggestion.title)
                                    setSuggestions([])
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: suggestion.title.replace(
                                            new RegExp(`(${input})`, 'gi'),
                                            '<strong style="color: #007BFF">$1</strong>'
                                        ),
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
