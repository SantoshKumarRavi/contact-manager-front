import React from "react";
import ContactsBodyHead from "./ContactsBodyHead";
import ContactsBody from "./ContactsBody";
import Delete from "../delete/Delete"
import Button from "../components/Button";

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
  logoutfunction
}) => {
  return (
    <>
        <button onClick={() => logoutfunction()}>Logout</button>
      <Button
        showUI={showImportUI}
        showref={showUIref_btn}
        functionality={updateshowImportUI}
        value={"Import"}
      />
    <Delete  setheader={setheader} setDeleteTracking={setDeleteTracking} deleteTracking={deleteTracking} filewithoutnpm={filewithoutnpm} setfilewithoutnpm={setfilewithoutnpm}/> 
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
    </>
  );
};

export default Contacts;
