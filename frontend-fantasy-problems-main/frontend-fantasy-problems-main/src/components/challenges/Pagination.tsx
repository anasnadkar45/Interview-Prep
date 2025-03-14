
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than or equal to max visible pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push({ value: i, type: 'page' });
      }
    } else {
      // Always show first page
      pages.push({ value: 1, type: 'page' });
      
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 2; i <= 4; i++) {
          pages.push({ value: i, type: 'page' });
        }
        pages.push({ value: -1, type: 'ellipsis' });
        pages.push({ value: totalPages, type: 'page' });
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push({ value: -1, type: 'ellipsis' });
        for (let i = totalPages - 3; i < totalPages; i++) {
          pages.push({ value: i, type: 'page' });
        }
        pages.push({ value: totalPages, type: 'page' });
      } else {
        // Middle
        pages.push({ value: -1, type: 'ellipsis' });
        pages.push({ value: currentPage - 1, type: 'page' });
        pages.push({ value: currentPage, type: 'page' });
        pages.push({ value: currentPage + 1, type: 'page' });
        pages.push({ value: -1, type: 'ellipsis' });
        pages.push({ value: totalPages, type: 'page' });
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);
  
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md border text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      
      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page.type === 'page' ? (
            <button
              onClick={() => onPageChange(page.value)}
              className={`h-8 w-8 rounded-md text-sm flex items-center justify-center transition-colors ${
                currentPage === page.value
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {page.value}
            </button>
          ) : (
            <span className="h-8 w-8 flex items-center justify-center">
              <MoreHorizontal size={16} />
            </span>
          )}
        </React.Fragment>
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

const PaginationSolution: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 100;
  const itemsPerPage = 10;
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="p-4 border rounded-lg bg-card">
        <h3 className="font-medium mb-2">Page {currentPage}</h3>
        <p className="text-sm text-muted-foreground">
          Showing items {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </p>
      </div>
      
      <PaginationComponent
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationSolution;
