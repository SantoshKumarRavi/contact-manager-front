import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   solid
// } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
const Searchbar = ({
  file,
  searchedEmails,
  setSearchedEmails,
  showImportUI,
  showDeleteUI,
}) => {
  type EmailType={
    datas?:Array<{
      [key:string]:any
    }>,
  }
  const [searctText, setSearchText] = useState("");
  const [issearched, setSearched] = useState(false);
  const [showEmail, setShowEmail] = useState<EmailType>({});
  const searchHandler = (e) => {
    
    let search = e.target.value;
    setSearchText(search);
    if (search === "") {
      setSearched(false);
      setSearchedEmails(() => {});
    }
  };
  function showSearchedEmailData(e) {
    let e_mail_index = parseInt(e.target.id);
    let updatedArray = [...showEmail?.datas];
    setSearchedEmails(() => {
      return {
        datas: [updatedArray[e_mail_index]],
      };
    });
    setSearched(false);
    setSearchText("");
  }

  useEffect(() => {
    if (searctText !== "") {
      const newContactList = file?.datas?.filter((obj) => {
        let emailId = obj.Email;
        let value=0
        if (emailId?.startsWith(searctText)) {
          value=1
        }
        return value;
      });
      if (newContactList.length !== 0) {
        setShowEmail(() => {
          return {
            datas: newContactList,
          };
        });
        setSearched(true);
      } else {
        setSearched(false);
      }

    } else {
      setSearched(false);
    }
  }, [searctText,file?.datas]);
  return (
    <>
      <div className="input-search input-search-wrapper ">
        {/* <FontAwesomeIcon
          className="fontaw-mag-glass"
          icon={solid("magnifying-glass")}
        /> */}
        <input
          type="text"
          className={
            showImportUI || showDeleteUI
              ? "input-search input-search-content glossy-background"
              : "input-search input-search-content searchbarinput"
          }
          placeholder="Search contacts"
          value={searctText}
          onChange={searchHandler}
        />
      </div>

      {issearched && (
        <div className="search-email-wrapper">
          {showEmail?.datas?.map((x, i) => {
            return (
              <div key={i} className="email-wrapper">
                {/* <FontAwesomeIcon
                  className="fontaw-mag-glass"
                  icon={solid("magnifying-glass")}
                /> */}
                <div
                  className="email-searched-content"
                  id={String(i)}
                  onClick={(e) => showSearchedEmailData(e)}
                  key={i}
                >
                  {x.Email}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Searchbar;
