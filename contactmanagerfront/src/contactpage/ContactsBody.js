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
const ContactsBody = ({
  filewithoutnpm,
  header,
  changeCheckbox,
  deleteTracking,
}) => {

  console.log("data inside bpody",filewithoutnpm.datas)
  return (
    <>
      {header?.heading &&
        filewithoutnpm?.datas?.map((x, i) => {
  
          // deletedArray?.push({id:x._id,checked:false})
          // setDeleteTracking((pre)=>[...pre,{id:x._id,checked:false}]) //here not working ;;err: too many renders
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
        })}
    </>
  );
};
export default ContactsBody;
