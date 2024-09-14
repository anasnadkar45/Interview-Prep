import React, { useCallback, useEffect, useRef, useState } from 'react';
import PostCard from './PostCard';

const InfiniteScroll = () => {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [noMorePosts, setNoMorePosts] = useState(false); // New state variable

    const ref = useRef();

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/posts?limit=5&skip=${pages * 5}`);
            const data = await response.json();
            
            // Check if no more posts are returned
            if (data.posts.length < 5) {
                setNoMorePosts(true); // Set noMorePosts to true
            }

            setPosts([...posts, ...data.posts]);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [pages]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !loading && !noMorePosts) { // Ensure noMorePosts is false
                setPages((prev) => prev + 1);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
            observer.disconnect();
        };
    }, [ref, loading, noMorePosts]);

    return (
        <div>
            <h1>Infinite Scroll</h1>
            <div className='grid grid-cols-1 gap-4'>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {loading && <div>Loading...</div>}
            {noMorePosts && <div>No more posts available.</div>} {/* Message for no more posts */}
            
            <div ref={ref} />
        </div>
    );
};

export default InfiniteScroll;
