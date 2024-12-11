// Calendar.js

import React, { useState } from 'react';
import { SampleEvent } from './Data';

export const Calendar = () => {
  const [events] = useState(SampleEvent);

  const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const Hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Weekly Calendar</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(7, 1fr)', border: '1px solid #ccc' }}>
        {/* Header Row: Empty corner cell + Day Headers */}
        <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}></div>
        {Days.map((day) => (
          <div
            key={day}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '10px',
              textAlign: 'center',
              fontWeight: 'bold',
              border: '1px solid #ddd',
            }}
          >
            {day}
          </div>
        ))}

        {/* Rows for each Hour */}
        {Hours.map((hour) => (
          <React.Fragment key={hour}>
            {/* Hour Label */}
            <div
              style={{
                padding: '10px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                border: '1px solid #ddd',
                fontWeight: 'bold',
              }}
            >
              {hour}
            </div>
            {/* Grid Cells for Each Day */}
            {Days.map((day) => (
              <div
                key={`${day}-${hour}`}
                style={{
                  height: '50px',
                  border: '1px solid #ddd',
                  position: 'relative',
                }}
              >
                {/* Check if there's an event for this day and hour */}
                {events
                  .filter((event) => event.day === day && event.hour === hour)
                  .map((event, index) => (
                    <div
                      key={index}
                      style={{
                        position: 'absolute',
                        top: '5px',
                        left: '5px',
                        right: '5px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        padding: '5px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        textAlign: 'center',
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
