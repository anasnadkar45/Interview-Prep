import React, { useState } from 'react';

export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 50;

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  }

  const renderPageNumber = () => {
    const pages = [];
    const maxPageToshow = 5;

    if (currentPage < 3) {
      pages.push(1, 2, 3, '...', totalPages)
    } else if (currentPage > totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages.map((page, index) =>
      typeof page === 'number' ? (
        <button
          key={index}
          style={{ backgroundColor: currentPage === page ? 'green' : '' }}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ) : (
        <span key={index} style={{ margin: '0 5px' }}>
          {page}
        </span>
      )
    );
  }
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <button disabled={currentPage === 1} onClick={handlePrev}>⬅️</button>
        {renderPageNumber()}
        <button disabled={currentPage === 10} onClick={handleNext}>➡️</button>
      </div>
    </div>
  );
};
