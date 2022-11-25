import React, { useState, useRef, useEffect} from "react";
import "../App.css";
import Button from "../components/Button";
import Papa from "papaparse";
import Delete from "../delete/Delete"
import { AuthConsumer} from "../useauth/Useauth";
import { useNavigate } from "react-router-dom";
import {Navigate} from "react-router-dom";
import Contacts from "../contactpage/Contacts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
// import 'font-awesome/css/font-awesome.min.css'; //import in react app
// import {FontAwesomeIcon} from "@fortawesome/free-solid-svg-icons"
// import {AuthproviderWrapper} from "../App"
// import UseAuth from "../useauth/Useauth"
/*
    "papaparse": "^5.3.2",
*/

function ImportUI() {
  const navigate = useNavigate();
  // if(value.accesstoken==""){
  //   navigate("/login")
  //   return 
  // }


  const [showImportUI, setshowImportUI] = useState(false);
  const showUIref_btn = useRef(null);
  const showUIref_content = useRef(null);
  function updateshowImportUI() {
    setshowImportUI((prev) => !prev);
  }
  const [filewithoutnpm, setfilewithoutnpm] = useState({});
const value=AuthConsumer()
console.log("data from context",value.accesstoken)
// console.log("history",history.action)

  useEffect(()=>{ // as of not requird for im not connecting db ..now css
    (async function getData() {
      await fetch("http://localhost:8081/contacts", {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json' 
          },
        }).then((x)=>x.json()).then((fetcheddata)=>{
           setfilewithoutnpm(()=>{
        return {datas:fetcheddata.data} 
        }
        )
        if(fetcheddata?.data?.length!=0){
          setheader(()=>{
          return ({heading:["Name","email","designmatuon"]})})
        }
       
      }
      )
      })()
  },[])

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
  // function handleChange(e) { //only drag
  //   //for onclicking to upload
  //   console.log("handle cjhaming", e.target.files[0]);
  // }
  // const [deletedArray,setDeleteArray]=useState([])
  const [deleteTracking,setDeleteTracking]=useState([])
  const[header,setheader]=useState({})
  const[successImport,setsuccessImport]=useState(false) //false
  // const[checked,setChecked]=useState(false)

//frm 78 -importnat 

  useEffect(async()=>{ //temp closed due to highlighting
    // console.log("dele tra ",deleteTracking)
    if(value.accesstoken==""){
        console.log("it is empty acces demied") 
        navigate("/unauthorized")
    }else{
      // if(filewithoutnpm?.datas){
        let dats=await filewithoutnpm.datas
        console.log("file nom",dats)
        // setheader(()=>{
        //   return ({heading:["Name","email","designmatuon"]})})
      // }
      console.log(value.accesstoken ,"granted")
    }
    // if(filewithoutnpm.datas){
    //   console.log("useEffect if",filewithoutnpm)
    //   console.log("useEffect if deletedArray",deletedArray)

    // }else{
    //   console.log("useEffect else",filewithoutnpm)
    //   console.log("useEffect else deletedArray",deletedArray)

    // }
  },[])

  useEffect(()=>{ // important to clear the sucess //css
    if(successImport){
      setTimeout(()=>{
        setsuccessImport(false)
        setshowImportUI(false)
      },1000)

    }

  },[successImport])


  // const data= AuthConsumer();
    // const aurth= UseAuth();
  // console.log("accesstoken",data)

  function drop(e) {
    e.preventDefault();
    // console.log("drop handle cjhaming files [0]", e.dataTransfer.files[0]);
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      const columns = Object.keys(parsedData[0]);
      if(parsedData){
        (async function postData() {
        await fetch("http://localhost:8081/contacts", {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json' //REF: use for authentication
            },
            body: JSON.stringify(parsedData) // body data type must match "Content-Type" header
          }).then((x)=>x.json()).then((saveddata)=>{
          console.log("data posting and returd",saveddata.data)
          setheader(()=>{
            return ({heading:columns})})
          setfilewithoutnpm((prev)=>{
            if(prev.datas==undefined){
              //  deletedArray=new Array(parsedData.length)
              saveddata.data.forEach(element => {
                console.log("ele ",element)
                setDeleteTracking((prev)=>[...prev,{id:element._id,checked:false}])

                // [{id="gungu",name},{},{}]
                // setDeleteTracking([{id:gungu,checked:false}])

              });
              return {datas:saveddata.data}

            }else{
              let updated=prev.datas
              updated=[...updated,...saveddata.data]
              saveddata.data.forEach(element => {
                console.log("ele ",element)
                setDeleteTracking((prev)=>[...prev,{id:element._id,checked:false}])
              });
              return {datas:updated}
            }
          })
          // .then(()=>{
          //   if(deleteTracking.length==0){
          
    
          //   }else{
    
          //   }

          // });

        })
          // return response.json(); // parses JSON response into native JavaScript objects
        })()

      }
      
      console.log("datas ", columns); //  heading as array of strings // may be used for customize column changing.. here we fixed the schema
      console.log("parsed data", parsedData); // data as array of objects
      if(parsedData){
        setsuccessImport(true) //{id:"1",checked:true},{id:"2",checked:true},{id:"3",checked:false}
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
  // const[check,setCheck]=useState(false)
  function changeCheckbox(e){
    // setChecked((prev)=>!prev)
    if(e.target.name=="Deleteall"){
      console.log(e.target.checked)
      let updatedDeletedTracking=[...deleteTracking]
      // updatedDeletedTracking[indexToBeUpdated]={...updatedDeletedTracking[indexToBeUpdated],checked:!updatedDeletedTracking[indexToBeUpdated].checked}
      updatedDeletedTracking=updatedDeletedTracking.map((obj)=>{
        let currentObj={...obj}
        currentObj.checked=e.target.checked
        return currentObj
      })
      setDeleteTracking(()=>updatedDeletedTracking)
      // console.log("delete",updatedDeletedTracking)

    }else{
      console.log("defore delete onchange ",deleteTracking)
      // setCheck(()=>!e.target.checked)
      console.log("ids",e.target) //<input id index type={check}>
      //console.log("ids",e.target.id) //<input id index type={check}>
      // console.log("index",e.target?.dataset.index)
      let indexToBeUpdated=parseInt(e.target?.dataset?.index)
      let updatedDeletedTracking=[...deleteTracking]
      updatedDeletedTracking[indexToBeUpdated]={...updatedDeletedTracking[indexToBeUpdated],checked:!updatedDeletedTracking[indexToBeUpdated].checked}
      console.log("delete",updatedDeletedTracking)
      setDeleteTracking(()=>updatedDeletedTracking)
      // console.log("ids",e.target.id.objid)
      // console.log("ids",e.target.id.index)

    }
  
  }
function logoutfunction(){
  console.log("lofggef out")
  value.setValue("")
  console.log("after empty from context",value.accesstoken)
  navigate("/login")
}
// useEffect(()=>{
// if(value.accesstoken==""){
//     navigate("/login")
//     return 
//   }
// },[value.accesstoken,showImportUI])
  return (
    <div className="App">

{/* {value.accesstoken=="" && <Navigate replace to="/login" /> } */}
      {showImportUI && (
        <style>{"body {background-color:rgba(0, 0, 0, 0.5)}"}</style>
      )}
      <div className="import">
        {showImportUI && (
          <div ref={showUIref_content}>
            <div className="drag-wrapper">
              {successImport &&
              <>
              <div className="success-wrapper" >
                <div className="circle-tick-wrapper" >
                  <div className="circle-tick" >
                  <FontAwesomeIcon className="fontaw-tick" icon={solid('check')} />
                  </div>
                </div>
                <div className="sucess-wrapper-text">
                    <p className="success-text">Import Complete</p>
                </div>
                <div className="response-wrapper" >
                  <p className="res-text">CSV File is Uploaded</p>
                </div>
              </div>
              </>
              }
              {!successImport &&(
                <>
                 <input
                 type="file"
                 accept=".csv,.xlsx,.xls"
                 className="import-input-box"
                 onClick={onclickHandler}
                 // onChange={handleChange}//only drag 
                 onDrop={(e) => drop(e)}
                 onDragOver={dragOverHandler}
               />
               <div className="circle-logo-drag" >
               <div className="import-logo">
               {/* <img  src={require("../icons/file.png")}/> */}
               <img src="https://img.icons8.com/glyph-neue/64/null/new-by-copy.png"/>
               </div>
               </div>
               <div className="over-the-input-files" >
                 <p className="import-text" >Import File</p>
               </div>
               <div  className="over-the-input-files-content" >
                 <p className="import-content"  >Drag & Drop a CSV File to Upload</p>
               </div>
               <button  onDrop={(e) => btn_drop(e)}
               onClick={cancel_import}
                 onDragOver={btn_dragOverHandler} className="import-btn-cancel">Cancel</button>
                </>
              )
              }
            </div>
          </div>
        )}
      </div>
      {
          <Contacts logoutfunction={logoutfunction}  showImportUI={showImportUI} updateshowImportUI={updateshowImportUI} showUIref_btn={showUIref_btn} setheader={setheader} setDeleteTracking={setDeleteTracking} deleteTracking={deleteTracking} setfilewithoutnpm={setfilewithoutnpm} filewithoutnpm={filewithoutnpm} header={header} changeCheckbox={changeCheckbox}/>
      }
      </div>
  );
}

export default ImportUI;


/*
1)filewuthoum ====id,name.email......map((x,i))

1.1)<input occhnge={} index={i} id={x.id}>

2)deletracj====id, checjed :false

ref ::    [{id, checjed :false},{id, checjed :false}]


*/