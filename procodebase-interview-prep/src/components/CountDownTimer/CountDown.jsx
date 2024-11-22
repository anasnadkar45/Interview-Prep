import React, { useState } from "react";

export const CountDown = () => {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);

    const StartCountDown = () => { 
        
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh",
                width: "100vw",
                backgroundColor: "#1a1a2e",
                color: "#fff",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "20px",
                }}
            >
                <input
                    style={{
                        padding: "20px",
                        backgroundColor: "#333",
                        color: "#fff",
                        borderRadius: "5px",
                        textAlign: "center",
                        minWidth: "60px",
                    }}
                    value={hour.toString().padStart(2, "0")}
                    onChange={(e) => setHour(e.target.value)} 
                />
                <input
                    style={{
                        padding: "20px",
                        backgroundColor: "#333",
                        color: "#fff",
                        borderRadius: "5px",
                        textAlign: "center",
                        minWidth: "60px",
                    }}
                    value={minute.toString().padStart(2, "0")}
                    onChange={(e) => setMinute(e.target.value)}
                />
                <input
                    style={{
                        padding: "20px",
                        backgroundColor: "#333",
                        color: "#fff",
                        borderRadius: "5px",
                        textAlign: "center",
                        minWidth: "60px",
                    }}
                    value={second.toString().padStart(2, "0")}
                    onChange={(e) => setSecond(e.target.value)}
                />
            </div>
            <div>
                <button onClick={() => StartCountDown()}>Start</button>
            </div>
        </div>
    );
};
