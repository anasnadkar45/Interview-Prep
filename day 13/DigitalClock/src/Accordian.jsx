import { useState } from "react";

const AccordianData = [
  {
    heading: "heading 1",
    summary: "summary 1",
  },
  {
    heading: "heading 2",
    summary: "summary 2",
  },
  {
    heading: "heading 3",
    summary: "summary 3",
  },
];

export default function Accordian() {
  const [isExpand, setIsExpand] = useState(null);
  const expandAccordian = (index) => {
    if(isExpand === index){
        setIsExpand(null)
    }else{
        setIsExpand(index)
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {AccordianData.map((accordian, index) => (
        <div
          style={{
            width: "50%",
            backgroundColor: "gainsboro",
            borderRadius: "5px",
            display: "flex",
            placeItems: "baseline",
          }}
          onClick={() => {
            expandAccordian(index);
          }}
        >
          <input
            type="checkbox"
            onClick={(e) => e.stopPropagation()}
            name=""
            id=""
          />
          <div>
            <h3>{accordian.heading}</h3>
            <p>{isExpand === index && accordian.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
