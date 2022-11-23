import { useState, useRef, useEffect } from "react";
import "../App.css";
import Button from "../components/Button";
import Papa from "papaparse";

/*
    "papaparse": "^5.3.2",
*/
function ImportUI() {
  const [showImportUI, setshowImportUI] = useState(false);
  const showUIref_btn = useRef(null);
  const showUIref_content = useRef(null);
  function updateshowImportUI() {
    setshowImportUI((prev) => !prev);
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
        showUIref_btn.current &&
        !showUIref_btn.current.contains(event.target) &&
        showUIref_content.current &&
        !showUIref_content.current.contains(event.target)
      ) {
        setshowImportUI(false);
      }
    };
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
  const [filewithoutnpm, setfilewithoutnpm] = useState({});
  // function handleChange(e) { //only drag
  //   //for onclicking to upload
  //   console.log("handle cjhaming", e.target.files[0]);
  // }
  useEffect(()=>{
    console.log("useEffect",filewithoutnpm)
  },[filewithoutnpm])
  function drop(e) {
    e.preventDefault();
    // console.log("drop handle cjhaming files [0]", e.dataTransfer.files[0]);
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      const columns = Object.keys(parsedData[0]);
      setfilewithoutnpm((prev)=>{
        if(prev.datas==undefined){
          return {datas:parsedData}
        }else{
          let updated=prev.datas
          updated=[...updated,...parsedData]
          return {datas:updated}
        }
      });
      console.log("datas ", columns); //  heading as array of strings // may be used for customize column changing.. here we fixed the schema
      console.log("parsed data", parsedData); // data as array of objects
      if(parsedData){
        setshowImportUI(false)
      }
    };
    reader.readAsText(e.dataTransfer.files[0]);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }
  function btn_drop(e){ // this function is for not downloading the csv file on cancel-btn-drop
    e.preventDefault();
    console.log("btb-drop")
  }
  function btn_dragOverHandler(e){// this function also is for not downloading the csv file on cancel-btn-drop
    e.preventDefault();
    console.log("btn-iover")
  }
  function onclickHandler(e){// this function  is for not opening the local file for uploading
    e.preventDefault()
    console.log("clicked")
  }
  function cancel_import(){
    // setfilewithoutnpm({}) //if user 2nd time click after sucessfull fetching, it will erase data..
    setshowImportUI(false)
  }
  return (
    <div className="App">
      {showImportUI && (
        <style>{"body {background-color:rgba(0, 0, 0, 0.5)}"}</style>
      )}
      <Button
        showUI={showImportUI}
        showref={showUIref_btn}
        functionality={updateshowImportUI}
        value={"import"}
      />
      <div className="import">
        {showImportUI && (
          <div ref={showUIref_content}>
            <div className="drag-wrapper">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                className="import-input-box"
                onClick={onclickHandler}
                // onChange={handleChange}//only drag 
                onDrop={(e) => drop(e)}
                onDragOver={dragOverHandler}
              />
              <div className="over-the-input-files">
                <h1>Import files</h1>
                <p>drag here and click to upload </p>
              </div>
              <button  onDrop={(e) => btn_drop(e)}
              onClick={cancel_import}
                onDragOver={btn_dragOverHandler} className="import-btn-cancel">Cancel</button>
            </div>
          </div>
        )}
      </div>
      {dummydata.map((x, i) => (
        <div key={i}>
          color :{x.color} ; value {x.value}
        </div>
      ))}
      { filewithoutnpm?.datas?.map((x, i) => <div key={i}>{x.name}</div>)}
    </div>
  );
}

export default ImportUI;
