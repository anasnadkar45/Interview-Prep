import { useEffect, useState, useMemo } from 'react';

const usePagination = (initialPage = 1, initialLimit = 5) => {
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(initialLimit);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
            const data = await response.json();

            if (data.length < limit) {
                setHasMore(false); // No more posts to fetch
            } else {
                setHasMore(true);
            }

            setPosts(data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [limit, page]);

    return useMemo(() => ({
        posts,
        limit,
        page,
        setLimit,
        setPage,
        hasMore,
        isLoading,
        error,
    }), [posts, limit, page, hasMore, isLoading, error]);
};

export default usePagination;
