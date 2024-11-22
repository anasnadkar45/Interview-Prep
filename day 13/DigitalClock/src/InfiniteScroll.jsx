import React, { useEffect, useRef, useState } from 'react'

const url = 'https://jsonplaceholder.typicode.com/posts';
const InfiniteScroll = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noMorePosts, setNoMorePosts] = useState(false);
    const ref = useRef(null);

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch(`${url}?_limit=${5}&_page=${page}`);
        const result = await res.json();
        setData([...data, ...result]);
        if (result.length < 5) {
            setNoMorePosts(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [page])

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !loading && !noMorePosts) {
                setPage((prevPage) => prevPage + 1);
            }
        }, options)

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
            observer.disconnect();
        }
    }, [ref, noMorePosts, loading])

    console.log(data)
    return (
        <div >

            <div className='space-y-3'>
                {data.map((post) => (
                    <div key={post.id} className='border p-4 rounded-lg'>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {noMorePosts && <p>No more post</p>}
            <div ref={ref}></div>
        </div>
    )
}

export default InfiniteScroll