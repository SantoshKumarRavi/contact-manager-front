import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import { AuthConsumer } from "../src/useauth/Useauth";
import Contacts from "../src/contactpage/Contacts";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   solid
// } from "@fortawesome/fontawesome-svg-core/import.macro"; 
import {getContacts,postContacts} from "../src/network/lib/authenticate"
import { useRouter } from 'next/router';

function ImportUI() {
  const router = useRouter();
  type DataType={
    datas?:String[]
  }
  const [showImportUI, setshowImportUI] = useState(false);
  const [showDeleteUI, setshowDeleteUI] = useState(false);

  const showUIref_btn = useRef(null);
  const showUIref_content = useRef(null);
  function updateshowImportUI() {
    setshowImportUI((prev) => !prev);
  }
  const [file, setfile] = useState<DataType>({});
  const value = AuthConsumer();

  useEffect(() => {
    if(value?.userid){
      getContacts(value.userid)
        .then((fetcheddata) => {
          setfile(() => {
            return { datas: fetcheddata?.data?.data };
          });
          if (fetcheddata?.data?.data?.length !== 0) {
            fetcheddata?.data?.data?.forEach((element) => {
              setDeleteTracking((prev) => [
                ...prev,
                { id: element._id, checked: false },
              ]);
            });
            setheader(() => {
              return {
                heading: [
                  "Name",
                  "Designation",
                  "Company",
                  "Industry",
                  "Email",
                  "Phonenumber",
                  "Country",
                ],
              };
            });
          }
        });
    }
  }, [value.userid]);
  

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

  const [deleteTracking, setDeleteTracking] = useState([]);
  const [header, setheader] = useState({});
  const [successImport, setsuccessImport] = useState(false); //false

  // useEffect( () => {
    // no authentication for dev
    // if (value.accesstoken === "") {
    //   router.push("/login")
    // }
  // }, [router,value?.accesstoken]);

  useEffect(() => {
    // important to clear the sucess //css
    if (successImport) {
      setTimeout(() => {
        setsuccessImport(false);
        setshowImportUI(false);
      }, 1000);
    }
  }, [successImport]);

  function drop(e) {
    e.preventDefault();
    const reader = new FileReader();
    const userId = value.userid
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      const columns = Object.keys(parsedData[0]);
      if (parsedData) {
        postContacts({data: parsedData, userId: userId}).then((saveddata)=>{
          setheader(() => {
            return { heading: columns };
          });
          setfile((prev) => {
            if (prev.datas === undefined) {
              saveddata.data?.data?.forEach((element) => {
                setDeleteTracking((prev) => [
                  ...prev,
                  { id: element._id, checked: false },
                ]);
              });
              return { datas: saveddata?.data?.data };
            } else {
              let updated = prev.datas;
              updated = [...updated, ...saveddata.data?.data];
              saveddata?.data?.data.forEach((element) => {
                setDeleteTracking((prev) => [
                  ...prev,
                  { id: element._id, checked: false },
                ]);
              });
              return { datas: updated };
            }
          });
        })
      }

      if (parsedData) {
        setsuccessImport(true);
      }
    };
    reader.readAsText(e.dataTransfer.files[0]);
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }
  function btn_drop(e) {
    e.preventDefault();
  }
  function btn_dragOverHandler(e) {
    e.preventDefault();
  }
  function onclickHandler(e) {
    e.preventDefault();
  }
  function cancel_import() {
    setshowImportUI(false);
  }
  function changeCheckbox(e) {
    if (e.target.name === "Deleteall") {
      let updatedDeletedTracking = [...deleteTracking];
      updatedDeletedTracking = updatedDeletedTracking.map((obj) => {
        let currentObj = { ...obj };
        currentObj.checked = e.target.checked;
        return currentObj;
      });
      setDeleteTracking(() => updatedDeletedTracking);
    } else if(e.target?.dataset?.searchdelid){
      let searchedid=e.target?.dataset?.searchdelid
      let updatedDeletedTracking = [...deleteTracking];
      for(let i=0;i<updatedDeletedTracking.length;i++){
        if(updatedDeletedTracking[i].id===searchedid){
          updatedDeletedTracking[i].checked=!updatedDeletedTracking[i].checked
        }
      }
    } else{
      let indexToBeUpdated = parseInt(e.target?.dataset?.index);
      let updatedDeletedTracking = [...deleteTracking];
      updatedDeletedTracking[indexToBeUpdated] = {
        ...updatedDeletedTracking[indexToBeUpdated],
        checked: !updatedDeletedTracking[indexToBeUpdated].checked,
      };
      setDeleteTracking(() => updatedDeletedTracking);
    }
  }
  function logoutfunction() {
    value.setValue("");
    router.push("/login")
  }
 
  return (
    <div className="App">

      <div className="import">
        {showImportUI && (
          <div ref={showUIref_content}>
            <div className="drag-wrapper">
              {successImport && (
                <>
                  <div className="success-wrapper">
                    <div className="circle-tick-wrapper">
                      <div className="circle-tick">
                        {/* <FontAwesomeIcon
                          className="fontaw-tick"
                          icon={solid("check")}
                        /> */}
                     
                      </div>
                    </div>
                    <div className="sucess-wrapper-text">
                      <p className="success-text">Import Complete</p>
                    </div>
                    <div className="response-wrapper">
                      <p className="res-text">CSV File is Uploaded</p>
                    </div>
                  </div>
                </>
              )}
              {!successImport && (
                <>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    className="import-input-box"
                    onClick={onclickHandler}
                    onDrop={(e) => drop(e)}
                    onDragOver={dragOverHandler}
                  />
                  <div className="circle-logo-drag">
                    <div className="import-logo">
                      <img alt="import-logo" src="https://img.icons8.com/glyph-neue/64/null/new-by-copy.png" />
                    </div>
                  </div>
                  <div className="over-the-input-files">
                    <p className="import-text">Import File</p>
                  </div>
                  <div className="over-the-input-files-content">
                    <p className="import-content">
                      Drag & Drop a CSV File to Upload
                    </p>
                  </div>
                  <button
                    onDrop={(e) => btn_drop(e)}
                    onClick={cancel_import}
                    onDragOver={btn_dragOverHandler}
                    className="import-btn-cancel"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {showImportUI && (
        <style>{"body {background-color:rgba(0, 0, 0, 0.5)}"}</style>
      )}
      {
        <Contacts
          showDeleteUI={showDeleteUI}
          setshowDeleteUI={setshowDeleteUI}
          logoutfunction={logoutfunction}
          showImportUI={showImportUI}
          updateshowImportUI={updateshowImportUI}
          showUIref_btn={showUIref_btn}
          setheader={setheader}
          setDeleteTracking={setDeleteTracking}
          deleteTracking={deleteTracking}
          setfile={setfile}
          file={file}
          header={header}
          changeCheckbox={changeCheckbox}
        />
      }
    </div>
  );
}

export default ImportUI;
