import React, { useState } from "react";

export const AvatarPopover = ({ allAvatars, selectedAvatar, setSelectedAvatar }) => {
  const [loading, setLoading] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(null); // Track which avatar is loading

  const handleAvatarChange = (avatar) => {
    void (async () => {
      try {
        setLoading(true);
        setLoadingAvatar(avatar.id); // Mark which avatar is loading

        let timer = setTimeout(() => {
          setSelectedAvatar(avatar);
          setLoading(false);
          setLoadingAvatar(null); // Reset after selection
        }, 2000);

        return () => clearTimeout(timer);
      } catch (e) {
        console.error(e);
        setLoading(false);
        setLoadingAvatar(null);
      }
    })();
  };

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px",
        backgroundColor: "slategray",
        padding: "10px",
        borderRadius: "20px",
      }}
    >
      {allAvatars.map((avatar) => (
        <div
          key={avatar.id}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: loading && loadingAvatar === avatar.id 
                ? "5px solid transparent" // Transparent border to show spinning effect
                : selectedAvatar.id === avatar.id
                ? "5px solid violet" // Selected avatar border
                : "5px solid slategray", // Default border
              animation: loading && loadingAvatar === avatar.id ? "spin 1s linear infinite" : "none", // Rotate when loading
            }}
          >
            <img
              src={avatar.source}
              alt=""
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              onClick={() => handleAvatarChange(avatar)}
            />
          </div>
          <span>{selectedAvatar.label}</span>
        </div>
      ))}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); border-top: 5px solid white; }
            100% { transform: rotate(360deg); border-top: 5px solid white; }
          }
        `}
      </style>
    </div>
  );
};
