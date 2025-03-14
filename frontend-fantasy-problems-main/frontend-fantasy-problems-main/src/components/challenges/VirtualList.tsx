
import React, { useState, useRef, useEffect } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
}

// Generate a large dataset
const generateItems = (count: number): Item[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
    description: `This is the description for item ${index + 1}. It contains some random text to make the item taller.`
  }));
};

const VirtualList: React.FC = () => {
  const [items] = useState<Item[]>(generateItems(10000));
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Constants for virtual list calculations
  const itemHeight = 80; // pixels
  const bufferSize = 5; // number of items to render before and after visible area
  
  useEffect(() => {
    // Set initial viewport height
    if (containerRef.current) {
      setViewportHeight(containerRef.current.clientHeight);
    }
    
    // Add resize event listener
    const handleResize = () => {
      if (containerRef.current) {
        setViewportHeight(containerRef.current.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    // Calculate which items should be visible
    if (viewportHeight === 0) return;
    
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + viewportHeight) / itemHeight) + bufferSize
    );
    
    setVisibleItems(items.slice(startIndex, endIndex + 1));
  }, [scrollTop, viewportHeight, items]);
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };
  
  // Calculate total scrollable height
  const totalHeight = items.length * itemHeight;
  
  // Calculate the starting position of the first visible item
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize);
  
  // Calculate offset for visible items
  const offsetY = startIndex * itemHeight;
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Virtual List</h2>
      <p className="mb-4 text-muted-foreground">
        This list efficiently renders only the visible items from a dataset of 10,000 items.
      </p>
      
      <div 
        ref={containerRef}
        className="border rounded-lg h-[600px] overflow-auto"
        onScroll={handleScroll}
      >
        {/* Spacer div to maintain scroll position */}
        <div style={{ height: totalHeight }} className="relative">
          <div style={{ position: 'absolute', top: offsetY }}>
            {visibleItems.map(item => (
              <div 
                key={item.id} 
                className="p-4 border-b last:border-b-0"
                style={{ height: itemHeight }}
              >
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>
          Scroll position: {Math.round(scrollTop)}px, 
          Visible items: {visibleItems.length} of {items.length},
          Current index: ~{Math.floor(scrollTop / itemHeight)}
        </p>
      </div>
    </div>
  );
};

export default VirtualList;
