import React, { useEffect, useState } from 'react'

const url = 'https://jsonplaceholder.typicode.com/posts'
const AutoComplete = () => {
    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(searchInput)
    const [cachedResult, setCachedResult] = useState({});

    const fetchPosts = async () => {
        const response = await fetch(url);
        const result = await response.json();
        setPosts(result);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, 1000)

        return () => clearTimeout(timer);
    }, [searchInput])

    const FilterData = cachedResult[debouncedSearch] ?
        cachedResult[debouncedSearch] : posts.filter((post) => post.title.toLowerCase().includes(debouncedSearch.toLowerCase()))

    useEffect(() => {
        if (!cachedResult[debouncedSearch] && debouncedSearch.length > 0) {
            const FilterData = posts.filter((post) =>
                post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
            )
            setCachedResult((prev) => ({ ...prev, [debouncedSearch]: FilterData }))
        }
    }, [debouncedSearch, posts, cachedResult]);

    const displayData = cachedResult[debouncedSearch] || [];
    console.log(cachedResult)

    return (
        <div className='w-full flex flex-col items-center justify-center mt-10'>
            <input type="text" value={searchInput} onChange={handleSearch} />
            <div>
                {searchInput.length > 0 && displayData.map((post) => (
                    <p onClick={() => setSearchInput(post.title)}>{post.title}</p>
                ))}
            </div>
        </div>
    )
}

export default AutoComplete