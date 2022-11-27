import React ,{useEffect, useState} from "react";
import ContactsBodyHead from "./ContactsBodyHead";
import ContactsBody from "./ContactsBody";
import Delete from "../delete/Delete";
import Button from "../components/Button";
import Searchbar from "./Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
  thin,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import "../App.css";//GrEdit
import { AuthConsumer } from "../useauth/Useauth";
import { MdOutlineDashboard,MdOutlineContacts ,MdOutlineImportExport,MdDeleteOutline } from "react-icons/md";
import { BiFilter,BiExport,BiCalendar } from "react-icons/bi";
import {FiChevronDown} from "react-icons/fi";



// username:username,
// setName:(val)=>setUsername(()=>val)

const Contacts = ({
  showImportUI,
  showDeleteUI,
  setshowDeleteUI,
  updateshowImportUI,
  showUIref_btn,
  filewithoutnpm,
  header,
  changeCheckbox,
  deleteTracking,
  setfilewithoutnpm,
  setheader,
  setDeleteTracking,
  logoutfunction,
}) => {
  const [searchedEmails,setSearchedEmails]=useState({})
  const value=AuthConsumer()
  // console.log
let user=value?.username?.split("@")[0].split("")
  let firstletter=user[0]?.toUpperCase()
  let remaining=user?.slice(1).join("")
  user=firstletter+remaining
  
  useEffect(()=>{ //not working
     if(user==undefined){
      user="Hello user"
    }
  },[user])
  return (
    <>
      <div className="Contact-page-wrapper">
        <div className="aside-wrapper">
          <div className="aside-logo-container">
            <div className="logo-container">
              <div className="main-logo">
                <p className="logo-main-text" >Logo</p>
                </div>
            </div>
            <div className="aside-contact-header">
              <div className="child-aside">
                {/* <img alt="dash-icon" className="img-dash" src={"dash.png"} /> */}
                  <MdOutlineDashboard className="dash"/>
                <p className="dash-text">Dashboard</p>
              </div>
              <div className="child-aside1 ">
                {/* <FontAwesomeIcon
                  className="fontaw-contacts-icon"
                  icon={regular("id-badge")}
                /> */}
                <MdOutlineContacts className="total-contacts"/>
                <div  className="dash-text-border">
                <div className="dash-text dash-text-total ">Total contacts</div>                
                </div>
              </div>
            </div>
          </div>
          <div className="aside-logout-container">
            <div className={"logo-content-wrapper"} >
            <FontAwesomeIcon
                    icon={solid("right-from-bracket")}
                  />
            <button className={showImportUI||showDeleteUI?"btn-before-glossy glossy-background":"btn-before-glossy"}  onClick={() => logoutfunction()}>
                Logout
                </button>
            </div>
          </div>
        </div>
        <div className="main-page-wrapper">
          <div className="header-wrapper">
            <div className="header">
              <p>Total contacts</p>
            </div>
            <div className="search-wrapper">
              <div className="search-bar-wrapper">
                <div className="search-bar">
                    <Searchbar showDeleteUI={showDeleteUI} showImportUI={showImportUI} setSearchedEmails={setSearchedEmails} searchedEmails={searchedEmails} filewithoutnpm={filewithoutnpm}/>
                </div>
              </div>
              <div className="usersdetails-container">
                <div className="logo-data-wrapper">
                  <div className="user-logo-container">
                    <img
                    className={(showImportUI || showDeleteUI)?'glossy-image':''}
                    // className=""
                    src={"user.png"}/>
                  </div>
                  <div className="data-container">
                    <div className="username-text">{user}</div>
                    <div className="userrole-text">Engineer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content-wrapper">
            <div className="main-body-content-wrapper">
              <div className="header-btn-wrapper">
                <div className="filtered-container">
                  <div className="date-container">
                    {/* <FontAwesomeIcon
                  icon={regular ("calendar-days")}
                /> */}
                <BiCalendar className="react-icon-common"/>

                  {/* <Button classname={`common-styles-btn dates-filter`} value={"Select Date"} /> */}
                <Button  classname={(showImportUI || showDeleteUI)?'common-styles-btn dates-filter btn btn-before-glossy glossy-background':'common-styles-btn dates-filter'}
                 value={"Select Date"} />
                  {/* <FontAwesomeIcon
                  icon={solid ("chevron-down")}
                /> */}
                <FiChevronDown className="react-icon-common"/>

                  </div>
                  <div className="filter-details-wrapper">
                  {/* <FontAwesomeIcon
                  icon={solid ("arrow-down-wide-short")}
                /> */}
                      <BiFilter  className="react-icon-common" />
               
                  <Button   classname={(showImportUI || showDeleteUI)?'common-styles-btn btn dates-filter btn-before-glossy glossy-background':'common-styles-btn dates-filter'}
                   value={"Filters"} />
                  {/* <FontAwesomeIcon
                  icon={solid ("chevron-down")}
                /> */}
                   <FiChevronDown  className="react-icon-common"/>

                  </div>
                </div>
                <div className="import-export-container">
                <div className="common-btn-container">
                  {/* <FontAwesomeIcon
                    className="fontaw-tick"
                    icon={solid("trash-can")}
                  /> */}
                <MdDeleteOutline  className="react-icon-common delete"/>
                    <Delete
                    showDeleteUI={showDeleteUI}
                    setshowDeleteUI={setshowDeleteUI}
                       classname={(showImportUI || showDeleteUI)?'common-styles-btn btn-before-glossy glossy-background':'common-styles-btn'}
                      setheader={setheader}
                      setDeleteTracking={setDeleteTracking}
                      deleteTracking={deleteTracking}
                      filewithoutnpm={filewithoutnpm}
                      setfilewithoutnpm={setfilewithoutnpm}
                    />
                  </div>

                  <div className="common-btn-container">
                  {/* <FontAwesomeIcon
                    icon={solid("arrow-up")}
                  />
                   <FontAwesomeIcon
                    icon={solid("arrow-down")}
                  /> */}
                  <MdOutlineImportExport  className="react-icon-common delete"/>
                    <Button
                    classname={(showImportUI || showDeleteUI)?'common-styles-btn import-btn btn-before-glossy glossy-background':'common-styles-btn import-btn'}
                      showUI={showImportUI}
                      showref={showUIref_btn}
                      functionality={updateshowImportUI}
                      value={"Import"}
                    />
                  </div>
                 

                  <div className="common-btn-container">
                  {/* <FontAwesomeIcon
                    icon={solid("arrow-up-from-bracket")}
                  /> */}
                  <BiExport  className="react-icon-common delete"/>
              
                    <Button
 classname={(showImportUI || showDeleteUI)?'common-styles-btn btn-before-glossy glossy-background':'common-styles-btn'}

                     value={"Export"} />
                  </div>
                </div>
              </div>
              <div className="contacts-wrapper">
                <ContactsBodyHead
                showDeleteUI={showDeleteUI}
                 showImportUI={showImportUI}
                  changeCheckbox={changeCheckbox}
                  filewithoutnpm={filewithoutnpm}
                  header={header}
                />
                <ContactsBody 
                showDeleteUI={showDeleteUI}
                  showImportUI={showImportUI}
                  searchedEmails={searchedEmails}
                  deleteTracking={deleteTracking}
                  changeCheckbox={changeCheckbox}
                  filewithoutnpm={filewithoutnpm}
                  header={header}
                />
              </div>
            </div>
          </div>
          <div className="pagination">

          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
