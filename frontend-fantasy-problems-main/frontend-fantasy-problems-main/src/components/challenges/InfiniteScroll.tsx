
import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  body: string;
}

const InfiniteScrollSolution: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  
  // Fetch posts function
  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, generate mock data
      const newPosts = Array.from({ length: 5 }, (_, i) => ({
        id: page * 5 + i,
        title: `Post ${page * 5 + i}`,
        body: `This is the content of post ${page * 5 + i}. It contains some random text to demonstrate the infinite scroll functionality.`
      }));
      
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + 1);
      
      // Stop after 5 pages for demo purposes
      if (page >= 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Intersection observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          fetchPosts();
        }
      },
      { threshold: 1.0 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore]);
  
  // Initial fetch
  useEffect(() => {
    fetchPosts();
  }, []);
  
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="p-4 border rounded-lg bg-card card-hover">
            <h3 className="font-medium text-lg mb-1">{post.title}</h3>
            <p className="text-sm text-muted-foreground">{post.body}</p>
          </div>
        ))}
      </div>
      
      <div ref={loaderRef} className="flex justify-center py-4">
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Loading more...</span>
          </div>
        )}
        
        {!hasMore && posts.length > 0 && (
          <p className="text-sm text-muted-foreground">No more posts to load</p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollSolution;
