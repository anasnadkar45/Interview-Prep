// BookMyShow.js

import React, { useState } from 'react';
import { generateSeats } from './Data';

export const BookMyShow = () => {
  const [seats, setSeats] = useState(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Group seats by rows
  const groupedSeats = seats.reduce((acc, seat) => {
    acc[seat.row] = acc[seat.row] || [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  // Handle seat selection
  const toggleSeatSelection = (id) => {
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter((seatId) => seatId !== id));
    } else {
      setSelectedSeats([...selectedSeats, id]);
    }
  };

  // Handle booking seats
  const bookSeats = () => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        selectedSeats.includes(seat.id) ? { ...seat, status: 'sold' } : seat
      )
    );
    setSelectedSeats([]);
  };

  // Inline styles for different seat statuses
  const seatStyles = {
    base: {
      width: '40px',
      height: '40px',
      margin: '4px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      color: 'white',
      textAlign: 'center',
    },
    available: {
      backgroundColor: 'green',
    },
    sold: {
      backgroundColor: 'red',
      cursor: 'not-allowed',
    },
    bestseller: {
      backgroundColor: 'orange',
    },
    selected: {
      backgroundColor: 'blue',
    },
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h3>BookMyShow</h3>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {Object.entries(groupedSeats).map(([row, seatsInRow]) => (
          <div key={row} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>{row}</span>
            {seatsInRow.map((seat) => {
              const isSelected = selectedSeats.includes(seat.id);
              const seatStyle = {
                ...seatStyles.base,
                ...(seat.status === 'available' && seatStyles.available),
                ...(seat.status === 'sold' && seatStyles.sold),
                ...(seat.status === 'bestseller' && seatStyles.bestseller),
                ...(isSelected && seatStyles.selected),
              };

              return (
                <button
                  key={seat.id}
                  style={seatStyle}
                  onClick={() => seat.status === 'available' && toggleSeatSelection(seat.id)}
                  disabled={seat.status === 'sold'}
                  title={`Row ${seat.row} - Seat ${seat.number} (${seat.status})`}
                >
                  {seat.number}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <button
        onClick={bookSeats}
        disabled={selectedSeats.length === 0}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'purple',
          color: 'white',
          fontSize: '16px',
          cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Book Selected Seats
      </button>
    </div>
  );
};
