import React, { useState } from 'react';
import usePagination from './usePagination';

const Artical = () => {
    const { posts, limit, page, setLimit, setPage, hasMore, isLoading, error } = usePagination();

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (hasMore) setPage((prev) => prev + 1);
    };

    return (
        <div>
            {/* row per page */}
            <div>
                <button onClick={() => setLimit(5)}>5 rows</button>
                <button onClick={() => setLimit(6)}>6 rows</button>
                <button onClick={() => setLimit(7)}>7 rows</button>
                <button onClick={() => setLimit(8)}>8 rows</button>
            </div>

            {/* Loading and Error Handling */}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching posts: {error.message}</p>}

            {/* No Posts Fallback */}
            {!isLoading && posts.length === 0 && <p>No posts available.</p>}

            {/* all posts */}
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h1>{post.id} {post.title}</h1>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>

            {/* pagination */}
            <div>
                <button onClick={handlePrev} disabled={page === 1 || isLoading}>{'<'}</button>
                <input
                    type="number"
                    value={page}
                    onChange={(e) => setPage(Number(e.target.value))}
                />
                <button onClick={handleNext} disabled={!hasMore || isLoading}>{'>'}</button>
            </div>
        </div>
    );
};

export default Artical;
