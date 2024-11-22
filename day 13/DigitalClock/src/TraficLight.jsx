import { useEffect, useState } from "react";

const lightConfig = {
  red: {
    nextColor: "yellow",
    duration: 3,
  },
  yellow: {
    nextColor: "green",
    duration: 5,
  },
  green: {
    nextColor: "red",
    duration: 7,
  },
};

export default function TraficLight() {
  const [bgColor, setBgColor] = useState("red");
  const [forBg, setForBg] = useState('red');
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setBgColor(lightConfig[bgColor].nextColor);
    }, lightConfig[bgColor].duration * 1000);
    return () => clearTimeout(timer);
  }, [bgColor,forBg]);

  const handleDuration = () => {
    if(forBg && duration>0){
      lightConfig[forBg].duration = Number(duration);
      setDuration(0);
    }
  };

  console.log(lightConfig)

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "black",
          width: "100px",
          padding: "10px",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            border: "1px solid",
            borderRadius: "50%",
            backgroundColor: bgColor === "red" ? "red" : "",
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            border: "1px solid",
            borderRadius: "50%",
            backgroundColor: bgColor === "yellow" ? "yellow" : "",
          }}
        ></div>
        <div
          style={{
            width: "100px",
            height: "100px",
            border: "1px solid",
            borderRadius: "50%",
            backgroundColor: bgColor === "green" ? "green" : "",
          }}
        ></div>
      </div>

      <select name="bgColor" value={bgColor} onChange={(e) => setBgColor(e.target.value)}>
        <option value={"red"}>red</option>
        <option value={"yellow"}>yellow</option>
        <option value={"green"}>green</option>
      </select>

      <div>
        <select name="bgColor" value={forBg} onChange={(e) => setForBg(e.target.value)}>
          <option value={"red"}>red</option>
          <option value={"yellow"}>yellow</option>
          <option value={"green"}>green</option>
        </select>
        <input
          type="number"
          placeholder="enter a duration in seconds"
          onChange={(e) => setDuration(e.target.value)}
        />
        <button onClick={handleDuration}>Change Duration</button>
      </div>
    </div>
  );
}
