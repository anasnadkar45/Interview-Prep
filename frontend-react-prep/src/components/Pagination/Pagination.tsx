import React, { useEffect, useState } from "react";

export const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<number[]>([]);
    const totalPages = 10; // Corrected totalPages based on 100 items, 10 per page

    const handlePrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        const newData = Array.from({ length: 100 }, (_, i) => i).slice((currentPage - 1) * 10, currentPage * 10);
        setData(newData);
    }, [currentPage]);

    return (
        <div>
            <div>
                {data.map((item) => (
                    <div key={item}>{item}</div>
                ))}
            </div>

            <div>
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    Prev
                </button>
                <span> Page {currentPage} </span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};
