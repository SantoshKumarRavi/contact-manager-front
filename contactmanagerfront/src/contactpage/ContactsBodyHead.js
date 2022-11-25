import React from "react";
import "../App.css";

const ContactsBodyHead = ({ filewithoutnpm, header, changeCheckbox }) => {
  return (
    <div className="data-wrapper">
      {filewithoutnpm?.datas?.length != 0 && header?.heading && (
        <input
          name="Deleteall"
          onChange={(e) => changeCheckbox(e)}
          type={"checkbox"}
        />
      )}
      {filewithoutnpm?.datas?.length != 0 &&
        header?.heading?.map((ele, i) => (
          <p key={i} className={`${ele}`}>
            {ele}
          </p>
        ))}
    </div>
  );
};

export default ContactsBodyHead;
