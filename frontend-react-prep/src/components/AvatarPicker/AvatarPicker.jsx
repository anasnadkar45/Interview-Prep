import React, { useState, useRef, useEffect } from "react";
import { AVATARS } from "./data";
import { AvatarPopover } from "./AvatarPopover";

export const AvatarPicker = () => {
  const [allAvatars, setAllAvatars] = useState(AVATARS);
  const [selectedAvatar, setSelectedAvatar] = useState(allAvatars[0]);
  const [popoverActive, setPopoverActive] = useState(false);
  const pickerRef = useRef(null); // Ref to track AvatarPicker container

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setPopoverActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={pickerRef} style={{ position: "relative" }}>
      {selectedAvatar && (
        <div
          key={selectedAvatar.id}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={selectedAvatar.source}
            alt=""
            style={{
              width: "150px",
              borderRadius: "50%",
              border: "10px solid violet",
              cursor: "pointer",
            }}
            onClick={() => setPopoverActive(!popoverActive)}
          />
          <span>{selectedAvatar.label}</span>
        </div>
      )}

      {popoverActive && (
        <AvatarPopover
          allAvatars={allAvatars}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
        />
      )}
    </div>
  );
};
