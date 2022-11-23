import { useState, useRef, useEffect } from "react";
import "../App.css";
import Button from "../components/Button";

function Appdelete() {
  const [showDeleteUI, setshowDeleteUI] = useState(false);
  const showDeleteref_btn = useRef(null);
  const showDeleteref_content = useRef(null);
  function updateshowDeleteUI() {
    setshowDeleteUI((prev) => !prev);
  }

  let dummydata = [
    { color: "red", value: "#f00" },
    { color: "green", value: "#0f0" },
    { color: "blue", value: "#00f" },
    { color: "cyan", value: "#0ff" },
    { color: "magenta", value: "#f0f" },
    { color: "yellow", value: "#ff0" },
    { color: "black", value: "#000" },
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDeleteref_btn.current &&
        !showDeleteref_btn.current.contains(event.target) &&
        showDeleteref_content.current &&
        !showDeleteref_content.current.contains(event.target)
      ) {
        setshowDeleteUI(false);
      }
    };
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []); 
 
  return (
    <div className="App">
      {showDeleteUI && (
        <style>{"body {background-color:rgba(0, 0, 0, 0.5)}"}</style>
      )}
      <Button
        showUI={showDeleteUI}
        showref={showDeleteref_btn}
        functionality={updateshowDeleteUI}
        value={"Delete"}
      />
      <div className="import">
        {showDeleteUI && (
          <div ref={showDeleteref_content}>
            <div className="drag-wrapper">
                
            </div>
          </div>
        )}
      </div>
      {dummydata.map((x, i) => (
        <div key={i}>
          color :{x.color} ; value {x.value}
        </div>
      ))}
    </div>
  );
}

export default Appdelete;
