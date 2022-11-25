import React from "react";
import ContactsBodyHead from "./ContactsBodyHead";
import ContactsBody from "./ContactsBody";
import Delete from "../delete/Delete";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
  thin,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import "../App.css";
const Contacts = ({
  showImportUI,
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
  return (
    <>
      <div className="Contact-page-wrapper">
        <div className="aside-wrapper">
          <div className="aside-logo-container">
            <div className="logo-container">
              <div className="main-logo">Logo</div>
            </div>
            <div className="aside-contact-header">
              <div className="child-aside">
                <img alt="dash-icon" className="img-dash" src={"dash.png"} />
    
                <p className="dash-text">Dashboard</p>
              </div>
              <div className="child-aside ">
                <FontAwesomeIcon
                  className="fontaw-contacts-icon"
                  icon={regular("id-badge")}
                />
                <div  className="dash-text-border">
                <div className="dash-text dash-text-total ">Total contacts</div>                
                </div>
              </div>
            </div>
          </div>
          <div className="aside-logout-container">
            <div className="logo-content-wrapper" >
            <FontAwesomeIcon
                    icon={solid("right-from-bracket")}
                  />
            <button onClick={() => logoutfunction()}>
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
                <div className="search-bar"></div>
              </div>
              <div className="usersdetails-container">
                <div className="logo-data-wrapper">
                  <div className="user-logo-container">
                    <img src={"user.png"}/>
                  </div>
                  <div className="data-container">
                    <div className="username-text">Ram</div>
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
                    <FontAwesomeIcon
                  icon={regular ("calendar-days")}
                />
                  <Button classname={`common-styles-btn dates-filter`} value={"Select Date"} />
                  <FontAwesomeIcon
                  icon={solid ("chevron-down")}
                />

                  </div>
                  <div className="filter-details-wrapper">
                  <FontAwesomeIcon
                  icon={solid ("arrow-down-wide-short")}
                />
                  <Button  classname={`common-styles-btn dates-filter`} value={"Filters"} />
                  <FontAwesomeIcon
                  icon={solid ("chevron-down")}
                />
                  </div>
                </div>
                <div className="import-export-container">
                <div className="common-btn-container">
                  <FontAwesomeIcon
                    className="fontaw-tick"
                    icon={solid("trash-can")}
                  />
                    <Delete
                      classname={`common-styles-btn`}
                      setheader={setheader}
                      setDeleteTracking={setDeleteTracking}
                      deleteTracking={deleteTracking}
                      filewithoutnpm={filewithoutnpm}
                      setfilewithoutnpm={setfilewithoutnpm}
                    />
                  </div>

                  <div className="common-btn-container">
                  <FontAwesomeIcon
                    icon={solid("arrow-up")}
                  />
                   <FontAwesomeIcon
                    icon={solid("arrow-down")}
                  />
                    <Button
                      classname={`common-styles-btn`}
                      showUI={showImportUI}
                      showref={showUIref_btn}
                      functionality={updateshowImportUI}
                      value={"Import"}
                    />
                  </div>
                 

                  <div className="common-btn-container">
                  <FontAwesomeIcon
                    icon={solid("arrow-up-from-bracket")}
                  />
                    <Button classname={`common-styles-btn`} value={"Export"} />
                  </div>
                </div>
              </div>
              <div className="contacts-wrapper">
                <ContactsBodyHead
                  changeCheckbox={changeCheckbox}
                  filewithoutnpm={filewithoutnpm}
                  header={header}
                />
                <ContactsBody
                  deleteTracking={deleteTracking}
                  changeCheckbox={changeCheckbox}
                  filewithoutnpm={filewithoutnpm}
                  header={header}
                />
              </div>
            </div>
          </div>
          <div className="pagination"></div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
