import React, { useState, useEffect, useRef } from "react";

export default function CursorFollow() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [delayedPosition, setDelayedPosition] = useState({ x: 0, y: 0 });
    const requestRef = useRef(null);

    const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    const animate = () => {
        setDelayedPosition((prevPos) => ({
            x: prevPos.x + (position.x - prevPos.x) * 0.1, // Adjust the factor for more or less delay
            y: prevPos.y + (position.y - prevPos.y) * 0.1,
        }));
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(requestRef.current);
        };
    }, [position]);

    return (
        <div>
            <div
                style={{
                    position: "absolute",
                    top: delayedPosition.y - 10,
                    left: delayedPosition.x - 10,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "blue",
                    pointerEvents: "none",
                    transform: `translate(-50%, -50%)`,
                }}
            />
        </div>
    );
}
