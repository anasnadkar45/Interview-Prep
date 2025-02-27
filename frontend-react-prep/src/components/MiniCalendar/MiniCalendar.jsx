import React, { useState } from "react";
import { calendarData } from "./data";

export const MiniCalendar = () => {
    const [data] = useState(calendarData);

    // Convert time string ("HH:MM") to a numeric position
    const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes; // Convert to minutes
    };

    return (
        <div>
            <h3>MiniCalendar</h3>
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    border: "1px solid #ccc",
                    width: "400px",
                    height: "2400px", // 24 * 100px
                }}
            >
                {Array.from({ length: 24 }, (_, i) => i).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            width: "100%",
                            height: "100px",
                            borderBottom: "1px solid #ddd",
                            position: "relative",
                        }}
                    >
                        <p style={{ width: "50px" }}>
                            {i < 10 ? `0${i}` : i}:00 {i < 12 ? "AM" : "PM"}
                        </p>
                    </div>
                ))}

                {data.map((item, index) => {
                    const startPosition = parseTime(item.startTime);
                    const endPosition = parseTime(item.endTime);
                    const eventHeight = endPosition - startPosition; // Height in minutes

                    return (
                        <div
                            key={index}
                            style={{
                                position: "absolute",
                                top: `${(startPosition / 60) * 100}px`,
                                height: `${(eventHeight / 60) * 100}px`,
                                left: "60px",
                                width: "300px",
                                backgroundColor: item.color,
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "5px",
                            }}
                        >
                            {item.title}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
