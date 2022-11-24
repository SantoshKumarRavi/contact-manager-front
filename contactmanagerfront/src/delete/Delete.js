import { useState, useRef, useEffect } from "react";
import "../App.css";
import Button from "../components/Button";
import AuthProvider from "../useauth/Useauth"

function Appdelete({deleteTracking,setheader,setDeleteTracking,setfilewithoutnpm,filewithoutnpm}) {
  const [showDeleteUI, setshowDeleteUI] = useState(false);
  const showDeleteref_btn = useRef(null);
  const showDeleteref_content = useRef(null);
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
          setshowDeleteUI(false)
          setfilewithoutnpm({datas:updatedAfterDelete})

          let updatedDeletedtrackingIds=[...deleteTracking]
          updatedDeletedtrackingIds=updatedDeletedtrackingIds.filter((ele)=>{
            if(!hashmap.has(ele.id)){
              return 1
          }
          })
          console.log("updatedDeletedtrackingIds ",updatedDeletedtrackingIds)
          setDeleteTracking(()=>[...updatedDeletedtrackingIds])
        } )
  })()
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
            <div className="drag-wrapper">
                <p>Confirm Delete</p>
                <button onClick={deleteFiles} >OK</button>
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
