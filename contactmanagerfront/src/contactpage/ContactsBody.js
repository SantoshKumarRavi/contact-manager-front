import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
  thin,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import "../App.css";
// import ReactTooltip from 'react-tooltip';
import HoverOver from "../components/HoverOver";

const ContactsBody = ({
  showDeleteUI,
  showImportUI,
  filewithoutnpm,
  header,
  changeCheckbox,
  deleteTracking,
  searchedEmails
}) => {
  // const [isHovering, setIsHovering] = useState(false);

  // function handleMouseOver(){
  //   console.log("im hovered")
  //   setIsHovering(true)
  // }
  // function handleMouseOut(){
  //   console.log("im out")
  //   setIsHovering(false)
  // }
  // console.log("data inside bpody",filewithoutnpm.datas)
  return (
    <>
      {!searchedEmails?.datas?.length&&header?.heading &&
        filewithoutnpm?.datas?.map((x, i) => {
  
          // deletedArray?.push({id:x._id,checked:false})
          // setDeleteTracking((pre)=>[...pre,{id:x._id,checked:false}]) //here not working ;;err: too many renders
          return (
            <div className="data-wrapper" key={i}>
              <div className={showImportUI||showDeleteUI?"input-header":"input-header"}>
      
              <input
                data-index={String(i)}
                onChange={(e) => changeCheckbox(e)}
                id={x._id}
                type={"checkbox"}
                // style={{backgroundColor:"red"}}
                className={showImportUI||showDeleteUI?"checkbox-background":""}
                checked={deleteTracking[i]?.checked}
              />
              </div>
              <div  className="content-overall-wrapper ">
            
              <div className="Name common-header-styles remove-border glossy-background">{x.Name}</div>
              <div className="Designation  common-header-styles remove-border glossy-background">{x.Designation}</div>
              <div className="Company  common-header-styles remove-border glossy-background">{x.Company}</div>
              <div className="Industry  common-header-styles remove-border glossy-background">{x.Industry}</div>
              <HoverOver Email={x.Email} Phonenumber={x.Phonenumber} />
              {/* <ReactTooltip  place='bottom' id='tool'/> */}
              {/* <div className="Email  common-header-styles remove-border glossy-background tip" 
              onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} data-for='tool' data-tip={x.Email}
              >{x.Email}</div> */}
              {/* <div className={isHovering?'blue Phonenumber  common-header-styles remove-border glossy-background':"Phonenumber  common-header-styles remove-border glossy-background"}>{x.Phonenumber}</div> */}
              <div className="Country  common-header-styles remove-border glossy-background">{x.Country}</div>
              </div>
              <div className="action-wrapper">
              <div  className="Action content-action">
              <FontAwesomeIcon
                  icon={solid ("pencil")}
                />
                 <FontAwesomeIcon
                  icon={solid ("trash-can")}
                />
          </div>
              </div>
            </div>
          );
        })}


        {searchedEmails?.datas?.length&&header?.heading &&(
          searchedEmails?.datas?.map((x, i) => {
            return (
              <div className="data-wrapper" key={i}>
                <div  className="input-header">
                <input
                  data-index={String(i)}
                  onChange={(e) => changeCheckbox(e)}
                  id={x._id}
                  type={"checkbox"}
                  checked={deleteTracking[i]?.checked}
                />
                </div>
                <div  className="content-overall-wrapper ">
                <div className="Name common-header-styles remove-border">{x.Name}</div>
                <div className="Designation  common-header-styles remove-border">{x.Designation}</div>
                <div className="Company  common-header-styles remove-border">{x.Company}</div>
                <div className="Industry  common-header-styles remove-border">{x.Industry}</div>
                <div className="Email  common-header-styles remove-border">{x.Email}</div>
                <div className="Phonenumber  common-header-styles remove-border">{x.Phonenumber}</div>
                <div className="Country  common-header-styles remove-border">{x.Country}</div>
                </div>
                <div className="action-wrapper">
                <div  className="Action content-action">
                <FontAwesomeIcon
                    icon={solid ("pencil")}
                  />
                   <FontAwesomeIcon
                    icon={solid ("trash-can")}
                  />
                </div>
                </div>
              </div>
            );


          })


        )


        }
    </>
  );
};
export default ContactsBody;
