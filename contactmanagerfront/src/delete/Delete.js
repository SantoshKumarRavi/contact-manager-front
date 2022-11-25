import { useState, useRef, useEffect } from "react";
import "../App.css";
import Button from "../components/Button";
import AuthProvider from "../useauth/Useauth"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
function Appdelete({deleteTracking,setheader,setDeleteTracking,setfilewithoutnpm,filewithoutnpm}) {
  const [showDeleteUI, setshowDeleteUI] = useState(false);
  const showDeleteref_btn = useRef(null);
  const showDeleteref_content = useRef(null);
  const[contactDeleted,setContactDeleted]=useState(false)
  function updateshowDeleteUI() {
    setshowDeleteUI((prev) => !prev);
  }

  // const [idObj,setIdObj]=useState({})

  // let dummydata = [
  //   { color: "red", value: "#f00" },
  //   { color: "green", value: "#0f0" },
  //   { color: "blue", value: "#00f" },
  //   { color: "cyan", value: "#0ff" },
  //   { color: "magenta", value: "#f0f" },
  //   { color: "yellow", value: "#ff0" },
  //   { color: "black", value: "#000" },
  // ];
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
  useEffect(()=>{ // imp for claer
    if(contactDeleted){
      setTimeout(()=>{
        setshowDeleteUI(false)
        setContactDeleted(false)
      },1000)
    }

  },[contactDeleted])

  function deleteFiles(){
    console.log("from del , del trackig",deleteTracking)
    let idsArray=[]
    deleteTracking.forEach(ele => {
      if(ele.checked){
        idsArray.push(ele.id)
        // let currentid=ele.id
        // setIdObj((prev)=>{
        //   return ({
        //     ...prev,
        //     currentid
        //   })
        // })
      }
    });
    
    // console.log("del id array",idsArray)
    (async function deleteData() {
      await fetch("http://localhost:8081/contacts", {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body:JSON.stringify(idsArray)
        }).then((x)=>x.json()).then((removed)=> {
          // updatedAfterDelete.filter((e)=>{

          // })
          let hashmap=new Map()
          deleteTracking.forEach(ele => {
            if(ele.checked){
              hashmap.set(ele.id,ele.id)
            }
          });
          let updatedAfterDelete=[...filewithoutnpm?.datas]
          updatedAfterDelete=updatedAfterDelete.filter((ele)=>{
            if(!hashmap.has(ele._id)){
                return 1
            }
        })
          console.log("idhashobj",hashmap)
          console.log("removd ",removed)
          console.log("updatedAfterDelete ",updatedAfterDelete)
          // setshowDeleteUI(false)
          setfilewithoutnpm({datas:updatedAfterDelete})

          let updatedDeletedtrackingIds=[...deleteTracking]
          updatedDeletedtrackingIds=updatedDeletedtrackingIds.filter((ele)=>{
            if(!hashmap.has(ele.id)){
              return 1
          }
          })
          console.log("updatedDeletedtrackingIds ",updatedDeletedtrackingIds)
          setDeleteTracking(()=>[...updatedDeletedtrackingIds])
          setContactDeleted(true)
        } )
  })()
  }
  function cancelDelete(){
    setshowDeleteUI(false)
  }
 
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
            <div className="drag-wrapper-delete">
              { !contactDeleted && (
                  <>
                   <div className="del-logo-wrapper">
                <div className="del-logo">
                  <FontAwesomeIcon
                    className="fontaw-tick"
                    icon={solid("trash-can")}
                  />
                </div>
              </div>
              <div className="delete-text-wrapper">
                <p className="del-text">Delete Contacts</p>
              </div>
              <div className="delete-confirm-wrapper">
                <p className="del-confirm-text">
                  Sure you want delete this Contacts ?
                </p>
              </div>
              <div className="btn-wrapper">
                <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
                <button className="delete-ok-btn" onClick={deleteFiles}>Ok</button>
              </div>
                  
                  </>


              )

              }
              {contactDeleted &&(
                  <>
                      <div className="del-logo-wrapper del-tick-wrapper">
                <div className="del-logo">
                  <FontAwesomeIcon
                    className="fontaw-tick"
                    icon={solid("check")}
                  />
                </div>
              </div>
              <div className="deleted-message">
                <p>Deleted Contacts</p>
              </div>
                  </>
                )
              }
             
            </div>
          </div>
        )}
      </div>
      {/* {dummydata.map((x, i) => (
        <div key={i}>
          color :{x.color} ; value {x.value}
        </div>
      ))} */}
    </div>
  );
}

export default Appdelete
